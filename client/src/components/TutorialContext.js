import { React, createContext, useContext, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_TUTORIAL } from '../utils/queries/tutorialQueries';

const TutorialContext = createContext();

export function useTutorialContext() {
    return useContext(TutorialContext);
}

export function TutorialProvider({ children }) {
    const [ initialTutorialId, setInitialTutorialId ] = useState(null);
    const [ tutorialId, setTutorialId ] = useState(initialTutorialId);
    const [ tutorial, setTutorial ] = useState(null);
 

    //getch tutorial data when tutorialId changes
    const { loading, error, data } = useQuery(GET_TUTORIAL, {
        variables: { tutorialId: tutorialId },
      });
    
      if (loading) {
        return <p>Loading your tutorial...</p>;
      }
      if (error) {
        return <p>Error loading your tutorial</p>;
      }
    
      useEffect(() => {
        //set initialTutorialId when tutorial data is first fetched
        if (!initialTutorialId && data?.tutorial) {
            setIntitialTutorialId(data.tutorial._id);
        }
      }, [initialTutorialId, data]);

      // use initialTutorialId as initial state for tutorialId when it is set
      if (!tutorialId && initialTutorialId) {
        setTutorialId(initialTutorialId);
      }
    
      // Define other context values to share
      const contextValue = {
        tutorialId,
        setTutorialId,
        tutorial,
      };
    
    
      return (
        <TutorialContext.Provider value={contextValue}>
          {children}
        </TutorialContext.Provider>
      );
    }

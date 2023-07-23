import { useState } from 'react';
// React Router imports
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Apollo server imports
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Import pages/components and styles
import './style/App.css';
import {
  AddLessons,
  AddTutorial,
  Careers,
  Home,
  Payment,
  SignIn,
  SignUp,
  ViewTutorial,
} from './pages';
import { Footer, Navbar, TutorialContext, ViewLesson } from './components';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [tutorialId, setTutorialId] = useState('');
  return (
    <div
      className='App'
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
      }}
    >
      <ApolloProvider client={client}>
        <Router>
          <Navbar />
          <TutorialContext.Provider value={{ tutorialId, setTutorialId }}>
            <Routes>
              <Route
                path='/'
                element={<Home />}
              ></Route>
              <Route
                path='/signup'
                element={<SignUp />}
              ></Route>
              <Route
                path='/signin'
                element={<SignIn />}
              ></Route>
              <Route
                path='/tutorial/:tutorialId'
                element={<ViewTutorial />}
              ></Route>
              <Route
                path='/tutorials/new'
                element={<AddTutorial />}
              ></Route>
              <Route
                path='/:tutorialId/lessons/add'
                element={<AddLessons />}
              ></Route>
              <Route
                path='/payment'
                element={<Payment />}
              ></Route>
              <Route
                path='/careers'
                element={<Careers />}
              ></Route>
              <Route
                path='/tutorial/:tutorialId/lesson/:lessonId'
                element={<ViewTutorial />}
              ></Route>
            </Routes>
          </TutorialContext.Provider>
        </Router>
        <Footer />
      </ApolloProvider>
    </div>
  );
}

export default App;

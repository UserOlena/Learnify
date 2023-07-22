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
import { Footer, Navbar } from './components';

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
              path='/tutorial/:tutorialId/:index/lesson/:lessonId'
              element={<ViewTutorial />}
            ></Route>
          </Routes>
        </Router>
        <Footer />
      </ApolloProvider>
    </div>
  );
}

export default App;

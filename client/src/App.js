import { useState } from 'react';
// React Router imports
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Styling imports
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
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
  About,
  AddLessons,
  AddTutorial,
  Careers,
  Dashboard,
  Home,
  Payment,
  SignIn,
  SignUp,
  UserProfile,
  ViewTutorial,
  WhoWeAre,
  ChangePassword,
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

// Custom Fonts for whole app
const customTheme = createMuiTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={customTheme}>
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
              path='/dashboard'
              element={<Dashboard />}
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
            <Route
              path='/about'
              element={<About />}
            ></Route>
            <Route
              path='/who-we-are'
              element={<WhoWeAre />}
            ></Route>
            <Route
              path='/userProfile'
              element={<UserProfile />}
            ></Route>
            <Route
              path='/changePassword/:token'
              element={<ChangePassword />}
            ></Route>
          </Routes>
        </Router>
        <Footer />
      </ApolloProvider>
    </div>
    </ThemeProvider>
  );
}

export default App;

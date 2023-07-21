import { 
  BrowserRouter as Router, 
  Routes, 
  Route 
} from 'react-router-dom';
import { 
  ApolloClient, 
  ApolloProvider, 
  InMemoryCache 
} from '@apollo/client';
import './style/App.css';
import { 
  AddLessons, 
  AddTutorial,
  Home,
  Payment,
  SignIn, 
  SignUp, 
  Careers
} from './pages';

import { Footer, Navbar } from './components';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div className='App'>
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
          </Routes>
        </Router>
        <Footer />
      </ApolloProvider>
    </div>
  );
}

export default App;

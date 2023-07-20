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
  AddTutorial,
  Home,
  SignIn, 
  SignUp, 
  ViewTutorial
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
            path='/tutorial/:ID'
            element={<ViewTutorial />}
            ></Route>
            <Route
              path='/tutorials/new'
              element={<AddTutorial />}
            ></Route>
          </Routes>
        </Router>
        {/* <Footer /> */}
      </ApolloProvider>
    </div>
  );
}

export default App;

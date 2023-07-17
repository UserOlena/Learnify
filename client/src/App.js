import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import './style/App.css';
import { SignUp, SignIn } from "./pages";
import Home from "./pages/Home";

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div className='App'>
      <ApolloProvider client={client}>
        <Router>
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
          </Routes>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;

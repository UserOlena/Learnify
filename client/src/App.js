import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import './style/App.css';
import { Home } from './pages';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        Hello Project 3 Team!
        <br />
        Let's do it!
      </header>
      <ApolloProvider client={client}>
        <Router>
          <Routes>
            <Route
              // include path after project srarts
              path=''
              element={<Home />}
            ></Route>
          </Routes>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;

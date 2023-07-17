import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import './style/App.css';
import Home from './pages/Home';


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
            <Route path='/' element={<Home />} />
          </Routes>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;

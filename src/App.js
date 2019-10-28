import React from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import './App.css';
import RepoList from './components/RepoList';

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  request: (operation) => {
    const token = process.env.REACT_APP_GITHUB_API_KEY;
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  }
});

const App = () => (
  <ApolloProvider client={client}>
    <h2>Search Github Repositories</h2>
    <RepoList />
  </ApolloProvider>
);

export default App;

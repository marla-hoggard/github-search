import React from 'react';
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import Page from './Page';

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  request: (operation) => {
    const token = process.env.REACT_APP_GITHUB_API_KEY;
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  cache,
});

// Set defaults for local state
cache.writeData({
  data: {
    activeRepoName: null,
    activeRepoOwner: null,
    activeOwnerAvatar: null,
    searchTerm: '',
  },
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Page />
    </ApolloProvider>
  );
}

export default App;

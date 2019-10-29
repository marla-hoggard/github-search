import React, { useState } from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import RepoSearchView from './RepoSearchView';
import SingleRepoView from './SingleRepoView';

const apolloClient = new ApolloClient({
  uri: "https://api.github.com/graphql",
  request: (operation) => {
    const token = process.env.REACT_APP_GITHUB_API_KEY;
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
});

const App = () => {
  const [showSearchView, setSearchView] = useState(true);
  const [repoName, setName] = useState(null);
  const [repoOwner, setOwner] = useState(null);

  return (
    <ApolloProvider client={apolloClient}>
      <h2>Search Github Repositories</h2>
      {showSearchView ?
        <RepoSearchView setSearchView={setSearchView} setName={setName} setOwner={setOwner} /> :
        <SingleRepoView setSearchView={setSearchView} name={repoName} owner={repoOwner} />
      }
    </ApolloProvider>
  );
}

export default App;

import React from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import './App.css';

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
    <div>
      <h2>Let's Search Github</h2>
    </div>
  </ApolloProvider>
);

export default App;

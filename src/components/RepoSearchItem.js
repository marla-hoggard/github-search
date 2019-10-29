import React from 'react';
import { useApolloClient } from '@apollo/react-hooks';

const RepoSearchItem = ({ name, owner }) => {
  const client = useApolloClient();
  return (
    <li
      className="result-item"
      onClick={() => {
        client.writeData({
          data: {
            activeRepoName: name,
            activeRepoOwner: owner,
          }
        });
      }}
    >
      <div>Repo: {name}</div>
      <div>Owner: {owner}</div>
    </li>
  );
};

export default RepoSearchItem;
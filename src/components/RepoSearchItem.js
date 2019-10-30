import React from 'react';
import { useApolloClient } from '@apollo/react-hooks';

const RepoSearchItem = ({ name, owner, avatar, searchTerm }) => {
  const client = useApolloClient();
  return (
    <li
      className="result-item"
      onClick={() => {
        client.writeData({
          data: {
            activeRepoName: name,
            activeRepoOwner: owner,
            activeOwnerAvatar: avatar,
            searchTerm: searchTerm,
          }
        });
      }}
    >
      <img className="list__avatar" src={avatar} alt={owner} />
      <div className="list__name">{owner} / {name}</div>
    </li>
  );
};

export default RepoSearchItem;
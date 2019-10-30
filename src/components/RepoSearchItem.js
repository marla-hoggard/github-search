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
      <img className="result-item__avatar" src={avatar} alt={owner} />
      <div className="result-item__name">{owner} / <span className="bold">{name}</span></div>
    </li>
  );
};

export default RepoSearchItem;
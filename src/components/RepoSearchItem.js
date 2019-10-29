import React from 'react';

const RepoSearchItem = ({ name, owner, setSearchView, setName, setOwner }) => {
  return (
    <li
      className="result-item"
      onClick={() => {
        setSearchView(false);
        setName(name);
        setOwner(owner);
      }}
    >
      <div>Repo: {name}</div>
      <div>Owner: {owner}</div>
    </li>
  );
};

export default RepoSearchItem;
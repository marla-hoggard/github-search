import React from 'react';

const RepoItem = ({ name, owner }) => {
  return (
    <li>
      <div>{name}</div>
      <div>{owner}</div>
    </li>
  );
};

export default RepoItem;
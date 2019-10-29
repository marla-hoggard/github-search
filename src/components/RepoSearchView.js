import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import RepoSearchItem from './RepoSearchItem';

const SEARCH_REPOS_QUERY = gql`
  query SEARCH_REPOS_QUERY($query: String!, $type: SearchType!, $first: Int) {
  search(query: $query, type: $type, first: $first) {
    repositoryCount
    __typename
    edges {
      node {
        ... on Repository {
          id
          name
          owner {
            login
            id
          }
        }
      }
    }
  }
}
`;

const RepoSearchView = ({ setSearchView, setName, setOwner }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { loading, data } = useQuery(SEARCH_REPOS_QUERY, {
    variables: {
      query: searchTerm,
      type: 'REPOSITORY',
      first: 10,
    }
  });

  return (
    <>
      <input
        placeholder="Search repos..."
        type="search"
        id="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        autoComplete="off"
      />

      {loading ? <p>Loading...</p> :
        <>
          {searchTerm.length ?
            <div className="search-count">Your search found {data.search.repositoryCount} repos.</div>
            : null
          }
          <ul className="result-list">
            {data.search.edges.map(edge => (
              <RepoSearchItem
                key={edge.node.id}
                name={edge.node.name}
                owner={edge.node.owner.login}
                setSearchView={setSearchView}
                setName={setName}
                setOwner={setOwner}
              />
            ))}
          </ul>
        </>
      }
    </>
  );
};

export default RepoSearchView;
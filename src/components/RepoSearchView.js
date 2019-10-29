import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import RepoSearchItem from './RepoSearchItem';

const SEARCH_REPOS_QUERY = gql`
  query SEARCH_REPOS_QUERY(
    $query: String!,
    $type: SearchType!,
    $first: Int,
    $last: Int,
    $before: String,
    $after: String
  ) {
  search(
    query: $query,
    type: $type,
    first: $first,
    last: $last,
    before: $before,
    after: $after,
  ) {
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
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
  }
}
`;

const RepoSearchView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [variables, setVariables] = useState({ first: 10 })
  const { loading, data } = useQuery(SEARCH_REPOS_QUERY, {
    variables: {
      query: searchTerm,
      type: 'REPOSITORY',
      ...variables,
    }
  });

  const previousPage = () => {
    console.log('previousPage');
    setVariables({
      before: data.search.pageInfo.endCursor,
      last: 10,
    });
  }

  const nextPage = () => {
    console.log('nextPage');
    setVariables({
      after: data.search.pageInfo.startCursor,
      first: 10,
    });
  }

  return (
    <>
      <input
        placeholder="Search repos..."
        type="search"
        id="search"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setVariables({ first: 10 });
        }}
        autoComplete="off"
      />

      {loading ? <p>Loading...</p> :
        <>
          {searchTerm.length ?
            <p className="search-count">Your search found {data.search.repositoryCount} repos.</p>
            : null
          }
          {!!data.search.repositoryCount &&
            <>
              <div className="pagination-buttons">
                <button
                  className="pagination-button"
                  onClick={previousPage}
                  disabled={!data.search.pageInfo.hasPreviousPage}
                >
                  ≪ Prev 10
                </button>
                <button
                  className="pagination-button"
                  onClick={nextPage}
                  disabled={!data.search.pageInfo.hasNextPage}
                >
                  Next 10 ≫
                </button>
              </div>
              <ul className="result-list">
                {data.search.edges.map(edge => (
                  <RepoSearchItem
                    key={edge.node.id}
                    name={edge.node.name}
                    owner={edge.node.owner.login}
                  />
                ))}
              </ul>
            </>
          }
        </>
      }
    </>
  );
};

export default RepoSearchView;
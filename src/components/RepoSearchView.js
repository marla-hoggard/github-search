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
    nodes {
      ... on Repository {
        id
        name
        owner {
          login
          id
          avatarUrl
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

export const GET_SEARCH_TERM = gql`
  {
    searchTerm @client
  }
`;

// Add display commas to large integers
const displayNumber = num => {
  if (num < 1000) {
    return String(num);
  }
  let withCommasReversed = [];
  String(num).split('').reverse().forEach((digit, i) => {
    if (i > 0 && i % 3 === 0) {
      withCommasReversed.push(',');
    }
    withCommasReversed.push(digit);
  });
  return withCommasReversed.reverse().join('');
}

const RepoSearchView = () => {
  const localState = useQuery(GET_SEARCH_TERM);
  const [searchTerm, setSearchTerm] = useState(localState.data.searchTerm || '');
  const [variables, setVariables] = useState({ first: 10 })
  const { loading, data } = useQuery(SEARCH_REPOS_QUERY, {
    variables: {
      query: searchTerm,
      type: 'REPOSITORY',
      ...variables,
    }
  });

  const previousPage = () => {
    setVariables({
      before: data.search.pageInfo.startCursor,
      last: 10,
    });
  }

  const nextPage = () => {
    setVariables({
      after: data.search.pageInfo.endCursor,
      first: 10,
    });
  }

  return (
    <>
      <input
        className="search-input"
        placeholder="Search repos..."
        type="search"
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
            <p className="search-count">Your search found {displayNumber(data.search.repositoryCount)} repos.</p>
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
                {data.search.nodes.map(node => (
                  <RepoSearchItem
                    key={node.id}
                    name={node.name}
                    owner={node.owner.login}
                    avatar={node.owner.avatarUrl}
                    searchTerm={searchTerm}
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
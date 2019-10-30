import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import debounce from 'lodash.debounce';

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

// Stringify and add commas to large integers (i.e. 12345 -> "12,345")
const displayNumber = num => {
  const stringNum = String(num);
  if (num < 1000) {
    return stringNum;
  }
  let triples = [];
  for (let i = stringNum.length; i > 0; i -= 3) {
    const start = i >= 3 ? i - 3 : 0;
    triples.unshift(stringNum.slice(start, i));
  }
  return triples.join(',');
}

const RepoSearchView = () => {
  const localState = useQuery(GET_SEARCH_TERM);
  const [searchTerm, setSearchTerm] = useState(localState.data.searchTerm || '');
  const [variables, setVariables] = useState({ first: 10 });
  const [page, setPage] = useState(1);
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
    setPage(page - 1);
  }

  const nextPage = () => {
    setVariables({
      after: data.search.pageInfo.endCursor,
      first: 10,
    });
    setPage(page + 1);
  }

  const handleChange = debounce(e => {
    setSearchTerm(e.target.value);
    setVariables({ first: 10 });
    setPage(1);
  }, 350);

  const paginationText = () => {
    const count = data.search.repositoryCount;
    const start = ((page - 1) * 10) + 1;
    const end = start + 9 <= count ? start + 9 : count;
    return `Viewing ${start}-${end} of ${displayNumber(count)} repos`
  }

  return (
    <>
      <input
        className="search-input"
        placeholder="Search repos..."
        type="search"
        defaultValue={searchTerm}
        autoComplete="off"
        onChange={(e) => {
          e.persist();
          handleChange(e);
        }}
      />
      {!!searchTerm.length &&
        <>
          {loading ? <p>Searching...</p>
            : data.search.repositoryCount ?
              <>
                <div className="pagination__buttons">
                  <button
                    className="pagination__button"
                    onClick={previousPage}
                    disabled={!data.search.pageInfo.hasPreviousPage}
                  >
                    ≪ Prev 10
                  </button>
                  <div className="pagination__current">{paginationText()}</div>
                  <button
                    className="pagination__button"
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
              : <p>Your search found 0 results.</p>
          }
        </>
      }
    </>
  );
};

export default RepoSearchView;
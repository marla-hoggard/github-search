import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

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

const RepoList = () => {
  const { loading, data } = useQuery(SEARCH_REPOS_QUERY, {
    variables: {
      query: 'test',
      type: 'REPOSITORY',
      first: 10,
    }
  });
  console.log(data);

  if (loading) return <p>Loading...</p>

  const { repositoryCount, edges } = data.search;
  return (
    <>
      <div>Your search found {repositoryCount} repos.</div>
      <ul>
        {edges.map(edge => (
          <li>
            <div>{edge.node.name}</div>
            <div>{edge.node.owner.login}</div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default RepoList;
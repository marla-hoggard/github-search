import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import Languages from './Languages';

const SINGLE_REPO_QUERY = gql`
  query SINGLE_REPO_QUERY($owner: String!, $name: String!) {
  repository(owner: $owner, name: $name) {
    description
    url
    languages(first: 15) {
       edges {
        size
        node {
          name
          color
        }
      }
    }
    watchers {
      totalCount
    }
  }
}
`;

const SingleRepoView = ({ name, owner, setSearchView }) => {
  const { loading, data, error } = useQuery(SINGLE_REPO_QUERY, {
    variables: {
      owner,
      name,
    }
  });

  if (error) console.log(error);
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="back-link" onClick={() => setSearchView(true)}>← Back to Search</div>
      <div><span className="bold">Repo: </span>{name}</div>
      <div><span className="bold">Owner: </span>{owner}</div>
      <div><span className="bold">About: </span>{data.repository.description}</div>
      <div><span className="bold">Watchers: </span>{data.repository.watchers.totalCount}</div>
      <div><a href={data.repository.url}>Visit Repo</a></div>
      <Languages languages={data.repository.languages.edges} />
    </div>
  );
};

export default SingleRepoView;
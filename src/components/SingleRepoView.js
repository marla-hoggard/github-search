import React from 'react';
import gql from 'graphql-tag';
import { useQuery, useApolloClient } from '@apollo/react-hooks';

import Languages from './Languages';
import { GET_ACTIVE_REPO } from './Page';

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

const SingleRepoView = () => {
  const localState = useQuery(GET_ACTIVE_REPO);
  const { activeOwnerAvatar, activeRepoName, activeRepoOwner } = localState.data;
  const { loading, data, error } = useQuery(SINGLE_REPO_QUERY, {
    variables: {
      name: activeRepoName,
      owner: activeRepoOwner,
    }
  });
  const client = useApolloClient();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>

  return (
    <div>
      <div
        className="back-link"
        onClick={() => {
          client.writeData({
            data: {
              activeRepoName: null,
              activeRepoOwner: null,
              activeOwnerAvatar: null,
            }
          });
        }}
      >
        ← Back to Search
      </div>
      <div className="repo__info">
        <img className="repo__avatar" src={activeOwnerAvatar} alt={activeRepoOwner} />
        <div className="repo__info-text">
          <div><span className="bold">Repo:</span> {activeRepoName}</div>
          <div><span className="bold">Owner:</span> {activeRepoOwner}</div>
          <div><span className="bold">About:</span> {data.repository.description}</div>
          <div><span className="bold">Watchers:</span> {data.repository.watchers.totalCount}</div>
          <div>
            <a
              className="repo__link bold"
              href={data.repository.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Repo ➚
            </a>
          </div>
        </div>
      </div>
      <Languages languages={data.repository.languages.edges} />
    </div>
  );
};

export default SingleRepoView;
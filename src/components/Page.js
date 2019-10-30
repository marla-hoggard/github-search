import React from 'react';
import { useQuery } from "react-apollo";
import gql from 'graphql-tag';

import RepoSearchView from './RepoSearchView';
import SingleRepoView from './SingleRepoView';

export const GET_ACTIVE_REPO = gql`
  {
    activeRepoName @client
    activeRepoOwner @client
    activeOwnerAvatar @client
  }
`;

const Page = () => {
  const { data, loading, error } = useQuery(GET_ACTIVE_REPO);

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <>
      <h2>Search Github Repositories</h2>
      {data.activeRepoName && data.activeRepoOwner
        ? <SingleRepoView />
        : <RepoSearchView />
      }
    </>
  );
}

export default Page;

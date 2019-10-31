# Github Search

A single page JavaScript application that allows users to search through Github repositories via keyword.

### Setup ###
1. Copy `.env.example` into a file named `.env` then update the file to include your Github GraphQL API key.
2. Start the app

```
yarn
yarn start
```
3. Visit localhost:3000
4. To run tests, `yarn test`, although I did not write any unit tests in the time allotted.

### Features ###
- Type into the search box to search for repos
- Results will be displayed below the search box, in pages of 10.
- Clicking on a particular result will bring you to a page with further details about the repo.
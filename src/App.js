import React, { Component } from 'react';
import axios from 'axios';

const axiosGitHubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${
      process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
    }`,
  },
});


const GRAPHQL_QUERY = `
  {
    viewer { 
      login
      name
    }
  }
`;

const title = 'GraphQL Client';

class App extends Component {

  state = {
    path: 'maddyjolly2112',
    errors: null,
  };

  componentDidMount() {
    this.getDataFromGithub();
  }

  onChange = event => {
    this.setState({ path: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    this.getDataFromGithub();
  };

  getDataFromGithub = () => {
    axiosGitHubGraphQL
      .post('', { query: GRAPHQL_QUERY })
      .then(result =>
        this.setState(() => ({
          errors: result.data.errors,
        })),
      );
  };
no
  render() {
    const { path } = this.state;
    return (
      <div>
        <h1>{title}</h1>

        <form onSubmit={this.onSubmit}>
          <label htmlFor="url">
            https://github.com/
          </label>
          <input
            id="url"
            type="text"
            value={path}
            onChange={this.onChange}
            style={{ width: '300px' }}
          />
          <button type="submit">Search</button>
        </form>

      </div>
    );
  }
}

export default App;
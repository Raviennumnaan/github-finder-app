import axios from 'axios';

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
console.log(GITHUB_TOKEN);
console.log(GITHUB_URL);
const github = axios.create({
  baseURL: GITHUB_URL,
  headers: { Authorization: `token ${GITHUB_TOKEN}` },
});

export const searchUsers = async function (text) {
  const params = new URLSearchParams({ q: text });

  const res = await github.get(`/search/users?${params}`);
  return res.data.items;
};

export const getUserAndRepos = async function (login) {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`),
  ]);

  if (user.status === 404 || repos.status === 404)
    return (window.location = '/notfound');

  return { user: user.data, repos: repos.data };
};

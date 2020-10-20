export const apiAuthGet = authHeader => {
  return axios.get(apiUrl, { headers: authHeader });
};
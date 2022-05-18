import { API_BASE_URL } from '@env';

// const { apiBaseUrl } = Constants.manifest.extra;
console.log('baseUrl ', API_BASE_URL);
const API_POST_KILL = `${API_BASE_URL}/kill`;

export function postKill(data) {
  return fetch(API_POST_KILL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: data,
  })
    .then(res => res.json())
    .catch(console.error);
} 

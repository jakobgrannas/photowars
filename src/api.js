import { API_BASE_URL } from '@env';

console.log('pAPI_BASE_URL=', API_BASE_URL);

export function postKill(data) {
  return fetch(`${API_BASE_URL}/kill`, {
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

export function signup(data) {
  return fetch(`${API_BASE_URL}/user/add`, {
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

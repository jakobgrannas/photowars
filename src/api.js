import Constants from 'expo-constants';

const { apiBaseUrl } = Constants.manifest.extra;
console.log(apiBaseUrl);
const API_POST_KILL = `${apiBaseUrl}/kill`;

export function postKill(data) {
  return fetch('http://192.168.201.109:5066/kill', {
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

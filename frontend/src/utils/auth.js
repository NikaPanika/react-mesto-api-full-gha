//export const baseUrl = "https://api.mestogallery.nomoreparties.co";
export const baseUrl = 'http://localhost:3000';

const checkResponce = (res) =>
  res.ok ? res.json() : Promise.reject(res.status);

export const register = ({ email, password }) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponce(res));
};

export const login = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponce(res));
};

export const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => checkResponce(res))
    .then((data) => data);
};

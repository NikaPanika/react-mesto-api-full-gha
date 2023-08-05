//export const baseUrl = "https://auth.nomoreparties.co";
export const baseUrl = "http://localhost:3000";

const checkResponce = (res) =>
  res.ok ? res.json() : Promise.reject(res.status);

export const register = ({ email, password }) => {
  console.log(email);
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponce(res));
};

export const login = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    credentials: 'include',// отправить куки вместе с запросом
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponce(res));
};

export const checkToken = () => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Credentials': 'true'
      //Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then((res) => checkResponce(res));
};
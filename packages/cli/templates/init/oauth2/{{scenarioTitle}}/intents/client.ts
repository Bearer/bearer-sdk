import axios from 'axios'

export const CLIENT = axios.create({
  baseURL: 'https://api.example.com/',
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'User-Agent': 'Bearer'
  }
})

export function authorizationHeaderWith(token) {
  return {
    Authorization: `token ${token}`
  }
}

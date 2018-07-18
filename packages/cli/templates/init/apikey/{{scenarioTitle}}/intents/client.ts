import axios from 'axios'

export const CLIENT = axios.create({
  baseURL: 'https://api.example.com/',
  timeout: 5000
})

export function authorizationHeaderWith(token) {
  const encodedAuth = Buffer.from(`anything:${token}`).toString('base64')

  return {
    Authorization: `Basic ${encodedAuth}`
  }
}
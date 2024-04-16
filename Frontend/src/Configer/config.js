import axios from "axios"


const jwt = localStorage.getItem('MyToken')

const BASE_URL = 'http://localhost:8000/api/v1/'

export const api = axios.create({
  baseURL : BASE_URL,
  headers : {
    "Authorization" : jwt ? jwt : null,
    "Content-Type" : "application/json"
  }
})

export const confi = () => {
const jwt = localStorage.getItem('MyToken')

const BASE_URL = 'http://localhost:8000/api/v1/'

const api = axios.create({
  baseURL : BASE_URL,
  headers : {
    "Authorization" : jwt ? jwt : null,
    "Content-Type" : "application/json"
  }
})
}
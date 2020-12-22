import axios from "axios";
const auth = require('../components/auth/auth')

export default axios.create({
  baseURL: "http://localhost:9000/api",
  headers: {
    "Content-type": "application/json",
    "x-access-token": auth.getToken()
  }
});
import http from "../utils/http-common";
const auth = require('../components/auth/auth')

class UserDataService {
  getAll() {
    return http.get("/user");
  }

  get(id) {
    return http.get(`/user/${id}`);
  }

  create(data) {
    return http.post("/user", data);
  }

  update(id, data) {
    return http.put(`/user/${id}`, data);
  }

  delete(id) {
    return http.delete(`/user/${id}`);
  }

  deleteAll() {
    return http.delete(`/user`);
  }

  async login(data) {
    const response = await http.post("/user/login", data);
      console.log(response)
    //if(response && response.data && response.data.token != null && response.data.auth)
      auth.login(response.data.token);
      console.log(auth.login)
      console.log(auth.getToken())
    return response
  }

  logout(data) {
    auth.setToken(null);
    return http.post("/user/logout", data);
  }
}

export default new UserDataService();
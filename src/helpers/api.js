import AppHelper from "helpers/AppHelper.js";
import { axiosClient } from 'index.js';

class API {

  // POST requests

  registerUser (data) {
    axiosClient.post("user/register", {
      firstName: data.firstName,
      lastName: data.lastName,
      emailId: data.emailId,
      password: data.password,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => console.log(error));
  }

  // GET requests
  getProfile = (stateHandler) => {
    axiosClient.get("user/1/profile")
    .then((response) => {
      stateHandler({profile: response.data.profile});
    })
  }

  getName = (stateHandler) => {
    axiosClient.get("user/1/profile")
    .then((response) => {
      stateHandler({name: `${response.data.profile.first_name} ${response.data.profile.last_name}`});
    })
  }
}

const instance = new API();
export default instance;

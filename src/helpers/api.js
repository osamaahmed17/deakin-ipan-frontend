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

  // Get User Programs
  getPrograms = (stateHandler) => {
    axiosClient.get("programs")
    .then((response) => {
      stateHandler({programs: response.data.programs});
    })
  }

  getProgram = (stateHandler, p_id) => {
    axiosClient.get("program/" + p_id)
    .then((response) => {
      stateHandler({program: response.data.program});
    })
  }

  getModule = (stateHandler, p_id, m_id) => {
    axiosClient.get("program/" + p_id + "/module/" + m_id)
    .then((response) => {
      stateHandler({module: response.data.module});
    })
  }

  getActivity = (stateHandler, p_id, m_id, a_id) => {
    axiosClient.get("program/" + p_id + "/module/" + m_id + "/activity/" + a_id)
    .then((response) => {
      stateHandler({activity: response.data.activity});
    })
  }

  getTasks = (stateHandler, p_id, m_id, a_id, t_id) => {
    axiosClient.get("program/" + p_id + "/module/" + m_id + "/activity/" + a_id + "/tasks/" + t_id)
    .then((response) => {
      stateHandler({tasks: response.data.tasks});
    })
  }
}

const instance = new API();
export default instance;

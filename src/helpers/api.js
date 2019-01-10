import AppHelper from "helpers/AppHelper.js";
import { axiosClient } from 'index.js';
import { CONSTANTS } from 'helpers/urlConstants.js'
import { replacePlaceHolder } from 'helpers/urlHelper.js'

class API {

  // POST requests

  registerUser (data) {
    axiosClient.post(CONSTANTS.REGISTER_USER, {
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
    axiosClient.get("user/profile", {
      headers: { Authorization: "Bearer " + AppHelper.getUserAccessToken() }
    })
    .then((response) => {
      stateHandler({profile: response.data.data.profile});
    })
  }

  getName = (stateHandler) => {
    axiosClient.get("user/profile", {
      headers: { Authorization: "Bearer " + AppHelper.getUserAccessToken() }
    })
    .then((response) => {
      stateHandler({name: `${response.data.data.profile.firstName} ${response.data.data.profile.lastName}`});
    })
  }

  // Get User Programs
  getPrograms = (stateHandler) => {
    axiosClient.get(CONSTANTS.PROGRAMS, {
      headers: { Authorization: "Bearer " + AppHelper.getUserAccessToken() }
    })
    .then((response) => {
      stateHandler({programs: response.data.data.programs});
    })
  }

  getProgram = (stateHandler, p_id) => {
    axiosClient.get(replacePlaceHolder(CONSTANTS.PROGRAM, [p_id]), {
      headers: { Authorization: "Bearer " + AppHelper.getUserAccessToken() }
    })
    .then((response) => {
      stateHandler({program: response.data.data.programs});
    })
  }

  getModule = (stateHandler, p_id, m_id) => {
    axiosClient.get(replacePlaceHolder(CONSTANTS.MODULES, [p_id, m_id]), {
      headers: { Authorization: "Bearer " + AppHelper.getUserAccessToken() }
    })
    .then((response) => {
      stateHandler({module: response.data.data.module});
    })
  }

  getActivity = (stateHandler, p_id, m_id, a_id) => {
    axiosClient.get(replacePlaceHolder(CONSTANTS.ACTIVITIES, [p_id, m_id, a_id]), {
      headers: { Authorization: "Bearer " + AppHelper.getUserAccessToken() }
    })
    .then((response) => {
      stateHandler({
        activity: response.data.data.activity,
        toggleFavourite: response.data.data.activity.favouriteStatus
      });
    })
  }

  getTasks = (stateHandler, p_id, m_id, t_id) => {
    axiosClient.get(replacePlaceHolder(CONSTANTS.TASKS, [p_id, m_id, t_id]), {
      headers: { Authorization: "Bearer " + AppHelper.getUserAccessToken() }
    })
    .then((response) => {
      stateHandler({
        tasks: response.data.data.tasks,
        toggleFavourite: response.data.data.tasks.favouriteStatus
      });
    })
  }

  getResources = (stateHandler, p_id, m_id) => {
    axiosClient.get("programs/" + p_id + "/modules/" + m_id + "/resources", {
      headers: { Authorization: "Bearer " + AppHelper.getUserAccessToken() }
    })
    .then((response) => {
      console.log("Response:",response)
      stateHandler({resources: response.data.data});
    })
  }
  getFavouriteModules = (stateHandler) => {
    axiosClient.get(CONSTANTS.FAVOURITE_MODULES, {
      headers: { Authorization: "Bearer " + AppHelper.getUserAccessToken() }
    })
    .then((response) => {
      stateHandler({favouriteModules: response.data.data.favouriteModules});
    })
  }

  getFavouriteActivities = (stateHandler) => {
    axiosClient.get(CONSTANTS.FAVOURITE_ACTIVITIES, {
      headers: { Authorization: "Bearer " + AppHelper.getUserAccessToken() }
    })
    .then((response) => {
      stateHandler({favouriteActivities: response.data.data.favouriteActivities});
    })
  }
}

const instance = new API();
export default instance;

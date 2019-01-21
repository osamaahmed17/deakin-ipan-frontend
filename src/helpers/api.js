import AppHelper from "helpers/AppHelper.js";
import { axiosClient } from 'index.js';
import { CONSTANTS } from 'helpers/urlConstants.js'
import { replacePlaceHolder } from 'helpers/urlHelper.js'

class API {

  // POST requests

  registerUser(data) {
    axiosClient.post(CONSTANTS.REGISTER_USER, {
      firstName: data.firstName,
      lastName: data.lastName,
      emailId: data.emailId,
      password: data.password,
    })
      .then((response) => {
      })
      .catch((error) => console.log(error));
  }

  toggleFavouriteModule(p_id, m_id, stateHandler, favouriteStatus) {
    axiosClient.put(replacePlaceHolder(CONSTANTS.TOGGLE_MODULE_FAVOURITE, [p_id, m_id], ":id"), {}, {
      headers: { Authorization: "Bearer " + AppHelper.getUserAccessToken() }
    })
      .then((response) => {
        stateHandler({
          favouriteStatus: !favouriteStatus
        })
      })
      .catch((error) => console.log(error));
  }

  toggleFavouriteActivity(p_id, m_id, a_id, stateHandler, favouriteStatus) {
    axiosClient.put(replacePlaceHolder(CONSTANTS.TOGGLE_ACTIVITY_FAVOURITE, [a_id, p_id, m_id], ":id"), {}, {
      headers: { Authorization: "Bearer " + AppHelper.getUserAccessToken() }
    })
      .then((response) => {
        stateHandler({
          favouriteStatus: !favouriteStatus
        })
      })
      .catch((error) => console.log(error));
  }

  toggleFavouriteTask(p_id, m_id, t_id, stateHandler, favouriteStatus) {
    axiosClient.put(replacePlaceHolder(CONSTANTS.TOGGLE_TASK_FAVOURITE, [t_id, p_id, m_id], ":id"), {}, {
      headers: { Authorization: "Bearer " + AppHelper.getUserAccessToken() }
    })
      .then((response) => {
        stateHandler({
          favouriteStatus: !favouriteStatus
        })
      })
      .catch((error) => console.log(error));
  }

  // GET requests
  getProfile = (stateHandler) => {
    axiosClient.get("user/profile", {
      headers: { Authorization: "Bearer " + AppHelper.getUserAccessToken() }
    })
      .then((response) => {
        stateHandler({ profile: response.data.data.profile });
      })
  }

  getName = (stateHandler) => {
    axiosClient.get("user/profile", {
      headers: { Authorization: "Bearer " + AppHelper.getUserAccessToken() }
    })
      .then((response) => {
        stateHandler({ name: `${response.data.data.profile.firstName} ${response.data.data.profile.lastName}` });
      })
  }

  // Get User Programs
  getPrograms = (stateHandler) => {
    axiosClient.get('/user' + CONSTANTS.PROGRAMS, {
      headers: { Authorization: "Bearer " + AppHelper.getUserAccessToken() }
    })
      .then((response) => {
        stateHandler({ programs: response.data.data.programs });
      })
  }

  getProgram = (stateHandler, p_id) => {
    axiosClient.get('/user' + replacePlaceHolder(CONSTANTS.PROGRAM, [p_id]), {
      headers: { Authorization: "Bearer " + AppHelper.getUserAccessToken() }
    })
      .then((response) => {
        stateHandler({ program: response.data.data.programs });
      })
  }

  getModule = (stateHandler, p_id, m_id) => {
    axiosClient.get('/user' + replacePlaceHolder(CONSTANTS.MODULES, [p_id, m_id]), {
      headers: { Authorization: "Bearer " + AppHelper.getUserAccessToken() }
    })
      .then((response) => {
        stateHandler({
          module: response.data.data.module,
          favouriteStatus: response.data.data.module.favouriteStatus
        });
      })
  }

  getActivity = (stateHandler, p_id, m_id, a_id) => {
    axiosClient.get('/user' + replacePlaceHolder(CONSTANTS.ACTIVITIES, [p_id, m_id, a_id]), {
      headers: { Authorization: "Bearer " + AppHelper.getUserAccessToken() }
    })
      .then((response) => {
        stateHandler({
          activity: response.data.data.activity,
          favouriteStatus: response.data.data.activity.favouriteStatus
        });
      })
  }

  getTasks = (stateHandler, p_id, m_id, t_id) => {
    axiosClient.get('/user' + replacePlaceHolder(CONSTANTS.TASKS, [p_id, m_id, t_id]), {
      headers: { Authorization: "Bearer " + AppHelper.getUserAccessToken() }
    })
      .then((response) => {
        stateHandler({
          tasks: response.data.data.task,
          favouriteStatus: response.data.data.task.favouriteStatus
        });
      })
  }

  getResources = (stateHandler, p_id, m_id) => {
    axiosClient.get("programs/" + p_id + "/modules/" + m_id + "/resources", {
      headers: { Authorization: "Bearer " + AppHelper.getUserAccessToken() }
    })
      .then((response) => {
        stateHandler({ resources: response.data.data });
      })
  }
  getFavouriteModules = (stateHandler) => {
    axiosClient.get(CONSTANTS.FAVOURITE_MODULES, {
      headers: { Authorization: "Bearer " + AppHelper.getUserAccessToken() }
    })
      .then((response) => {
        stateHandler({ favouriteModules: response.data.data.favouriteModules });
      })
  }

  getFavouriteActivities = (stateHandler) => {
    axiosClient.get(CONSTANTS.FAVOURITE_ACTIVITIES, {
      headers: { Authorization: "Bearer " + AppHelper.getUserAccessToken() }
    })
      .then((response) => {
        stateHandler({ favouriteActivities: response.data.data.favouriteActivities });
      })
  }
}

const instance = new API();
export default instance;

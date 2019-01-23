import { REQUEST_LOGIN, REQUEST_LOGOUT, REQUEST_ACCESS_TOKEN_LOGIN, DEVELOPER_LOGIN, ACCESS_TOKEN_IS_SET_IN_LOCAL_STORAGE } from "actions";
const REQUEST_LOGIN_SUCCESS = "REQUEST_LOGIN_SUCCESS"
const REQUEST_LOGIN_FAIL = "REQUEST_LOGIN_FAIL"

const REQUEST_LOGOUT_SUCCESS = "REQUEST_LOGOUT_SUCCESS"
const REQUEST_LOGOUT_FAIL = "REQUEST_LOGOUT_FAIL"

const REQUEST_ACCESS_TOKEN_LOGIN_SUCCESS = "REQUEST_ACCESS_TOKEN_LOGIN_SUCCESS"
const REQUEST_ACCESS_TOKEN_LOGIN_FAIL = "REQUEST_ACCESS_TOKEN_LOGIN_FAIL"

const login = (state = {loginLoading: false, loading: false, loggedIn: false}, action) => {
  switch(action.type) {
    // Login and accessTokenLogin
    case REQUEST_LOGIN:
    return {...state, loginLoading: true, loggedIn: false}

    case REQUEST_ACCESS_TOKEN_LOGIN:
      return {...state, loading: true, loggedIn: false}

    case REQUEST_LOGIN_SUCCESS:
      return {...state, loginLoading: false, loading: true, loggedIn: true}

    case ACCESS_TOKEN_IS_SET_IN_LOCAL_STORAGE:
    case REQUEST_ACCESS_TOKEN_LOGIN_SUCCESS:
    case DEVELOPER_LOGIN:
      return {...state, loginLoading: false, loading: false, loggedIn: true}

    case REQUEST_LOGIN_FAIL:
    case REQUEST_ACCESS_TOKEN_LOGIN_FAIL:
      return {...state, loginLoading: false, loading: false, loggedIn: false}

    // Logout
    case REQUEST_LOGOUT:
      return {...state, loading: false, loggedIn: false}

    case REQUEST_LOGOUT_SUCCESS:
      return {...state, loading: false, loggedIn: false}

    case REQUEST_LOGOUT_FAIL:
      return {...state, loading: false, loggedIn: true}


    default:
      return { loginLoading: false, loading: false, loggedIn: false}
  }
}

export default login;

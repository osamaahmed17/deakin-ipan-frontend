export const REQUEST_LOGIN = "REQUEST_LOGIN"
export const REQUEST_LOGOUT = "REQUEST_LOGOUT"
export const REQUEST_ACCESS_TOKEN_LOGIN = "REQUEST_ACCESS_TOKEN_LOGIN"
export const SET_USER_ROLE = "SET_USER_ROLE"
export const DEVELOPER_LOGIN = "DEVELOPER_LOGIN"
export const ACCESS_TOKEN_IS_SET_IN_LOCAL_STORAGE = "ACCESS_TOKEN_IS_SET_IN_LOCAL_STORAGE"

export const requestLogin = (data) => ({
  type: REQUEST_LOGIN,
  payload: {
    request: {
      url: 'user/login',
      method: 'POST',
      data: {
        emailId: data.emailId,
        password: data.password
      }
    }
  }
})

export const requestAccessTokenLogin = (token) => ({
  type: REQUEST_ACCESS_TOKEN_LOGIN,
  payload: {
    request: {
      url: 'user/accessTokenLogin',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  }
})

export const requestLogout = () => ({
  type: REQUEST_LOGOUT
})

export const developerModeLogin = () => ({
  type: DEVELOPER_LOGIN
})

export const reduxNotifySetAccessTokenInLocalStorage = () => ({
  type: ACCESS_TOKEN_IS_SET_IN_LOCAL_STORAGE
})

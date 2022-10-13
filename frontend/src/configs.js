const URI_HOSTNAME = process.env.URI_USER_SVC || 'http://localhost:8000'

const PREFIX_USER_SVC = '/api/user'
const PREFIX_USER_SIGN_UP = '/api/user/signup'
const PREFIX_USER_LOGIN = '/api/user/login'
const PREFIX_USER_LOGOUT = '/api/user/logout'
const PREFIX_TOKEN_VALIDATION = '/api/user/validate-token'
const PREFIX_USER_DELETE = '/api/user/delete-user'
const PREFIX_USER_GET_USERNAME = '/api/user/get-username'


export const URL_USER_SVC = URI_HOSTNAME + PREFIX_USER_SVC
export const URL_USER_LOGIN = URI_HOSTNAME + PREFIX_USER_LOGIN
export const URL_USER_SIGNUP = URI_HOSTNAME + PREFIX_USER_SIGN_UP
export const URL_USER_LOGOUT = URI_HOSTNAME + PREFIX_USER_LOGOUT
export const URL_TOKEN_VALIDATION = URI_HOSTNAME + PREFIX_TOKEN_VALIDATION
export const URL_USER_DELETE = URI_HOSTNAME + PREFIX_USER_DELETE
export const URL_USER_GET_USERNAME = URI_HOSTNAME + PREFIX_USER_GET_USERNAME
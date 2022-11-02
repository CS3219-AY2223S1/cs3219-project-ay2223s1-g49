export const USER_SVC_URI_HOSTNAME =       "http://cs3219g49-user-service.eba-gsqyhcuy.ap-southeast-1.elasticbeanstalk.com"
// export const USER_SVC_URI_HOSTNAME =    "http://localhost:8000"
export const COLLAB_SVC_URI_HOSTNAME =     "http://cs3219g49-collab-service.eba-iknxhrpx.ap-southeast-1.elasticbeanstalk.com"
// export const COLLAB_SVC_URI_HOSTNAME =    "http://localhost:3002"
export const MATCH_SVC_URI_HOSTNAME =      "http://cs3219g49-matching-service.eba-grtr7n7q.ap-southeast-1.elasticbeanstalk.com"
// export const MATCH_SVC_URI_HOSTNAME =    "http://localhost:7000"
export const QUESTION_SVC_URI_HOSTNAME =   "http://cs3219g49-question-service.eba-75dcym54.ap-southeast-1.elasticbeanstalk.com"
// export const QUESTION_SVC_URI_HOSTNAME =    "http://localhost:3002"
export const CHAT_SVC_URI_HOSTNAME =       "http://cs3219g49-chat-service.eba-d5ik24uv.ap-southeast-1.elasticbeanstalk.com"
// export const CHAT_SVC_URI_HOSTNAME =    "http://localhost:3003"

const PREFIX_USER_SVC = '/api/user'
const PREFIX_USER_SIGN_UP = '/api/user/signup'
const PREFIX_USER_LOGIN = '/api/user/login'
const PREFIX_USER_LOGOUT = '/api/user/logout'
const PREFIX_TOKEN_VALIDATION = '/api/user/validate-token'
const PREFIX_USER_DELETE = '/api/user/delete-user'
const PREFIX_USER_GET_USERNAME = '/api/user/get-username'
const PREFIX_USER_CHANGE_PASSWORD = '/api/user/change-password'


export const URL_USER_SVC = USER_SVC_URI_HOSTNAME + PREFIX_USER_SVC
export const URL_USER_LOGIN = USER_SVC_URI_HOSTNAME + PREFIX_USER_LOGIN
export const URL_USER_SIGNUP = USER_SVC_URI_HOSTNAME + PREFIX_USER_SIGN_UP
export const URL_USER_LOGOUT = USER_SVC_URI_HOSTNAME + PREFIX_USER_LOGOUT
export const URL_TOKEN_VALIDATION = USER_SVC_URI_HOSTNAME + PREFIX_TOKEN_VALIDATION
export const URL_USER_DELETE = USER_SVC_URI_HOSTNAME + PREFIX_USER_DELETE
export const URL_USER_GET_USERNAME = USER_SVC_URI_HOSTNAME + PREFIX_USER_GET_USERNAME
export const URL_USER_CHANGE_PASSWORD = USER_SVC_URI_HOSTNAME + PREFIX_USER_CHANGE_PASSWORD
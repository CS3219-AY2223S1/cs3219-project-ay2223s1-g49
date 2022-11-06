export const USER_SVC_URI_HOSTNAME =
    "http://cs3219g49-user-service.eba-gsqyhcuy.ap-southeast-1.elasticbeanstalk.com";
// export const USER_SVC_URI_HOSTNAME = "http://localhost:8000";
export const COLLAB_SVC_URI_HOSTNAME =
    "http://cs3219g49-collab-service.eba-iknxhrpx.ap-southeast-1.elasticbeanstalk.com";
// export const COLLAB_SVC_URI_HOSTNAME = "http://localhost:3002";
export const MATCH_SVC_URI_HOSTNAME =
    "http://cs3219g49-matching-service.eba-grtr7n7q.ap-southeast-1.elasticbeanstalk.com";
// export const MATCH_SVC_URI_HOSTNAME = "http://localhost:3001";
export const QUESTION_SVC_URI_HOSTNAME =
    "http://cs3219g49-question-service.eba-75dcym54.ap-southeast-1.elasticbeanstalk.com";
// export const QUESTION_SVC_URI_HOSTNAME = "http://localhost:3004";
export const CHAT_SVC_URI_HOSTNAME =
    "http://cs3219g49-chat-service.eba-d5ik24uv.ap-southeast-1.elasticbeanstalk.com";
// export const CHAT_SVC_URI_HOSTNAME = "http://localhost:3003";

const PREFIX_USER_SVC = "/api/user";
const PREFIX_USER_SIGN_UP = "/api/user/signup";
const PREFIX_USER_LOGIN = "/api/user/login";
const PREFIX_USER_LOGOUT = "/api/user/logout";
const PREFIX_TOKEN_VALIDATION = "/api/user/validate-token";
const PREFIX_USER_DELETE = "/api/user/delete-user";
const PREFIX_USER_GET_USERNAME = "/api/user/get-username";
const PREFIX_USER_CHANGE_PASSWORD = "/api/user/change-password";

const PREFIX_CREATE_QUESTION = "/service/create/question";
const PREFIX_DELETE_QUESTION = "/service/delete/question";
const PREFIX_GET_SPECIFIC_QUESTION = "/service/get/question-content";
const PREFIX_GET_RANDOM_QUESTION = "/service/get/random-id";
const PREFIX_GET_DIFFICULTY_LIMIT = "/service/get/limit";
const PREFIX_GET_QUESTION_ANSWER = "/service/get/question-answer";
const PREFIX_GET_ALL_QUESTIONS = "/service/get/all-questions";

export const URL_CREATE_QUESTION =
    QUESTION_SVC_URI_HOSTNAME + PREFIX_CREATE_QUESTION;
export const URL_DELETE_QUESTION =
    QUESTION_SVC_URI_HOSTNAME + PREFIX_DELETE_QUESTION;
export const URL_GET_RANDOM_QUESTION =
    QUESTION_SVC_URI_HOSTNAME + PREFIX_GET_RANDOM_QUESTION;
export const URL_GET_DIFFICULTY_LIMIT =
    QUESTION_SVC_URI_HOSTNAME + PREFIX_GET_DIFFICULTY_LIMIT;
export const URL_GET_QUESTION_ANSWER =
    QUESTION_SVC_URI_HOSTNAME + PREFIX_GET_QUESTION_ANSWER;
export const URL_GET_ALL_QUESTIONS =
    QUESTION_SVC_URI_HOSTNAME + PREFIX_GET_ALL_QUESTIONS;
export const URL_GET_SPECIFIC_QUESTIONS =
    QUESTION_SVC_URI_HOSTNAME + PREFIX_GET_SPECIFIC_QUESTION;

export const URL_USER_SVC = USER_SVC_URI_HOSTNAME + PREFIX_USER_SVC;
export const URL_USER_LOGIN = USER_SVC_URI_HOSTNAME + PREFIX_USER_LOGIN;
export const URL_USER_SIGNUP = USER_SVC_URI_HOSTNAME + PREFIX_USER_SIGN_UP;
export const URL_USER_LOGOUT = USER_SVC_URI_HOSTNAME + PREFIX_USER_LOGOUT;
export const URL_TOKEN_VALIDATION =
    USER_SVC_URI_HOSTNAME + PREFIX_TOKEN_VALIDATION;
export const URL_USER_DELETE = USER_SVC_URI_HOSTNAME + PREFIX_USER_DELETE;
export const URL_USER_GET_USERNAME =
    USER_SVC_URI_HOSTNAME + PREFIX_USER_GET_USERNAME;
export const URL_USER_CHANGE_PASSWORD =
    USER_SVC_URI_HOSTNAME + PREFIX_USER_CHANGE_PASSWORD;

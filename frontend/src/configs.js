const URI_HOSTNAME = process.env.URI_USER_SVC || 'http://localhost:8000'

const PREFIX_USER_SVC = '/api/user'

const PREFIX_USER_LOGIN = '/api/user/login'

export const URL_USER_SVC = URI_HOSTNAME + PREFIX_USER_SVC
export const URL_USER_LOGIN = URI_HOSTNAME + PREFIX_USER_LOGIN

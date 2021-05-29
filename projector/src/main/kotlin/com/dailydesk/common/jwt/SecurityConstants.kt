package com.dailydesk.common.jwt

object SecurityConstants {
    const val SECRET = "projector-jwt-key"
    const val EXPIRATION_TIME: Long = 864000000 // 10 days
    const val TOKEN_PREFIX = "Bearer "
    const val HEADER_STRING = "Authorization"
    const val SIGN_UP_URL = "/users"
    const val AUTHENTICATION_URL = "/users/authenticate"
    const val PROJECTS_URL = "/projects"
}
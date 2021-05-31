package com.dailydesk.users.modal


data class User(
        val id: String,
        val email: String,
        val password: Password,
        val firstname: String?,
        val lastname: String?
)
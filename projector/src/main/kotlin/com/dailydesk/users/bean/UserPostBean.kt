package com.dailydesk.users.bean

import com.dailydesk.users.modal.Password
import com.dailydesk.users.modal.User


data class UserPostBean(
        val email: String,
        val password: String,
        val firstname: String?,
        val lastname: String?
) {


    fun toDomain(): User {
        return User(
                email =  email,
                password = Password(password),
                firstname = firstname,
                lastname = lastname
        )
    }
}
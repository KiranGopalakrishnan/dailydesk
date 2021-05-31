package com.dailydesk.users.bean;

import com.dailydesk.users.modal.User

data class UserBean(
        val id: String?,
        val email: String,
        val firstname: String?,
        val lastname: String?
) {
    companion object{
        fun from(user: User): UserBean {
            return UserBean(
                    id = user.id,
                    email = user.email,
                    firstname = user.firstname,
                    lastname = user.lastname
            )
        }
    }
}

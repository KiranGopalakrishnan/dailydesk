package com.dailydesk.users.services

import com.dailydesk.common.http.Response
import com.dailydesk.users.modal.User
import org.springframework.stereotype.Service

@Service
interface UserService {

    fun getAllUsers(): Response<List<User>>

    fun addUser(user: User): Response<User>

    fun authenticateUser(email:String, password:String): Response<User>

}
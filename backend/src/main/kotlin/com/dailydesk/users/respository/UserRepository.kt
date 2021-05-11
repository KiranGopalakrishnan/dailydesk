package com.dailydesk.users.respository

import com.dailydesk.users.modal.User
import org.springframework.stereotype.Repository

@Repository
interface UserRepository {

    fun save(domain: User)

    fun findUser(email:String):User?

    fun findAllUsers():List<User>?

}
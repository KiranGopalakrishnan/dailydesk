package com.dailydesk.users.services

import com.dailydesk.common.http.NotFound
import com.dailydesk.common.http.Response
import com.dailydesk.common.http.Success
import com.dailydesk.users.modal.User
import com.dailydesk.users.respository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class UserServiceImpl:UserService {

    @Autowired
    lateinit var userRepository: UserRepository;

    override fun getAllUsers(): Response<List<User>> {
        val result = userRepository.findAllUsers()
        return if(result != null){
            Success(result)
        }
        else{
            return NotFound{ "No users found" }
        }
    }

    override fun addUser(user: User): Response<User> {
        userRepository.save(user)
        return Success(user)
    }

    override fun authenticateUser(email:String, password: String): Response<User> {
        val user = userRepository.findUser(email = email);
            return if(user != null && user.password.matches(password)) {
                Success(user)
            }else{
                NotFound{"Failed to authenticate"}
            }
    }

}
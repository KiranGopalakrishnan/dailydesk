package com.projector.users.services

import com.projector.common.http.NotFound
import com.projector.common.http.Response
import com.projector.common.http.Success
import com.projector.users.modal.Password
import com.projector.users.modal.User
import com.projector.users.respository.UserRepository
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

    override fun authenticateUser(username:String,password: String): Response<User> {
        val user = userRepository.findUser(username = username);
            return if(user != null && user.password.matches(password)) {
                Success(user)
            }else{
                NotFound{"Failed to authenticate"}
            }
    }

}
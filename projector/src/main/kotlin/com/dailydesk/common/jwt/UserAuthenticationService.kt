package com.dailydesk.common.jwt

import com.dailydesk.users.respository.UserRepository
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.User.UserBuilder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional


@Service
class UserAuthenticationService(val userRepository: UserRepository): UserDetailsService {
    @Transactional(readOnly = true)
    @Throws(UsernameNotFoundException::class)
    override fun loadUserByUsername(username: String): UserDetails {
        val user = userRepository.findUser(username) ?: throw UsernameNotFoundException(username)

        var builder: UserBuilder? = null
            builder = User.withUsername(username)
            builder.password((user.password.toString()))

        return builder.build()
    }

    fun save(user: com.dailydesk.users.modal.User) {
        userRepository.save(user)
    }
}
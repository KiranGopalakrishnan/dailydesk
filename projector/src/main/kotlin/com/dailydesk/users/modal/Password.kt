package com.dailydesk.users.modal

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder

data class Password(val password:String) {
    private val bCryptPasswordEncoder:BCryptPasswordEncoder = BCryptPasswordEncoder()

    fun toEncrypted(): String {
        return bCryptPasswordEncoder.encode(password)
    }

    fun matches(password: String):Boolean {
       return bCryptPasswordEncoder.matches(password,this.password)
    }

    override fun toString(): String{
        return password
    }
}
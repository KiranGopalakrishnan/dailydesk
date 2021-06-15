package com.dailydesk.common.authentication

import BifrostOuterClass
import com.dailydesk.common.id.ShortId

data class User(
    val id: ShortId,
    val firstname: String,
    val lastname: String,
    val company: Company,
    val email: String,
    val status: String,
){
    companion object {
        //Any since SecurityContext().principal is of type Any
        fun transform(user: Any):User {
            val userObj = user as BifrostOuterClass.User
            return User(
                id = ShortId(userObj.id),
                firstname = userObj.firstname,
                lastname = userObj.lastname,
                company = Company.transform(userObj.company),
                email = userObj.email,
                status = userObj.status
            )
        }
    }
}

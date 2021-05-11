package com.dailydesk.users

import com.dailydesk.common.http.IterateOrThrow
import com.dailydesk.common.http.transformOrThrow
import com.dailydesk.users.bean.UserBean
import com.dailydesk.users.bean.UserPostBean
import com.dailydesk.users.services.UserService
import org.springframework.beans.factory.annotation.Autowired
import javax.ws.rs.*
import javax.ws.rs.core.MediaType

@Path("/users")
class UsersResource {
    @Autowired
    lateinit var userService: UserService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    fun getUsers(): List<UserBean> {
         return userService.getAllUsers().IterateOrThrow { UserBean.from(this) };

    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    fun addUser(userPostBean: UserPostBean): UserBean {
        return userService.addUser(
                userPostBean.toDomain()
        ).transformOrThrow { UserBean.from(this) }

    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/authenticate")
    fun authenticateUser(user: UserPostBean): UserBean {
        return userService.authenticateUser(
                email =  user.email,
                password = user.password
        ).transformOrThrow { UserBean.from(this) }

    }

}
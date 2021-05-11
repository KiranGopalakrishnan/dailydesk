package com.dailydesk.token

import com.dailydesk.token.services.TokenService
import org.springframework.beans.factory.annotation.Autowired
import javax.ws.rs.GET
import javax.ws.rs.Path
import javax.ws.rs.Produces
import javax.ws.rs.core.MediaType

@Path("/token")
class TokenResource {
    @Autowired
    lateinit var tokenService: TokenService

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    fun getRefreshToken() {

    }
}
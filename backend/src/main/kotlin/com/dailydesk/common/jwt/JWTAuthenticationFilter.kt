package com.dailydesk.common.jwt

import com.fasterxml.jackson.databind.ObjectMapper
import com.dailydesk.common.jwt.SecurityConstants.AUTHENTICATION_URL
import com.dailydesk.common.jwt.SecurityConstants.EXPIRATION_TIME
import com.dailydesk.common.jwt.SecurityConstants.HEADER_STRING
import com.dailydesk.common.jwt.SecurityConstants.SECRET
import com.dailydesk.common.jwt.SecurityConstants.TOKEN_PREFIX
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.AuthenticationException
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import java.io.IOException
import java.util.*
import javax.servlet.FilterChain
import javax.servlet.ServletException
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


class JWTAuthenticationFilter(private var authManager: AuthenticationManager): UsernamePasswordAuthenticationFilter() {
    init {
        authenticationManager = authManager
        setFilterProcessesUrl(AUTHENTICATION_URL)
    }

    @Throws(AuthenticationException::class, IOException::class, ServletException::class)
    override fun attemptAuthentication(
            req: HttpServletRequest, res: HttpServletResponse): Authentication {
        val mapper = ObjectMapper()
        val map: MutableMap<*, *>? = mapper.readValue(req.inputStream, MutableMap::class.java)

        return authenticationManager.authenticate(
                UsernamePasswordAuthenticationToken(
                        map?.get("email"),
                        map?.get("password"),
                        emptyList<GrantedAuthority>()
                )
        )
    }

    @Throws(IOException::class, ServletException::class)
    override fun successfulAuthentication(
            req: HttpServletRequest,
            res: HttpServletResponse, chain: FilterChain?,
            auth: Authentication) {
        val JWT = Jwts.builder()
                .setSubject((auth.principal as org.springframework.security.core.userdetails.User).username)
                .setExpiration(Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact()

        res.addHeader(HEADER_STRING, "$TOKEN_PREFIX $JWT")
    }
}
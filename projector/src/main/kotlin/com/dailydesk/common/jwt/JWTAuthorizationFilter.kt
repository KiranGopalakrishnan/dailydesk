package com.dailydesk.common.jwt

import BifrostOuterClass
import com.dailydesk.common.jwt.SecurityConstants.HEADER_STRING
import com.dailydesk.common.jwt.SecurityConstants.TOKEN_PREFIX
import common.bifrost.client.Bifrost
import kotlinx.coroutines.*
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter
import org.springframework.web.util.WebUtils
import java.io.IOException
import javax.servlet.FilterChain
import javax.servlet.ServletException
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


enum class Cookie {
    JWT_TOKEN,
    REFRESH_TOKEN
}

class JWTAuthorizationFilter(private var authManager: AuthenticationManager): BasicAuthenticationFilter(authManager) {
    @Throws(IOException::class, ServletException::class)
    override fun doFilterInternal(request: HttpServletRequest,
                                  response: HttpServletResponse,
                                  chain: FilterChain) {
        val header = request.getHeader(HEADER_STRING)

        if (header == null || !header.startsWith(TOKEN_PREFIX)) {
            chain.doFilter(request, response)
            return
        }

        val usr = getAuthentication(request)
        val authentication = UsernamePasswordAuthenticationToken(
            usr, null, null
        )
        authentication.details = WebAuthenticationDetailsSource().buildDetails(request)

        SecurityContextHolder.getContext().authentication = authentication
        chain.doFilter(request, response)
    }

     fun getAuthentication(request: HttpServletRequest):  BifrostOuterClass.User? {
        val headerToken = request.getHeader(HEADER_STRING)?.replace("Bearer ","")
         val tokenFromCookie = WebUtils.getCookie(request,Cookie.JWT_TOKEN.toString())?.value
         val token = tokenFromCookie ?: headerToken

        if (token != null) {
            val verify = GlobalScope.async {
                Bifrost().verify(token)
            }
            val user = runBlocking {
               verify.await()
            }

            if (user != null)
                return user
            else
                null
        }
        return null
    }
}
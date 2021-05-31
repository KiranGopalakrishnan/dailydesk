package com.dailydesk.common.jwt

import com.dailydesk.common.http.AccessDeniedEntryPoint
import com.dailydesk.common.http.AccessDeniedExceptionHandler
import com.dailydesk.common.jwt.SecurityConstants.SIGN_UP_URL
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import javax.ws.rs.HttpMethod

@EnableWebSecurity
open class WebSecurity(val userAuthenticationService: UserAuthenticationService) : WebSecurityConfigurerAdapter() {


    fun bCryptPasswordEncoder(): BCryptPasswordEncoder {
        return BCryptPasswordEncoder()
    }

    override fun configure(http: HttpSecurity) {
        http.csrf().disable().authorizeRequests()
                .antMatchers(HttpMethod.POST, SIGN_UP_URL).permitAll()
                .anyRequest().authenticated()
                .and()

                .addFilter(JWTAuthorizationFilter(authenticationManager()))

                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()

                .exceptionHandling()
                .accessDeniedHandler(AccessDeniedExceptionHandler())
                .authenticationEntryPoint(AccessDeniedEntryPoint())

    }

    override fun configure(auth: AuthenticationManagerBuilder?) {
        auth!!.userDetailsService(userAuthenticationService).passwordEncoder(bCryptPasswordEncoder())
    }
}
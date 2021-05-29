package com.dailydesk

import com.dailydesk.common.http.AppExceptionHandler
import com.dailydesk.projects.ProjectsResource
import com.dailydesk.users.UsersResource
import org.glassfish.jersey.server.ResourceConfig
import org.springframework.stereotype.Component

@Component
class RestConfig: ResourceConfig(){

    init {
        registerEndPoints()
    }

    fun registerEndPoints() {
        register(UsersResource())
        register(ProjectsResource())
        register(AppExceptionHandler())
    }

}
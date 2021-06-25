package com.dailydesk.projector

import com.dailydesk.common.http.AppExceptionHandler
import com.dailydesk.projector.boards.BoardsResource
import com.dailydesk.projector.projects.ProjectsResource
import com.dailydesk.projector.tasks.TasksResource
import org.glassfish.jersey.server.ResourceConfig
import org.springframework.stereotype.Component

@Component
class RestConfig: ResourceConfig(){

    init {
        registerEndPoints()
    }

    fun registerEndPoints() {
        register(TasksResource())
        register(BoardsResource())
        register(ProjectsResource())
        register(AppExceptionHandler())
    }

}
package com.dailydesk.projects

import com.dailydesk.common.http.IterateOrThrow
import com.dailydesk.common.http.transformOrThrow
import com.dailydesk.projects.bean.ProjectBean
import com.dailydesk.projects.bean.ProjectPostBean
import com.dailydesk.projects.services.ProjectService
import com.dailydesk.users.modal.User
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.context.SecurityContextHolder
import javax.ws.rs.*
import javax.ws.rs.core.MediaType


@Path("/projects")
class ProjectsResource {
    @Autowired
    lateinit var projectService: ProjectService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/")
    fun getProjects(): List< ProjectBean> {
        val auth = SecurityContextHolder.getContext().authentication
        val user = auth.principal is User
        println("BLEEEH")
        println(auth.principal)
        println("-----------------")
        return projectService.getAllProjects().IterateOrThrow { ProjectBean.from(this) };
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/")
    fun createProject(projectPostBean: ProjectPostBean): ProjectBean {
        return projectService.create(
                projectPostBean.toDomain()
        ).transformOrThrow { ProjectBean.from(this) }

    }

}
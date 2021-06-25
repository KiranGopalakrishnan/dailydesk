package com.dailydesk.projector.tasks

import com.dailydesk.common.authentication.User
import com.dailydesk.common.http.IterateOrThrow
import com.dailydesk.common.http.NotFound
import com.dailydesk.common.http.Success
import com.dailydesk.common.http.transformOrThrow
import com.dailydesk.common.id.ShortId
import com.dailydesk.projector.boards.beans.BoardBean
import com.dailydesk.projector.boards.beans.BoardPostBean
import com.dailydesk.projector.tasks.beans.TaskBean
import com.dailydesk.projector.tasks.beans.TaskPostBean
import com.dailydesk.projector.tasks.models.TaskStatus
import com.dailydesk.projector.tasks.services.TaskService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.context.SecurityContextHolder
import javax.ws.rs.*
import javax.ws.rs.core.MediaType

@Path("/tasks")
class TasksResource() {
    @Autowired
    lateinit var taskService: TaskService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    fun getTaskById(
        @PathParam("id") taskId:String,
    ): TaskBean {
        return taskService
            .getTaskById(ShortId(taskId))
            .transformOrThrow { TaskBean.from(this) }
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}/{status}")
    fun getTaskById(
        @PathParam("id") taskId:String,
        @PathParam("status") status:String,
    ): TaskBean {
        val taskStatus = TaskStatus.valueOf(status)
        return taskService
            .updateTaskStatus(ShortId(taskId),taskStatus)
            .transformOrThrow { TaskBean.from(this) }
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/")
    fun createTask(
        taskPostBean: TaskPostBean,
    ): TaskBean {
        val auth = SecurityContextHolder.getContext().authentication
        val user = User.transform(auth.principal)
        val result = taskService.create(taskPostBean.toDomain().copy(createdBy = user.id))
        return result.transformOrThrow{ TaskBean.from(this)}
    }

}
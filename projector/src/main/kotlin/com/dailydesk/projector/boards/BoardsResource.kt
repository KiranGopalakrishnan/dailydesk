package com.dailydesk.projector.boards;

import com.dailydesk.common.authentication.User
import com.dailydesk.common.http.IterateOrThrow
import com.dailydesk.common.http.transformOrThrow
import com.dailydesk.common.id.ShortId
import com.dailydesk.projector.boards.beans.BoardBean
import com.dailydesk.projector.boards.beans.BoardPostBean
import com.dailydesk.projector.boards.services.BoardService
import com.dailydesk.projector.tasks.beans.TaskBean
import com.dailydesk.projector.tasks.beans.TaskPostBean
import com.dailydesk.projector.tasks.services.TaskService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.context.SecurityContextHolder
import javax.ws.rs.*
import javax.ws.rs.core.MediaType


@Path("/boards")
class BoardsResource() {
    @Autowired
    lateinit var boardService: BoardService;
    @Autowired
    lateinit var taskService: TaskService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/")
    fun getBoards(): List<BoardBean> {
        val auth = SecurityContextHolder.getContext().authentication
        val user = User.transform(auth.principal)
        return boardService.getAllBoards().IterateOrThrow { BoardBean.from(this) };
    }


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    fun getBoardById(
        @PathParam("id") boardId:String,
    ): BoardBean {
        return boardService
            .getBoardById(boardId)
            .transformOrThrow { BoardBean.from(this) };
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}/tasks")
    fun getTasksByBoardId(
        @PathParam("id") boardId:String,
    ): List<TaskBean> {
        return taskService
            .getAllTasksForBoard(boardId = ShortId(boardId))
            .IterateOrThrow { TaskBean.from(this) };
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}/tasks")
    fun createTask(
        @PathParam("id") boardId:String,
        taskPostBean: TaskPostBean
    ): TaskBean {
        val auth = SecurityContextHolder.getContext().authentication
        val user = User.transform(auth.principal)
        val result = taskService.create(taskPostBean.toDomain().copy(
            createdBy = user.id,
            boards = listOf(ShortId(boardId))
        ))
        return result.transformOrThrow{ TaskBean.from(this)}
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/")
    fun createBoard(
        boardPostBean: BoardPostBean,
    ): BoardBean {
        val auth = SecurityContextHolder.getContext().authentication
        val user = User.transform(auth.principal)
        return boardService.create(user,
            boardPostBean.toDomain()
        ).transformOrThrow { BoardBean.from(this) }

    }

}

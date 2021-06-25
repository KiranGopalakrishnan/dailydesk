package com.dailydesk.projector.tasks.services

import com.dailydesk.common.http.NotFound
import com.dailydesk.common.http.Response
import com.dailydesk.common.http.Success
import com.dailydesk.common.id.ShortId
import com.dailydesk.projector.tasks.models.Task
import com.dailydesk.projector.tasks.models.TaskStatus
import com.dailydesk.projector.tasks.repository.TaskRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class TaskService {
    @Autowired
    lateinit var taskRespository: TaskRepository

    fun create(task:Task): Response<Task> {
        taskRespository.save(task)
        return Success(task)
    }

    fun getAllTasksForBoard(boardId: ShortId): Response<List<Task>> {
        val tasks = taskRespository.getAllTasksForBoard(boardId)
        return if(tasks!=null){
            Success(tasks)
        }else {
            NotFound{"No tasks found for boardId"}
        }
    }

    fun getTaskById(taskId: ShortId): Response<Task> {
        val task = taskRespository.getTaskById(taskId)
        return if(task!=null){
            Success(task)
        }else {
            NotFound{"No task found with the provided id"}
        }
    }

    fun updateTaskStatus(taskId: ShortId, status: TaskStatus): Response<Task> {
        val task = taskRespository.getTaskById(taskId)
        return if(task!=null){
            taskRespository.save(task?.copy(status = status))
            Success(task)
        }else {
            NotFound{"No task found with the provided id"}
        }
    }
}
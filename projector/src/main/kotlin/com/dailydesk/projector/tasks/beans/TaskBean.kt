package com.dailydesk.projector.tasks.beans

import com.dailydesk.projector.tasks.models.Task

data class TaskBean (
    val id: String?,
    val name: String,
    val boards: List<String>? = listOf(),
    val createdBy: String?
    ){
    companion object{
        fun from(task: Task): TaskBean {
            return TaskBean(
                id = task.id?.value,
                name = task.name,
                boards = task.boards.map { it.value?:"" },
                createdBy = task.createdBy?.value
            )
        }
    }
}

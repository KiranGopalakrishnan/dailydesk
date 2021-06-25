package com.dailydesk.projector.tasks.beans

import com.dailydesk.common.id.ShortId
import com.dailydesk.projector.tasks.models.Task

data class TaskPostBean(
    val name: String,
    val boards: List<String> = emptyList()
){
    fun toDomain(): Task {
        return Task(
            id = ShortId(),
            name = name,
            boards = boards.map { ShortId(it) },
        )
    }
}

package com.dailydesk.projector.tasks.models

import com.dailydesk.common.id.ShortId

enum class TaskStatus {
    CREATED,
    IN_PROGRESS,
    DONE
}

data class Task(
    val id:ShortId? = ShortId(),
    val name: String,
    val boards: List<ShortId> = listOf(),
    val status: TaskStatus = TaskStatus.CREATED,
    val createdBy: ShortId? = null
)

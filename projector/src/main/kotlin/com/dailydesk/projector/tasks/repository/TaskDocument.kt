package com.dailydesk.projector.tasks.repository

enum class TaskDocument(val key: String) {
    ID("id"),
    NAME("name"),
    BOARDS("boards"),
    STATUS("status"),
    CREATED_BY("created_by")
}
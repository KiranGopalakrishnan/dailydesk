package com.dailydesk.projector.boards.beans

import com.dailydesk.common.id.ShortId
import com.dailydesk.projector.boards.models.Board

data class BoardPostBean(
    val name: String,
    val projects: List<String> = listOf()
){
    fun toDomain (): Board {
        return Board(
            name = name,
            projects = projects.map { ShortId(it) }
        )
    }
}

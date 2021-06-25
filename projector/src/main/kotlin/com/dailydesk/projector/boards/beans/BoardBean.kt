package com.dailydesk.projector.boards.beans

import com.dailydesk.projector.boards.models.Board
import com.dailydesk.projector.projects.bean.ProjectBean

data class BoardBean(
    val id:String?,
    val name: String,
    val projects: List<String?> = listOf(),
    val createdBy:String?
){
    companion object {
        fun from(board: Board): BoardBean {
            return BoardBean(
                id = board.id.value,
                name =  board.name,
                projects = board.projects.map { it.value },
                createdBy = ""
            )
        }
    }
}

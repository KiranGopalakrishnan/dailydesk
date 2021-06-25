package com.dailydesk.projector.boards.models

import com.dailydesk.common.id.ShortId

data class Board(
    val id: ShortId = ShortId(),
    val name: String,
    //Projects linked in the board
    val projects:List<ShortId> = listOf(),
    val createdBy: ShortId? = null,
)
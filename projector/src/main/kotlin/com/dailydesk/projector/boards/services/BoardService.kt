package com.dailydesk.projector.boards.services

import com.dailydesk.common.authentication.User
import com.dailydesk.common.http.NotFound
import com.dailydesk.common.http.Response
import com.dailydesk.common.http.Success
import com.dailydesk.common.id.ShortId
import com.dailydesk.projector.boards.models.Board
import com.dailydesk.projector.boards.repository.BoardRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class BoardService {
    @Autowired
    lateinit var boardRepository: BoardRepository
    fun getAllBoards(): Response<List<Board>>{
        val projects = boardRepository.getAllBoards()
        return if(projects != null){
            Success(projects)
        }else{
            NotFound{ "No Boards found" }
        }
    }

    fun getBoardById(boardId:String): Response<Board>{
        val project = boardRepository.getBoard(ShortId(boardId))
        return if(project != null){
            Success(project)
        }else{
            NotFound{ "No Board found with the provided id" }
        }
    }

    fun create(user:User,board: Board):Response<Board>{
        val newBoard = board.copy(
            createdBy = user?.id
        )
        boardRepository.save(
            newBoard
        )
        return Success(newBoard)
    }

}
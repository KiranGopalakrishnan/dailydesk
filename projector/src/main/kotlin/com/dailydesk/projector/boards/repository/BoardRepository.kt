package com.dailydesk.projector.boards.repository


import com.dailydesk.common.id.ShortId
import com.dailydesk.common.mongo.CollectionFactory
import com.dailydesk.common.mongo.CommonDocumentKey
import com.mongodb.client.model.Filters
import com.dailydesk.common.mongo.EntityCollection
import com.dailydesk.projector.boards.models.Board
import com.dailydesk.projector.boards.repository.mapper.BoardDocumentMapper
import com.dailydesk.projector.projects.modals.Project
import com.dailydesk.projector.projects.repository.mapper.ProjectDocumentMapper
import org.springframework.stereotype.Repository

@Repository
class BoardRepository( collectionFactory: CollectionFactory ) {

    private val COLLECTION_NAME = "boards"

    private val entityCollection: EntityCollection<Board> = collectionFactory.create(COLLECTION_NAME, BoardDocumentMapper)

    fun save(board: Board) {
        entityCollection.save(board)
    }

    fun getAllBoards(): List<Board>? {
//        val userFilter = Filters.eq(BoardDocument.ID.key,projectId.value)
        return entityCollection.findAll()
    }

    fun getBoard(id: ShortId): Board? {
        return entityCollection.findOne(Filters.eq(BoardDocument.ID.key,id.value))
    }
}
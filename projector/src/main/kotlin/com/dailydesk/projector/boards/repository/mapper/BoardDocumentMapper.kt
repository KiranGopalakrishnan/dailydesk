package com.dailydesk.projector.boards.repository.mapper

import com.dailydesk.common.id.ShortId
import com.dailydesk.common.mongo.DocumentMapper
import com.dailydesk.projector.boards.models.Board
import com.dailydesk.projector.boards.repository.BoardDocument
import org.bson.Document

object BoardDocumentMapper: DocumentMapper<Board> {
    override fun toDocument(domainObject: Board): Document {
        val document = Document()
        document.append(BoardDocument.ID.key, domainObject.id?.value)
        document.append(BoardDocument.NAME.key,domainObject.name)
        document.append(BoardDocument.PROJECTS.key,domainObject.projects.map { it.value })
        return document
    }

    override fun fromDocument(document: Document): Board {
        val id = document.getString(BoardDocument.ID.key)
        val name = document.getString(BoardDocument.NAME.key)
        val projects = document.getList(BoardDocument.PROJECTS.key, String::class.java) ?: listOf()
        return Board(
            id = ShortId(id),
            name = name,
            projects = projects?.map{ ShortId(it)}
        )
    }
}
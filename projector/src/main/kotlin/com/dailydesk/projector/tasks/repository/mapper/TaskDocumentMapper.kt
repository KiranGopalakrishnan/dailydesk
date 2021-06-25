package com.dailydesk.projector.tasks.repository.mapper

import com.dailydesk.common.id.ShortId
import com.dailydesk.common.mongo.DocumentMapper
import com.dailydesk.projector.tasks.models.Task
import com.dailydesk.projector.tasks.models.TaskStatus
import com.dailydesk.projector.tasks.repository.TaskDocument
import org.bson.Document

object TaskDocumentMapper: DocumentMapper<Task> {
    override fun toDocument(domainObject: Task): Document {
        val document = Document()
        document.append(TaskDocument.ID.key, domainObject.id?.value)
        document.append(TaskDocument.NAME.key, domainObject.name)
        document.append(TaskDocument.BOARDS.key, domainObject.boards.map { it.value })
        document.append(TaskDocument.STATUS.key, domainObject.status.name)
        document.append(TaskDocument.CREATED_BY.key,domainObject.createdBy?.value)
        return document
    }

    override fun fromDocument(document: Document): Task {
        val id = document.getString(TaskDocument.ID.key)
        val name = document.getString(TaskDocument.NAME.key)
        val boards = document.getList(TaskDocument.BOARDS.key, String::class.java)
        val status = document.getString(TaskDocument.STATUS.key)
        val createdBy = document.getString(TaskDocument.CREATED_BY.key)
        return Task(
            id=ShortId(id),
            name=name,
            boards= boards.map { ShortId(it) },
            status = TaskStatus.valueOf(status),
            createdBy = ShortId(createdBy)
        )
    }

}

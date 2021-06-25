package com.dailydesk.projector.tasks.repository

import com.dailydesk.common.id.ShortId
import com.dailydesk.common.mongo.CollectionFactory
import com.dailydesk.common.mongo.EntityCollection
import com.dailydesk.projector.tasks.models.Task
import com.dailydesk.projector.tasks.repository.mapper.TaskDocumentMapper
import com.mongodb.client.model.Filters
import org.springframework.stereotype.Repository

@Repository
class TaskRepository(collectionFactory: CollectionFactory) {
    private val COLLECTION = "tasks"
    private val entityCollection: EntityCollection<Task> = collectionFactory.create(COLLECTION,TaskDocumentMapper)

    fun save(task: Task) {
        entityCollection.save(task)
    }

    fun getAllTasksForBoard(boardId: ShortId): List<Task>? {
        val filters = Filters.`in`(TaskDocument.BOARDS.key, listOf(boardId.value))
        return entityCollection.findAll(filters)
    }

    fun getTaskById(taskId: ShortId): Task? {
        val filters = Filters.`in`(TaskDocument.ID.key, listOf(taskId.value))
        return entityCollection.findOne(filters)
    }
}
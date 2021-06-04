package com.dailydesk.projector.projects.repository

import com.dailydesk.common.mongo.CollectionFactory
import com.mongodb.client.model.Filters
import com.dailydesk.common.mongo.EntityCollection
import com.dailydesk.projector.projects.modals.Project
import com.dailydesk.projector.projects.modals.ProjectId
import com.dailydesk.projector.projects.repository.mapper.ProjectDocumentMapper
import org.springframework.stereotype.Repository

@Repository
class ProjectRepository(val collectionFactory: CollectionFactory) {

    private val COLLECTION_NAME = "projects"

    private val entityCollection: EntityCollection<Project> = collectionFactory.create(COLLECTION_NAME, ProjectDocumentMapper)

    fun save(project: Project) {
         entityCollection.save(project)
    }

    fun getAllProjects(): List<Project>? {
        return entityCollection.findAll()
    }

    fun getProject(id: ProjectId): Project? {
        return entityCollection.findOne(Filters.eq(ProjectDocument.ID.toKey(),id.id))
    }
}
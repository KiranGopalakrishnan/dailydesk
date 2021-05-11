package com.dailydesk.projects.services

import com.dailydesk.common.http.NotFound
import com.dailydesk.common.http.Response
import com.dailydesk.common.http.Success
import com.dailydesk.projects.modals.Project
import com.dailydesk.projects.repository.ProjectRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class ProjectService {
    @Autowired
    lateinit var projectRepository: ProjectRepository
    fun getAllProjects(): Response<List<Project>>{
        val projects = projectRepository.getAllProjects()
        return if(projects != null){
            Success(projects)
        }else{
            NotFound{ "No projects found" }
        }
    }

    fun create(project: Project):Response<Project>{
        projectRepository.save(project)
        return Success(project)
    }

}
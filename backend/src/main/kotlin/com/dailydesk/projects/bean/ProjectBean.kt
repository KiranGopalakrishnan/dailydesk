package com.dailydesk.projects.bean

import com.dailydesk.projects.modals.Project


data class ProjectBean(
        val id: String?,
        val name: String
) {
    companion object{
        fun from(project: Project): ProjectBean {
            return ProjectBean(
                    id = project.id?.id,
                    name = project.name
            )
        }
    }
}
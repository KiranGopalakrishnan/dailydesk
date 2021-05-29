package com.dailydesk.projects.bean

import com.dailydesk.projects.modals.Project

data class ProjectPostBean(
        val name: String
) {


    fun toDomain(): Project {
        return Project(
                name = name
        )
    }
}
package com.dailydesk.projector.projects.modals

import java.util.*

inline class ProjectId(val id: String = UUID.randomUUID().toString())

data class Project(val id: ProjectId? = ProjectId(), val name:String ) {}
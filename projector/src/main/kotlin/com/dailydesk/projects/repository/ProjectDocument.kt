package com.dailydesk.projects.repository

import com.dailydesk.common.mongo.DocumentKeys

enum class ProjectDocument:DocumentKeys {
 ID {
     override fun toKey(): String  =  this.toString().lowercase()
 },NAME {
        override fun toKey(): String  =  this.toString().lowercase()
    }
}
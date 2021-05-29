package com.dailydesk.common.mongo

import org.bson.conversions.Bson
import org.springframework.stereotype.Component

@Component
interface EntityCollection<T> {

    public fun save(domain: T): Unit

    public fun findOne(filter: Bson):T?

    public fun findAll(): List<T>?

}
package com.projector.common.mongo

import com.mongodb.MongoWriteException
import com.mongodb.client.FindIterable
import com.mongodb.client.MongoCollection
import com.mongodb.client.MongoDatabase
import com.mongodb.client.model.Filters
import org.bson.Document
import org.bson.conversions.Bson
import org.springframework.stereotype.Component
import java.util.*

public class EntityCollectionImpl<T>(private val collectionName:String,private val db: MongoDatabase,private val mapper: DocumentMapper<T>) : EntityCollection<T> {

    override fun save(domain: T):Unit {
        try {
            this.db.getCollection(this.collectionName).insertOne(mapper.toDocument(domain))
        }catch (exception:MongoWriteException){
            throw exception;
        }
    }

    override fun findOne(filter: Bson): T? {
        val result =  this.db.getCollection(this.collectionName).find(filter).firstOrNull()
        return result?.let { mapper.fromDocument(it) }
    }

    override fun findAll(): List<T>? {
        var result = this.db.getCollection(this.collectionName).find();
        return result?.let { it -> it.toList().map { document -> mapper.fromDocument(document) } }
    }


}
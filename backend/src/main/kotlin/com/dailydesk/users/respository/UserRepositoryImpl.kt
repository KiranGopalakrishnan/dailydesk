package com.dailydesk.users.respository

import com.mongodb.client.model.Filters
import com.dailydesk.common.mongo.CollectionFactory
import com.dailydesk.common.mongo.EntityCollection
import com.dailydesk.users.modal.User
import com.dailydesk.users.respository.mapper.UserDocumentMapper
import org.springframework.stereotype.Repository

@Repository
class UserRepositoryImpl(val collectionFactory:CollectionFactory):UserRepository{
    private val COLLECTION_NAME = "users"
    private val entityCollection:EntityCollection<User> = collectionFactory.create(COLLECTION_NAME,UserDocumentMapper)

    override fun save(domain: User) {
        entityCollection.save(domain);
    }

    override fun findUser(email:String): User? {
        return entityCollection.findOne(Filters.eq(UserDocument.EMAIL.toKey(),email))
    }

    override fun findAllUsers(): List<User>? {
        return entityCollection.findAll()
    }

}
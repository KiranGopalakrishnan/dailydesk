package com.projector.users.respository.mapper

import com.projector.common.mongo.DocumentKeys
import com.projector.common.mongo.DocumentMapper
import com.projector.users.modal.Password
import com.projector.users.modal.User
import com.projector.users.modal.UserId
import com.projector.users.respository.UserDocument
import org.bson.Document



object UserDocumentMapper:DocumentMapper<User> {

    override fun toDocument(domainObject: User): Document {

        val document =  Document()
        document.append(UserDocument.ID.toKey(), domainObject.id?.value)
        document.append(UserDocument.EMAIL.toKey(),domainObject.email)
        document.append(UserDocument.PASSWORD.toKey(),domainObject.password.toEncrypted())
        document.append(UserDocument.FIRSTNAME.toKey(),domainObject.firstname)
        document.append(UserDocument.LASTNAME.toKey(),domainObject.lastname)
        return document
    }

    override fun fromDocument(document: Document): User {

        val id = document.getString(UserDocument.ID.toKey())
        val firstname = document.getString(UserDocument.FIRSTNAME.toKey())
        val lastname = document.getString(UserDocument.LASTNAME.toKey())
        val email = document.getString(UserDocument.EMAIL.toKey())
        val password = document.getString(UserDocument.PASSWORD.toKey())

        return User(
                id= UserId(id),
                email = email,
                password = Password(password),
                firstname = firstname,
                lastname = lastname
        )
    }

}
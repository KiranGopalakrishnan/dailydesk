package com.dailydesk.users.respository.mapper

import com.dailydesk.common.mongo.DocumentMapper
import com.dailydesk.users.modal.Password
import com.dailydesk.users.modal.User
import com.dailydesk.users.modal.UserId
import com.dailydesk.users.respository.UserDocument
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
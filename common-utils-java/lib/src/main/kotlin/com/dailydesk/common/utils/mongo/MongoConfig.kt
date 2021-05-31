package com.dailydesk.common.mongo

import com.mongodb.client.MongoClient
import com.mongodb.client.MongoClients
import com.mongodb.client.MongoDatabase
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
public class MongoConfig {

    @Bean
    public fun mongoClient(): MongoClient {
        return MongoClients.create("mongodb://localhost:27017")
    }

   public fun getDatabase(): MongoDatabase {
       return this.mongoClient().getDatabase("projector-main")
   }

}
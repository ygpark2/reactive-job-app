package com.fergus.repository

import com.fergus.model.User
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import reactor.core.publisher.Mono

interface UserRepository : ReactiveMongoRepository<User, String> {

    fun findUserByEmail(email: String): Mono<User>

}

package com.fergus.repository

import com.fergus.model.Note
import kotlinx.coroutines.flow.Flow
import org.springframework.data.mongodb.repository.DeleteQuery
import org.springframework.data.mongodb.repository.Query
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono


@Repository
interface NoteRepository : ReactiveMongoRepository<Note, String> {

    @DeleteQuery(value = "{'jobId': ?0 }")
    fun deleteAllByJobId(jobId: String): Mono<Void>

    // @Query(value = "{'jobId': ?0 }")
    fun findAllByJobId(jobId: String): Flux<Note>

    fun countByJobId(jobId: String): Mono<Long>
}
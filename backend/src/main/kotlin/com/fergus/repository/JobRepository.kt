package com.fergus.repository

import com.fergus.model.Job
import org.springframework.data.mongodb.repository.DeleteQuery
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Flux


@Repository
interface JobRepository : ReactiveMongoRepository<Job, String> {

    @DeleteQuery(value = "{'docId': ?0 }")
    fun deleteJob(docId: String): Flux<Job>

    fun findAllByOrderByCreatedAtDesc(): Flux<Job>
}
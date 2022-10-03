package com.fergus.service

import com.fergus.model.Address
import com.fergus.model.Job
import com.fergus.model.Status
import com.fergus.repository.JobRepository
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono


@Service
class JobService(private val jobRepository: JobRepository) {

    fun findAll() = jobRepository.findAll()

    fun count() = jobRepository.count()

    fun findOne(id: String): Mono<Job> = this.jobRepository.findById(id)

    fun getJob(id: String): Mono<Job> {
        return this.jobRepository.findById(id)
    }

    fun save(job: Job): Mono<Job> {
        return this.jobRepository.save(job)
    }

    fun update(job: Job): Mono<Job>? {
        return job.docId?.let {
            this.jobRepository.findById(it)
                .map { j -> job }
                .flatMap(this.jobRepository::save)
        }
    }

    fun deleteAll(): Mono<Void> = this.jobRepository.deleteAll()

    fun deleteJob(id: String): Mono<Void> {
        return this.jobRepository.deleteById(id)
    }

    suspend fun init() {
        val address1 = Address("test 1", "street 1", "city 1", "2083")
        val address2 = Address("test 2", "street 2", "city 2", "2084")
        save(Job("My first job", "+83 3828372", address1, Status.ACTIVE))
        save(Job("My second job", "+83 3828372", address2, Status.COMPLETED))
    }
}
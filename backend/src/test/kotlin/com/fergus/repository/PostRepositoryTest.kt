package com.fergus.repository

import com.fergus.model.Job
import com.fergus.model.Status
import kotlinx.coroutines.runBlocking
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest
import org.springframework.data.mongodb.core.ReactiveFluentMongoOperations


@DataMongoTest
class PostRepositoryTest(@Autowired private val mongo: ReactiveFluentMongoOperations) {
    private val posts: JobRepository = JobRepository(mongo)

    @Test
    fun `get all posts test`() {
        runBlocking {

            val inserted: Job = posts.save(Job(title = "mytitle", content = "mycontent", status = Status.COMPLETED))

            assertNotNull(inserted.id)
            println("inserted id: $inserted.id")

            val post = posts.findOne(inserted.id!!)
            assertEquals("mytitle", post.title)
            assertEquals("mycontent", post.content)
        }

    }


}

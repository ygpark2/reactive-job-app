package com.fergus

import com.fergus.repository.JobRepository
import com.fergus.service.JobService
import io.swagger.v3.oas.annotations.OpenAPIDefinition
import io.swagger.v3.oas.annotations.info.Contact
import io.swagger.v3.oas.annotations.info.Info
import io.swagger.v3.oas.annotations.servers.Server
import kotlinx.coroutines.runBlocking
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.web.ServerProperties
import org.springframework.boot.context.event.ApplicationReadyEvent
import org.springframework.boot.runApplication
import org.springframework.context.event.EventListener
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories
import org.springframework.stereotype.Component
import org.springframework.web.reactive.config.EnableWebFlux

@EnableWebFlux
@EnableReactiveMongoRepositories
@SpringBootApplication
class Application
fun main(args: Array<String>) { runApplication<Application>(*args) }


@Component
class DataInitializer(private val jobService: JobService, private val sp: ServerProperties) {

    @EventListener(value = [ApplicationReadyEvent::class])
    fun init() {
        println("\t📁 API document : http://localhost:${sp.port}/swagger-ui.html \n")
        println("\t🐑 Swagger Yaml : http://localhost:${sp.port}/docs.yaml\n")

        println("\t🚀 start data initialization ...\n")
        runBlocking {
            val deleted = jobService.deleteAll()
            println("\t[$deleted] posts removed ")
            jobService.init()
        }
        println("\n\t OK: done data initialization... 🐲\n")
    }

}

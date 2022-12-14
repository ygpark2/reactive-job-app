package com.fergus

import com.fergus.config.security.JwtService
import com.fergus.model.Job
import com.fergus.model.Role.USER
import kotlinx.coroutines.reactive.asFlow
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT
import org.springframework.test.web.reactive.server.WebTestClient
import reactor.core.publisher.Flux

@SpringBootTest(webEnvironment = RANDOM_PORT)
class AppTest {
    @Autowired lateinit var client: WebTestClient
    @Autowired lateinit var jwtService: JwtService

    fun accessToken() = accessToken("user@example.com", "ROLE_$USER")

    fun accessToken(email: String, role: String) =
        "Bearer " + jwtService.accessToken(email, 1000 * 60, arrayOf(role))


    // Usage example: @MockBean given(posts.findAll()).willReturn(postsFlow)
    val postsFlow = Flux.just("Post one", "Post two")
        .map { Job(title = it, content = "content of $it") }
        .asFlow()

}

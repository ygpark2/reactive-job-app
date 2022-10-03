package com.fergus.controller

import com.fergus.AppTest
import com.fergus.model.User
import com.fergus.service.UserService
import com.fergus.TestHelper
import kotlinx.coroutines.runBlocking
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpHeaders
import org.springframework.test.web.reactive.server.expectBodyList

internal class UserControllerTest(@Autowired private val userService: UserService) : AppTest() {

    @Test
    fun `Given a user when tries to fetch data from users API without AUTHORIZATION header then receives an UNAUTHORIZED error`() {
        client
                .get().uri("/v1/customers")
                .exchange()
                .expectStatus().isUnauthorized
    }

    @Test
    fun `Given a user when tries to fetch data from users API with AUTHORIZATION header but without starting with Bearer then receives an UNAUTHORIZED error`() {
        client
                .get().uri("/v1/customers")
                .header(HttpHeaders.AUTHORIZATION, accessToken().replace("Bearer ", ""))
                .exchange()
                .expectStatus().isOk
    }

    @Test
    fun `Given a user when tries to fetch data from users API with AUTHORIZATION header but with a not compliant Bearer token then receives an UNAUTHORIZED error`() {
        client
                .get().uri("/v1/customers")
                .header(HttpHeaders.AUTHORIZATION, "Bearer test")
                .exchange()
                .expectStatus().isUnauthorized
    }

    @Test
    fun `Given a user when tries to fetch data from users API with AUTHORIZATION then receives the data`() {
        runBlocking {
            val user = TestHelper.randomUser()

            userService.save(user)

            client
                    .get().uri("/api/v1/users")
                    .header(HttpHeaders.AUTHORIZATION, accessToken())
                    .exchange()
                    .expectStatus().isOk
                    .expectBodyList<User>()
                    .contains(user)
        }
    }
}

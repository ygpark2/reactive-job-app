package com.fergus.service

import com.fergus.model.Role
import com.fergus.model.User
import kotlinx.coroutines.runBlocking
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.context.event.ApplicationReadyEvent
import org.springframework.context.event.EventListener
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component
import java.util.*

@Component
class TestUserInitializer(
    private val userService: UserService,
    private val passwordEncoder: PasswordEncoder,
    @Value("\${app.first_user.username}") val firstUsername: String,
    @Value("\${app.first_user.password}") val firstPassword: String
) {
    @EventListener(ApplicationReadyEvent::class)
    fun init() {
        runBlocking {
            val firstUser = userService.findByEmail(firstUsername)

            if (null == firstUser) {
                val user = User(
                    "test name",
                    "test nick name",
                    firstUsername,
                    "053 631 1883",
                    "http://localhost",
                    passwordEncoder.encode(firstPassword),
                    Role.USER
                )
                userService.save(user)

                log.info("First customer created: $firstUsername")
            } else {
                log.info("First customer already created")
            }
        }
    }

    companion object {
        private val log = LoggerFactory.getLogger(this::class.java)
    }
}

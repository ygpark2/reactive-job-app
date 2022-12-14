package com.fergus.config.security

import com.fergus.config.exception.HttpExceptionFactory.unauthorized
import kotlinx.coroutines.reactor.mono
import org.slf4j.LoggerFactory
import org.springframework.security.core.Authentication
import org.springframework.security.core.userdetails.User
import org.springframework.security.web.server.WebFilterExchange
import org.springframework.security.web.server.authentication.ServerAuthenticationSuccessHandler
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono

@Component
class JwtAuthSuccessHandler(private val jwtService: JwtService) : ServerAuthenticationSuccessHandler {
    companion object {
        private const val FIFTEEN_MIN = 1000 * 60 * 15
        private const val FOUR_HOURS = 1000 * 60 * 60 * 4
        private val log = LoggerFactory.getLogger(this::class.java)
    }

    override fun onAuthenticationSuccess(
        webFilterExchange: WebFilterExchange, authentication: Authentication
    ): Mono<Void> = mono {
        val principal = authentication.principal ?: throw unauthorized()

        when (principal) {
            is User -> {
                val roles = principal.authorities.map { it.authority }.toTypedArray()

                val accessToken = jwtService.accessToken(principal.username, FIFTEEN_MIN, roles)
                val refreshToken = jwtService.refreshToken(principal.username, FOUR_HOURS, roles)

                val exchange = webFilterExchange.exchange ?: throw unauthorized()

                log.info("User with roles: $roles")

                with(exchange.response.headers) {
                    setBearerAuth(accessToken)
                    set("Refresh-Token", refreshToken)
                }

            }
            else -> throw RuntimeException("Not User!") // TODO: separate exception
        }
        return@mono null
    }
}

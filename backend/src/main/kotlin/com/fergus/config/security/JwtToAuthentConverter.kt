package com.fergus.config.security

import com.fergus.config.exception.HttpExceptionFactory.badRequest
import com.fergus.dto.LoginRequest
import com.fergus.service.UserDetailsService
import kotlinx.coroutines.reactive.awaitFirstOrNull
import kotlinx.coroutines.reactor.mono
import org.slf4j.LoggerFactory
import org.springframework.core.ResolvableType
import org.springframework.http.MediaType
import org.springframework.http.codec.json.AbstractJackson2Decoder
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.web.server.authentication.ServerAuthenticationConverter
import org.springframework.stereotype.Component
import org.springframework.web.server.ServerWebExchange
import reactor.core.publisher.Mono

@Component
class JwtToAuthentConverter(private val jacksonDecoder: AbstractJackson2Decoder,
                            private val userDetailsService: UserDetailsService
) : ServerAuthenticationConverter {

    override fun convert(exchange: ServerWebExchange): Mono<Authentication> = mono {
        val loginRequest: LoginRequest = getUsernameAndPassword(exchange) ?: throw badRequest()

        userDetailsService.findByUsername(loginRequest.username).map {
            UsernamePasswordAuthenticationToken(it, loginRequest.password)
        }.awaitFirstOrNull()
    }

    private suspend fun getUsernameAndPassword(exchange: ServerWebExchange): LoginRequest? {
        val dataBuffer = exchange.request.body
        val type = ResolvableType.forClass(LoginRequest::class.java)
        return jacksonDecoder
            .decodeToMono(dataBuffer, type, MediaType.APPLICATION_JSON, mapOf())
            .onErrorResume { Mono.empty<LoginRequest>() }
            .cast(LoginRequest::class.java)
            .awaitFirstOrNull()
    }

    companion object {
        private val log = LoggerFactory.getLogger(this::class.java)
    }
}

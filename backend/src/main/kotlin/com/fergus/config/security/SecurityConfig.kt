package com.fergus.config.security

import com.fergus.model.Role.ADMIN
import com.fergus.service.UserDetailsService
import org.springframework.context.annotation.Bean
import org.springframework.http.HttpMethod.POST
import org.springframework.http.codec.json.AbstractJackson2Decoder
import org.springframework.http.codec.json.Jackson2JsonDecoder
import org.springframework.security.authentication.ReactiveAuthenticationManager
import org.springframework.security.authentication.UserDetailsRepositoryReactiveAuthenticationManager
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity
import org.springframework.security.config.web.server.SecurityWebFiltersOrder
import org.springframework.security.config.web.server.ServerHttpSecurity
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.server.SecurityWebFilterChain
import org.springframework.security.web.server.authentication.AuthenticationWebFilter
import org.springframework.security.web.server.authentication.ServerAuthenticationConverter
import org.springframework.security.web.server.authentication.ServerAuthenticationFailureHandler
import org.springframework.security.web.server.authentication.ServerAuthenticationSuccessHandler
import org.springframework.security.web.server.context.NoOpServerSecurityContextRepository
import org.springframework.security.web.server.util.matcher.ServerWebExchangeMatchers

@EnableWebFluxSecurity
@EnableReactiveMethodSecurity
class SecurityConfig {

    companion object {
        val EXCLUDED_PATHS = arrayOf(
            "/", "/static/**", "/index.html", "/favicon.ico",
            "/docs/**", "/docs.yaml", "/webjars/**",
            "/api/v1/jobs", "/api/v1/users/login", "/api/v1/users/register",
            "/v1/api-docs", "/swagger-ui.html", "/swagger-ui/**"
        )
    }

    //    https://docs.spring.io/spring-security/reference/5.6.0-RC1/reactive/configuration/webflux.html
    @Bean
    fun configureSecurity(
        http: ServerHttpSecurity, jwtService: JwtService, jwtAuthenticationFilter: AuthenticationWebFilter
    ): SecurityWebFilterChain = http
        .csrf().disable()
        .formLogin().disable()
        .logout().disable()
        .httpBasic().disable()
        .authorizeExchange()
        .pathMatchers(*EXCLUDED_PATHS).permitAll()
        .pathMatchers("/api/v1/admins/**").hasRole(ADMIN.name)
        .anyExchange().authenticated()
        .and()
        .addFilterAt(jwtAuthenticationFilter, SecurityWebFiltersOrder.AUTHENTICATION)
        .addFilterAt(JwtTokenReactFilter(jwtService), SecurityWebFiltersOrder.AUTHORIZATION)
        .securityContextRepository(NoOpServerSecurityContextRepository.getInstance())
        .build()

    @Bean
    fun authenticationWebFilter(
        manager: ReactiveAuthenticationManager,
        jwtConverter: ServerAuthenticationConverter,
        successHandler: ServerAuthenticationSuccessHandler,
        failureHandler: ServerAuthenticationFailureHandler
    ): AuthenticationWebFilter = AuthenticationWebFilter(manager).apply {
        setRequiresAuthenticationMatcher {
            ServerWebExchangeMatchers.pathMatchers(POST, "/api/v1/users/login").matches(it)
        }
        setServerAuthenticationConverter(jwtConverter)

        setAuthenticationSuccessHandler(successHandler)
        setAuthenticationFailureHandler(failureHandler)

        setSecurityContextRepository(NoOpServerSecurityContextRepository.getInstance())
    }

    @Bean
    fun jacksonDecoder(): AbstractJackson2Decoder = Jackson2JsonDecoder()

    @Bean
    fun passwordEncoder(): PasswordEncoder = BCryptPasswordEncoder()

    @Bean
    fun reactiveAuthenticationManager(userService: UserDetailsService): ReactiveAuthenticationManager =
        UserDetailsRepositoryReactiveAuthenticationManager(userService).apply {
            setPasswordEncoder(passwordEncoder())
        }
}

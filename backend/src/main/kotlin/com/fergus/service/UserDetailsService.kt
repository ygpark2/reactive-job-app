package com.fergus.service

import com.fergus.model.User
import kotlinx.coroutines.reactor.mono
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.MapReactiveUserDetailsService
import org.springframework.security.core.userdetails.ReactiveUserDetailsService
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import reactor.core.publisher.Mono


@Service
class UserDetailsService(private val userService: UserService) : ReactiveUserDetailsService {

    override fun findByUsername(username: String?): Mono<UserDetails> = mono {
        val user: User = userService.findByEmail(username!!)
            ?: throw BadCredentialsException("Invalid Credentials")

        val authorities: List<GrantedAuthority> = listOf(user)

        org.springframework.security.core.userdetails.User(
            user.email,
            user.password,
            authorities
        )
    }

    // TODO: uncomment for local test only
    //  @Bean
    fun inMemoryUserDetailsService(passwordEncoder: PasswordEncoder): MapReactiveUserDetailsService {
        val admin: UserDetails = org.springframework.security.core.userdetails.User
            .withUsername("admin")
            .password("admin")
            .roles("USER", "ADMIN")
            .passwordEncoder(passwordEncoder::encode)
            .build()
        println("admin: $admin")
        return MapReactiveUserDetailsService(admin)
    }
}

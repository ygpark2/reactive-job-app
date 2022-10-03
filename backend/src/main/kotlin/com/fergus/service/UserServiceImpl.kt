package com.fergus.service

import com.fergus.model.User
import com.fergus.repository.UserRepository
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.reactive.asFlow
import kotlinx.coroutines.reactive.awaitFirstOrNull
import kotlinx.coroutines.reactive.awaitSingle
import org.springframework.stereotype.Service
import java.util.UUID


@Service
class UserServiceImpl(private val userRepository: UserRepository) : UserService {

    override fun all(): Flow<User> = userRepository.findAll().asFlow()

    override suspend fun save(user: User): User {
        return userRepository.insert(user).awaitSingle()
    }

    override suspend fun findByEmail(email: String): User? =
        userRepository.findUserByEmail(email).awaitFirstOrNull()
}

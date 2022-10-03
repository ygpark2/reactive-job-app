package com.fergus.service

import com.fergus.model.User
import kotlinx.coroutines.flow.Flow

interface UserService {
    fun all(): Flow<User>

    suspend fun save(customer: User): User

    suspend fun findByEmail(email: String): User?
}

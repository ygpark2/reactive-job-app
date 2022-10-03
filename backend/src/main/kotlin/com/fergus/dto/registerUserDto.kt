package com.fergus.dto

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fergus.model.User
import org.springframework.security.crypto.password.PasswordEncoder

data class RegisterUserDto(

    val name: String,

    val nickName: String,

    val email: String,

    val phoneNumber: String,

    val website: String,

    val password: String,

    ) {

    @JsonIgnore
    fun getUser(passwordEncoder: PasswordEncoder): User {
        val encodedPassword = passwordEncoder.encode(password)
        return User(name, nickName, email, phoneNumber, website, encodedPassword)
    }
}

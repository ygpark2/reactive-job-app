package com.fergus.controller

import com.fergus.dto.RegisterUserDto
import com.fergus.model.User
import com.fergus.service.UserService
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/api/v1/users")
class UserController(private val passwordEncoder: PasswordEncoder,
                     private val userService: UserService) {

    @GetMapping
    fun findAll() = userService.all()

    @PostMapping("register")
    suspend fun register(@RequestBody registerUserDto: RegisterUserDto) =
        userService.save(registerUserDto.getUser(passwordEncoder))

}

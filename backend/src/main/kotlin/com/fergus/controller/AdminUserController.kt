package com.fergus.controller

import com.fergus.service.UserService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping("/api/v1/admins")
class AdminUserController(private val userService: UserService) {

    // @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    fun findAll() = userService.all()
}

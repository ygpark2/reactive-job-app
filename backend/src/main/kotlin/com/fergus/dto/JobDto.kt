package com.fergus.dto

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fergus.model.Address
import com.fergus.model.Job
import com.fergus.model.Status
import com.fergus.model.User
import org.springframework.security.crypto.password.PasswordEncoder

data class JobDto(

    val name: String,

    val phone: String,

    val address: Address,

    val status: Status,

) {

    @JsonIgnore
    fun getJob(): Job {
        return Job(name, phone, address, status)
    }
}

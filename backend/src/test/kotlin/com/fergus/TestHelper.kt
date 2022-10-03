package com.fergus

import com.fergus.model.User
import java.util.UUID.randomUUID

internal object TestHelper {

    fun randomUser() = randomUUID().toString().let {
        User(
            id = it.take(4),
            name = "test Name",
            email = "${it.substring(4, 4)}@example.com",
            age = 34,
            hobby = "test hobby",
            password = "SECRET-$it"
        )
    }
}

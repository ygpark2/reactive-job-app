package com.fergus.model

import com.fergus.model.Role.USER
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.Id
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.mongodb.core.index.Indexed
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.security.core.GrantedAuthority
import java.time.LocalDateTime


@Document
data class User(

    val name: String,

    val nickName: String,

    @Indexed(unique = true)
    val email: String,

    val phoneNumber: String,

    val website: String,

    val password: String,

    val role: Role = USER,

) : BaseDocumentEntity(), GrantedAuthority {

    override fun getAuthority(): String = "ROLE_$role"

    override fun hashCode(): Int = docId.hashCode()
    override fun equals(other: Any?): Boolean = other is User && other.docId == docId
}

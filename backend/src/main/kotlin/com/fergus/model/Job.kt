package com.fergus.model

import com.fergus.dto.JobDto
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDateTime

// "scheduled", "active", "invoicing", “to priced” or “completed”.
enum class Status {
    SCHEDULED,
    ACTIVE,
    INVOCING,
    PRICED,
    COMPLETED
}


@Document
data class Job(

    var name: String,

    var phone: String,

    var address: Address,

    var status: Status,

) : BaseDocumentEntity() {

    fun update(jobDto: JobDto): Job {
        name = jobDto.name
        phone = jobDto.phone
        address = jobDto.address
        status = jobDto.status
        return this
    }

}

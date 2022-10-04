package com.fergus.dto

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fergus.model.Address
import com.fergus.model.Job
import com.fergus.model.Status
import org.springframework.data.domain.Example
import org.springframework.data.domain.ExampleMatcher
import org.springframework.data.domain.Sort
import java.util.*


data class JobQueryDto(

    val filterFieldName: String?,    // "name", "phone", "address.addressLine", "address.street", "address.city", "address.postCode", "status"

    val filterValue: String?,

    val sortFieldName: String?,

    val sortOrder: String?,  // ASC, DESC

) {

    @JsonIgnore
    private fun getStatus(status: String): Status {
        return when(status.uppercase(Locale.getDefault())) {
            "SCHEDULED" -> Status.SCHEDULED
            "ACTIVE" -> Status.ACTIVE
            "COMPLETED" -> Status.COMPLETED
            "INVOCING" -> Status.INVOCING
            "PRICED" -> Status.PRICED
            else -> Status.SCHEDULED
        }
    }

    @JsonIgnore
    fun getExample(): Example<Job>? {
        val pathArray = listOf(
            "name",
            "phone",
            "address.addressLine",
            "address.street",
            "address.city",
            "address.postCode",
            "status"
        )
        if (listOfNotNull(filterFieldName, filterValue).size == 2) {
            val fieldMap = mapOf(
                "name" to Job(filterValue!!, "", Address("", "", "", ""), Status.SCHEDULED),
                "phone" to Job("", filterValue, Address("", "", "", ""), Status.SCHEDULED),
                "address.addressLine" to Job("", "", Address(filterValue, "", "", ""), Status.SCHEDULED),
                "address.street" to Job("", "", Address("", filterValue, "", ""), Status.SCHEDULED),
                "address.city" to Job("", "", Address("", "", filterValue, ""), Status.SCHEDULED),
                "address.postCode" to Job("", "", Address("", "", "", filterValue), Status.SCHEDULED),
                "status" to Job("", "", Address("", "", "", ""), getStatus(filterValue))
            )
            val ignorePaths = pathArray.minus(filterFieldName)
            return Example.of(
                fieldMap[filterFieldName], ExampleMatcher.matchingAny()
                    .withIgnoreNullValues()
                    .withIgnorePaths(*ignorePaths.toTypedArray())
                    .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING)
            )
        }
        return null
    }

    @JsonIgnore
    fun getSort(): Sort {
        return if (listOfNotNull(sortFieldName, sortOrder).size == 2) {
            Sort.by(Sort.Direction.valueOf(sortOrder!!), sortFieldName!!)
        } else {
            Sort.by(Sort.Direction.DESC, "createdAt")
        }
    }
}

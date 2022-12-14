package com.fergus.config.exception

import org.springframework.http.HttpStatus.NOT_FOUND
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.server.ResponseStatusException

@ResponseStatus(code = NOT_FOUND)
data class JobNotFoundException(val jobId: String) :
    ResponseStatusException(NOT_FOUND, "Job: $jobId is not found...")

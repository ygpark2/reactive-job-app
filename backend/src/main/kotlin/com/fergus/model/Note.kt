package com.fergus.model

import com.fergus.dto.JobDto
import com.fergus.dto.NoteDto
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.Id
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDateTime

@Document
data class Note(

    var content: String,

    val jobId: String,

) : BaseDocumentEntity() {

    fun update(noteDto: NoteDto): Note {
        content = noteDto.content
        return this
    }
}

package com.fergus.dto

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fergus.model.*

data class NoteDto(

    val content: String,

) {

    @JsonIgnore
    fun getNote(): Note {
        return Note(content, "")
    }
}

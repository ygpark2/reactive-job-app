package com.fergus.service

import com.fergus.model.Job
import com.fergus.model.Note
import com.fergus.repository.NoteRepository
import org.springframework.data.domain.Example
import org.springframework.data.domain.Sort

import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono


@Service
class NoteService(private val noteRepository: NoteRepository) {

    fun findAll() = noteRepository.findAll()

    fun findAll(example: Example<Note>, sort: Sort) = noteRepository.findAll(example, sort)

    fun findAll(sort: Sort) = noteRepository.findAll(sort)

    fun count() = noteRepository.count()

    fun findOne(id: String): Mono<Note> = this.noteRepository.findById(id)

    fun findAllByJobId(id: String): Flux<Note> = this.noteRepository.findAllByJobIdOrderByCreatedAtDesc(id)

    fun countByJobId(id: String): Mono<Long> = this.noteRepository.countByJobId(id)

    fun getNote(id: String): Mono<Note> {
        return this.noteRepository.findById(id)
    }

    fun save(note: Note): Mono<Note> {
        return this.noteRepository.save(note)
    }

    fun update(note: Note): Mono<Note>? {
        return note.docId?.let {
            this.noteRepository.findById(it)
                .map { n -> note }
                .flatMap(this.noteRepository::save)
        }
    }

    fun deleteNote(id: String): Mono<Void> {
        return this.noteRepository.deleteById(id)
    }

    fun deleteAllByJobId(jobId: String): Mono<Void> = this.noteRepository.deleteAllByJobId(jobId)
}
package com.fergus.service

import com.fergus.model.Job
import com.fergus.model.Note
import com.fergus.repository.NoteRepository

import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono


@Service
class NoteService(private val noteRepository: NoteRepository) {

    fun findAll() = noteRepository.findAll()

    fun count() = noteRepository.count()

    fun findOne(id: String): Mono<Note> = this.noteRepository.findById(id)

    fun findByJobId(id: String): Flux<List<Note>> = this.noteRepository.findByJobIdAll(id)

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

    fun deleteByJobId(jobId: String): Mono<Void> = this.noteRepository.deleteByJobId(jobId)
}
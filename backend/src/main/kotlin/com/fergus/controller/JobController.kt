package com.fergus.controller

import com.fergus.dto.JobDto
import com.fergus.dto.JobQueryDto
import com.fergus.dto.NoteDto
import com.fergus.model.Note
import com.fergus.model.Job
import com.fergus.repository.NoteRepository
import com.fergus.repository.JobRepository
import com.fergus.service.JobService
import com.fergus.service.NoteService
import kotlinx.coroutines.awaitAll
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.reactive.asFlow
import kotlinx.coroutines.reactive.awaitFirst
import kotlinx.coroutines.reactive.awaitFirstOrNull
import kotlinx.coroutines.runBlocking
import org.springframework.data.domain.Example
import org.springframework.data.domain.ExampleMatcher
import org.springframework.data.domain.Sort
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import reactor.kotlin.core.publisher.toMono
import java.util.UUID


@RestController
@RequestMapping("/api/v1/jobs")
class JobController(
    private val jobService: JobService,
    private val noteService: NoteService
) {

    @GetMapping
    fun findAll(
        @RequestParam(required = false) filterFieldName: String?,
        @RequestParam(required = false) filterValue: String?,
        @RequestParam(required = false) sortFieldName: String?,
        @RequestParam(required = false) sortOrder: String?,
    ): Flux<Job> {
        val jobQueryDto = JobQueryDto(filterFieldName, filterValue, sortFieldName, sortOrder)
        jobQueryDto.getExample()?.let {
            return jobService.findAll(it, jobQueryDto.getSort())
        }
        return jobService.findAll(jobQueryDto.getSort())
    }

    @GetMapping("count")
    suspend fun count(): Long? = jobService.count().awaitFirstOrNull()

    @GetMapping("{id}")
    suspend fun findJob(@PathVariable id: String): Job? = jobService.findOne(id).awaitFirstOrNull()

    @PutMapping("{id}")
    suspend fun updateJob(@PathVariable id: String, @RequestBody jobDto: JobDto): Job? {
        val foundJob = jobService.findOne(id).awaitFirstOrNull()
        return foundJob?.let {
            val updatedJob = jobService.update(it.update(jobDto))
            updatedJob
        }?.awaitFirstOrNull()
    }

    @DeleteMapping("{jobId}")
    suspend fun deleteJob(@PathVariable jobId: String)  {
        noteService.deleteAllByJobId(jobId).then(jobService.deleteJob(jobId)).awaitFirstOrNull()
    }

    @PostMapping
    suspend fun save(@RequestBody jobDto: JobDto): Job? {
        val job = jobDto.getJob()
        return jobService.save(job).awaitFirstOrNull()
    }

    @GetMapping("{jobId}/notes")
    fun findNotesByJobId(@PathVariable jobId: String): Flux<Note> = noteService.findAllByJobId(jobId)

    @GetMapping("{jobId}/notes/count")
    suspend fun countNotesByJobId(@PathVariable jobId: String): Long? = noteService.countByJobId(jobId).awaitFirstOrNull()

    @PostMapping("{jobId}/notes")
    suspend fun saveNote(@PathVariable jobId: String, @RequestBody noteDto: NoteDto): Note? {
        val note = noteDto.getNote()
        val copiedNote = note.copy(jobId = jobId, content = note.content)
        return noteService.save(copiedNote).awaitFirstOrNull()
    }


    @PutMapping("{jobId}/notes/{noteId}")
    suspend fun updateNote(@PathVariable jobId: String, @PathVariable noteId: String, @RequestBody noteDto: NoteDto): Note? {
        val foundNote = noteService.findOne(jobId).awaitFirstOrNull()
        return foundNote?.let {
            val updatedNote = noteService.update(it.update(noteDto))
            updatedNote
        }?.awaitFirstOrNull()
    }


    @DeleteMapping("{jobId}/notes/{noteId}")
    suspend fun deleteNote(@PathVariable jobId: String, @PathVariable noteId: String): Void? {
        return noteService.deleteNote(noteId).awaitFirstOrNull()
    }
}

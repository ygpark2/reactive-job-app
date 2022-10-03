import { Inject, Injectable, Injector } from '@angular/core';
import {
  GET,
  POST,
  PUT,
  PATCH,
  DELETE,
  BasePath,
  Header,
  Headers,
  Query,
  Queries,
  Field,
  Path,
  Body,
  BaseService,
  ServiceBuilder,
  Response,
} from 'ts-retrofit';
import { Observable } from 'rxjs';

import { PagedContentResponse } from '@app/@shared/models';
import { ResponseJob } from '../models/job/response_job';
import { ResponseNote } from '../models/job/response_note';
import { JobDto } from '../models/job/job_dto';
import { NoteDto } from '../models/job/note_dto';


@Injectable({
  providedIn: 'root',
})
@BasePath('/api/v1/jobs/')
export class JobApiService extends BaseService {
  /*
  constructor(injector: Injector) {
    super(injector);
  }
  */

  page: number = 0;
  pageSize: number = 2;

  @GET('')
  async getJobs(@Header("Authorization") authorization: string): Promise<Response<Array<ResponseJob>>> {
    return <Response<Array<ResponseJob>>>{};
  }

  @POST('')
  async createJob(@Header("Authorization") authorization: string, @Body jobDto: JobDto): Promise<Response<ResponseJob>> {
    return <Response<ResponseJob>>{};
  }

  @GET('{jobId}')
  async getJob(@Header("Authorization") authorization: string, @Path('jobId') jobId: string): Promise<Response<ResponseJob>> {
    return <Response<ResponseJob>>{};
  }

  @PUT('{jobId}')
  async updateJob(
    @Header("Authorization") authorization: string,
    @Path('jobId') jobId: string,
    @Body jobDto: JobDto
  ): Promise<Response<ResponseJob>> {
    return <Response<ResponseJob>>{};
  }

  @DELETE('{jobId}')
  async deleteJob(@Header("Authorization") authorization: string, @Path('jobId') jobId: string): Promise<Response<ResponseJob>> {
    return <Response<ResponseJob>>{};
  }

  @GET('count')
  async getJobCount(@Header("Authorization") authorization: string): Promise<Response<number>> {
    return <Response<number>>{};
  }


  @GET('{jobId}/notes')
  async getNoteListByJob(@Header("Authorization") authorization: string, @Path('jobId') jobId: string): Promise<Response<Array<ResponseNote>>> {
    return <Response<Array<ResponseNote>>>{};
  }

  @POST('{jobId}/notes')
  async createNote(@Header("Authorization") authorization: string, @Path('jobId') jobId: string, @Body noteDto: NoteDto): Promise<Response<ResponseNote>> {
    return <Response<ResponseNote>>{};
  }

  @PUT('{jobId}/notes/{noteId}')
  async updateNote(
    @Header("Authorization") authorization: string,
    @Path('jobId') jobId: string,
    @Path('noteId') noteId: string,
    @Body noteDto: NoteDto
  ): Promise<Response<ResponseNote>> {
    return <Response<ResponseNote>>{};
  }

  @DELETE('{jobId}/notes/{noteId}')
  async deleteNote(@Header("Authorization") authorization: string, @Path('jobId') jobId: string, @Path('noteId') noteId: string): Promise<Response<ResponseNote>> {
    return <Response<ResponseNote>>{};
  }

  @GET('{jobId}/notes/count')
  async getNoteCount(@Header("Authorization") authorization: string, @Path('jobId') jobId: string): Promise<Response<number>> {
    return <Response<number>>{};
  }

}

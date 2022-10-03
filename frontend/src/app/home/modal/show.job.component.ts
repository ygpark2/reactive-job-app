import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NzModalRef } from 'ng-zorro-antd/modal';
import { addDays, formatDistance } from 'date-fns';

import { NoteDto } from '@app/@shared/models/job/note_dto';
import { ResponseJob } from '@app/@shared/models/job/response_job';
import { JobApiService } from '@app/@shared/services';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
    selector: 'app-home-show-job-modal-component',
    template: `
      <div>
        <p>Id : {{ rspJob?.docId }} </p>
        <p>Name : {{ rspJob?.name }} </p>
        <p>Phone : {{ rspJob?.phone }} </p>
        <p>Street Line : {{ rspJob?.address?.addressLine }} </p>
        <p>Street : {{ rspJob?.address?.street }} </p>
        <p>City : {{ rspJob?.address?.city }} </p>
        <p>Post Code : {{ rspJob?.address?.postCode }} </p>
        <p>Status : {{ rspJob?.status }} </p>
      </div>

      <form nz-form [formGroup]="noteForm" (ngSubmit)="submitForm()">
        <nz-form-item>
          <nz-form-label [nzSpan]="2" nzRequired> Note </nz-form-label>
          <nz-form-control [nzSpan]="22" nzErrorTip="Please write something here!">
            <textarea formControlName="content" nz-input rows="2" placeholder="write any note"></textarea>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-control [nzOffset]="7" [nzSpan]="12">
            <button nz-button nzType="primary" [disabled]="!noteForm.valid">Submit</button>
            <button nz-button (click)="resetForm($event)">Reset</button>
          </nz-form-control>
        </nz-form-item>
      </form>

      <nz-list [nzDataSource]="noteData" [nzRenderItem]="item" [nzItemLayout]="'horizontal'">
        <ng-template #item let-item>
          <nz-comment [nzAuthor]="item.author" [nzDatetime]="item.datetime">
            <nz-avatar nz-comment-avatar nzIcon="user" [nzSrc]="item.avatar"></nz-avatar>
            <nz-comment-content>
              <p>{{ item.content }}</p>
            </nz-comment-content>
            <nz-comment-action>

            </nz-comment-action>
          </nz-comment>
        </ng-template>
      </nz-list>

      <div *nzModalFooter>
        <button nz-button nzType="default" (click)="destroyModal()">Close</button>
      </div>
    `
  })
  export class ShowJobModalHomeComponent implements OnInit {

    @Input() rspJob?: ResponseJob;
    @Input() jobApiService?: JobApiService;
    @Input() jwt?: string;

    noteForm!: FormGroup;
    
    noteData = [
      {
        author: 'Han Solo',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content:
          'We supply a series of design principles, practical patterns and high quality design resources' +
          '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        datetime: formatDistance(new Date(), addDays(new Date(), 1))
      },
      {
        author: 'Han Solo',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content:
          'We supply a series of design principles, practical patterns and high quality design resources' +
          '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        datetime: formatDistance(new Date(), addDays(new Date(), 2))
      }
    ];

    constructor(private modal: NzModalRef, private notificationService: NzNotificationService, private formBuilder: FormBuilder) {
      
    }
  
    private loadNoteList() {
      if (this.jwt && this.rspJob?.docId) {
        this.jobApiService?.getNoteListByJob(this.jwt, this.rspJob?.docId).then((response) => {
          
          console.log("response data => ", response.data );
          console.log("----------------------- note list ----------------");
        }).catch(error => {
          console.log("error => ", error.message);
          console.log("error => ", error.status);
          // handleError(error)
          console.log(error)
          this.notificationService.error(
            'Error on getting note list',
            error.message,
            {nzDuration: 1500}
          );
        }).finally(() => {
          console.log("final called!!!!");
        });
      }
    }

    ngOnInit(): void {
      console.log("----------------------- note ngOnInit ----------------");
      this.loadNoteList();
      this.noteForm = this.formBuilder.group({
        content: [null, [Validators.required]]
      });
    }

    submitForm(): void {
      if (this.noteForm.valid) {
        console.log('submit', this.noteForm.value);
        const noteData = {
          content: this.noteForm.value.content
        } as NoteDto
        if (this.jwt && this.rspJob?.docId) {
          this.jobApiService?.createNote(this.jwt ?? '', this.rspJob?.docId, noteData).then((response) => {
            console.log("response =====> ", response);
            this.notificationService.success(
              'Successfully created a new note',
              "The note was successfully created.",
              {nzDuration: 1500}
            );
          }).catch(error => {
            console.log("error => ", error.message);
            console.log("error => ", error.status);
            // handleError(error)
            console.log(error)
            this.notificationService.error(
              'Error on creating a new job',
              error.message,
              {nzDuration: 1500}
            );
          }).finally(() => {
            console.log("final called!!!!");
          });
        }
      } else {
        Object.values(this.noteForm.controls).forEach((control) => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
    }

    resetForm(e: MouseEvent): void {
      e.preventDefault();
      this.noteForm.reset();
      for (const key in this.noteForm.controls) {
        if (this.noteForm.controls.hasOwnProperty(key)) {
          this.noteForm.controls[key].markAsPristine();
          this.noteForm.controls[key].updateValueAndValidity();
        }
      }
    }

    destroyModal(): void {
      this.modal.destroy();
    }
  }

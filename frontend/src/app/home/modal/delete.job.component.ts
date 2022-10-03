import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseJob } from '@app/@shared/models/job/response_job';
import { JobApiService } from '@app/@shared/services';
import { NzModalRef } from 'ng-zorro-antd/modal';


@Component({
    selector: 'app-home-delete-job-modal-component',
    template: `
    <div>
      <p>Id : {{ rspJob?.docId }} </p>
      <p>Name : {{ rspJob?.name }} </p>
      <p>Phone : {{ rspJob?.phone }} </p>
      <p>City : {{ rspJob?.address?.city }} </p>
      <p>Status : {{ rspJob?.status }} </p>
    </div>
    <div *nzModalFooter>
      <button nz-button nzType="default" (click)="destroyModal()">Close</button>
      <button nz-button nzType="primary" (click)="submitForm()">Submit</button>
    </div>
    `
  })
  export class DeleteJobModalHomeComponent implements OnInit {

    @Input() rspJob?: ResponseJob;
    @Input() jobApiService?: JobApiService;
    @Input() jwt?: String;

    jobForm!: FormGroup;
    error: string | undefined;
    isLoading = false;
    selectedValue = null;

    constructor(
      private modal: NzModalRef,
      private formBuilder: FormBuilder) {

      }

    ngOnInit(): void {
      this.jobForm = this.formBuilder.group({
        name: [null, [Validators.required]],
        phone: [null, [Validators.required]],
        addressLine: [null, [Validators.required]],
        street: [null, [Validators.required]],
        city: [null, [Validators.required]],
        postCode: [null, [Validators.required]],
        status: [null, [Validators.required]]
      });
    }

    submitForm(): void {
      if (this.jobForm.valid) {
        console.log('submit', this.jobForm.value);
        // this.register(this.registerForm.value)
      } else {
        Object.values(this.jobForm.controls).forEach((control) => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
    }

    destroyModal(): void {
      this.modal.destroy();
    }
  }

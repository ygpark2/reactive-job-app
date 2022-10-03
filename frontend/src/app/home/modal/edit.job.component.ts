import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobDto } from '@app/@shared/models/job/job_dto';
import { ResponseJob } from '@app/@shared/models/job/response_job';
import { JobApiService } from '@app/@shared/services';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
    selector: 'app-home-edit-job-modal-component',
    template: `
    <div>
      <form nz-form class="ant-advanced-search-form" [formGroup]="jobForm">
        <nz-form-item>
          <nz-form-label nzFor="name">Name </nz-form-label>
          <nz-form-control>
            <input
              nz-input
              placeholder="placeholder"
              formControlName="name"
            />
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label [nzSm]="6" [nzXs]="24" nzFor="phoneNumber" nzRequired>Phone Number</nz-form-label>
          <nz-form-control
            [nzSm]="14"
            [nzXs]="24"
            [nzValidateStatus]="jobForm.controls['phoneNumber']"
            nzErrorTip="Please input your phone number!"
          >
            <nz-input-group [nzAddOnBefore]="addOnBeforeTemplate">
              <ng-template #addOnBeforeTemplate>
                <nz-select formControlName="phoneNumberPrefix" class="phone-select">
                  <nz-option nzLabel="+86" nzValue="+86"></nz-option>
                  <nz-option nzLabel="+87" nzValue="+87"></nz-option>
                </nz-select>
              </ng-template>
              <input formControlName="phoneNumber" id="'phoneNumber'" nz-input />
            </nz-input-group>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label nzFor="city">City </nz-form-label>
          <nz-form-control>
            <input
              nz-input
              placeholder="placeholder"
              formControlName="city"
            />
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label nzFor="street">Street </nz-form-label>
          <nz-form-control>
            <input
              nz-input
              placeholder="placeholder"
              formControlName="street"
            />
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label nzFor="addressLine">Address Detail </nz-form-label>
          <nz-form-control>
            <input
              nz-input
              placeholder="placeholder"
              formControlName="addressLine"
            />
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label nzFor="postCode">Post Code </nz-form-label>
          <nz-form-control>
            <input
              nz-input
              placeholder="placeholder"
              formControlName="postCode"
            />
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label nzFor="status">Status </nz-form-label>
          <nz-form-control>
            <nz-select formControlName="status" class="status-select">
              <nz-option nzLabel="SCHEDULED" nzValue="SCHEDULED"></nz-option>
              <nz-option nzLabel="ACTIVE" nzValue="ACTIVE"></nz-option>
              <nz-option nzLabel="INVOCING" nzValue="INVOCING"></nz-option>
              <nz-option nzLabel="PRICED" nzValue="PRICED"></nz-option>
              <nz-option nzLabel="COMPLETED" nzValue="COMPLETED"></nz-option>
            </nz-select>
          </nz-form-control>
        </nz-form-item>
      </form>
    </div>
    <div *nzModalFooter>
      <button nz-button nzType="default" (click)="destroyModal()">Close</button>
      <button nz-button nzType="primary" (click)="submitForm()">Submit</button>
    </div>
    `
  })
  export class EditJobModalHomeComponent implements OnInit {

    @Input() rspJob?: ResponseJob;
    @Input() jobApiService?: JobApiService;
    @Input() jwt?: string;

    jobForm!: FormGroup;
    error: string | undefined;
    isLoading = false;

    constructor(
      private modal: NzModalRef,
      private notificationService: NzNotificationService,
      private formBuilder: FormBuilder) {

      }

    ngOnInit(): void {
      const phoneArray = this.rspJob?.phone.split(" ") ?? [];
      this.jobForm = this.formBuilder.group({
        name: [this.rspJob?.name, [Validators.required]],
        phoneNumberPrefix: [phoneArray[0]],
        phoneNumber: [phoneArray[1], [Validators.required]],
        addressLine: [this.rspJob?.address.addressLine, [Validators.required]],
        street: [this.rspJob?.address.street, [Validators.required]],
        city: [this.rspJob?.address.city, [Validators.required]],
        postCode: [this.rspJob?.address.postCode, [Validators.required]],
        status: [this.rspJob?.status]
      });
    }

    submitForm(): void {
      if (this.jobForm.valid) {
        console.log('submit', this.jobForm.value);
        const jobData = {
          name: this.jobForm.value.name,
          phone: this.jobForm.value.phoneNumberPrefix + " " + this.jobForm.value.phoneNumber,
          address: {
            addressLine: this.jobForm.value.addressLine,
            street: this.jobForm.value.street,
            city: this.jobForm.value.city,
            postCode: this.jobForm.value.postCode,
          },
          status: this.jobForm.value.status,
        } as JobDto
        if (this.jwt && this.rspJob?.docId) {
            this.jobApiService?.updateJob(this.jwt ?? '', this.rspJob?.docId, jobData).then((response) => {
              console.log("response status =====> ", response.status);
              console.log("response status text =====> ", response.statusText);
              this.modal.destroy();
              this.notificationService.success(
                'Successfully updated the job',
                "The job was successfully updated.",
                {nzDuration: 1500}
              );
            }).catch(error => {
              console.log("error => ", error.message);
              console.log("error => ", error.status);
              // handleError(error)
              console.log(error)
              this.notificationService.error(
                'Error on updating the job',
                error.message,
                {nzDuration: 1500}
              );
            }).finally(() => {
              console.log("final called!!!!");
            });
        }
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

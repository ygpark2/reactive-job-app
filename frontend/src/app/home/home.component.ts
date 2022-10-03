import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceBuilder } from 'ts-retrofit';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

import { EventSourceService } from '@app/@shared/services/event-source.service';
import { JobMessage } from '@app/@shared/models/job/job_message';
import { ResponseJob } from '@app/@shared/models/job/response_job';
import { NewJobModalHomeComponent } from './modal/new.job.component';
import { EditJobModalHomeComponent } from './modal/edit.job.component';
import { DeleteJobModalHomeComponent } from './modal/delete.job.component';
import { ShowJobModalHomeComponent } from './modal/show.job.component';
import { JobApiService } from '@app/@shared/services';
import { RequestInterceptor, ResponseInterceptor, tsRetrofitLogCallback } from '@app/@shared/http';
import { CredentialsService } from '@app/@shared/modules/auth';
import { NzNotificationService } from 'ng-zorro-antd/notification';


interface DataItem {
  name: string;
  age: number;
  address: string;
}

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<DataItem> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<DataItem> | null;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [],
})
export class HomeComponent implements OnInit {
  private sseStream: Subscription;
  initLoading = false;
  isLoading = false;
  jobMessages: JobMessage[] = [];
  isVisible = false;
  isConfirmLoading = false;
  private jobApiService?: JobApiService;
  
  constructor(
    private sseService: EventSourceService,
    private modalService: NzModalService,
    private notificationService: NzNotificationService,
    private credentialsService: CredentialsService
    ) {

    this.jobApiService = new ServiceBuilder()
      .setLogCallback(tsRetrofitLogCallback)
      .setRequestInterceptors(RequestInterceptor)
      .setResponseInterceptors(ResponseInterceptor)
      .build(JobApiService);

    this.sseStream = this.sseService
      .observeMessages('/api/v1/jobs')
      .pipe(
        map((job: any) => {
          return {
            date: new Date(),
            loading: true,
            job: job
          } as JobMessage;
        }),
        take(10)
      )
      .subscribe((jobMsg: JobMessage) => {
        jobMsg.loading = false;
        if (this.jobMessages.some(j => j.job.docId === jobMsg.job.docId)) {

        } else {
          this.jobMessages.push(jobMsg);
        }
      });
  }

  ngOnInit() {
    this.isLoading = true;
    console.log("credentials => ", this.credentialsService.credentials);
  }

  newJobFormModal(): void {
    const modalRef = this.modalService.create({
      nzTitle: 'New Job',
      nzContent: NewJobModalHomeComponent,
      nzComponentParams: {
        jobApiService: this.jobApiService,
        jwt: this.credentialsService.credentials?.token
      }
    });
    modalRef.afterClose.next((result: any) => {
      console.log("================ after close next ===============");
      console.log(result);

      const jobList = result.jobList as Array<ResponseJob>;
      this.jobMessages.splice(0);

      console.log("-------------- done -----------");
      console.log(this.jobMessages);
      /*
      this.jobMessages = jobList.map((job, index) => {
        return {
          date: new Date(),
          loading: true,
          job: job
        } as JobMessage;
      });
      */
    });
    modalRef.afterClose.error((err:any) => {
      console.log("error => ", err);
    });
  }

  showJobFormModal(rspJob: ResponseJob): void {
    this.modalService.create({
      nzTitle: 'Show Job',
      nzContent: ShowJobModalHomeComponent,
      nzComponentParams: {
        rspJob: rspJob,
        jobApiService: this.jobApiService,
        jwt: this.credentialsService.credentials?.token
      }
    });
  }

  editJobFormModal(rspJob: ResponseJob): void {
    this.modalService.create({
      nzTitle: 'Edit Job',
      nzContent: EditJobModalHomeComponent,
      nzComponentParams: {
        rspJob: rspJob,
        jobApiService: this.jobApiService,
        jwt: this.credentialsService.credentials?.token
      }
    });
  }

  deleteJobFormModal(rspJob: ResponseJob): void {
    this.modalService.confirm({
      nzTitle: 'Do you Want to delete this job ?',
      nzContent: DeleteJobModalHomeComponent,
      nzComponentParams: {
        rspJob: rspJob,
        jobApiService: this.jobApiService,
        jwt: this.credentialsService.credentials?.token
      },
      nzCancelText: "No",
      nzOkText: "Yes",
      nzOnOk: () => { 
        const token = this.credentialsService.credentials?.token;
        if (token) {
          this.jobApiService?.deleteJob(token, rspJob.docId).then((response) => {
            console.log("response status =====> ", response.status);
            console.log("response status text =====> ", response.statusText);
            this.notificationService.success(
              'Successfully deleted the job',
              "The job was successfully deleted.",
              {nzDuration: 1500}
            );
          }).catch(error => {
            const errMsg = error.message as string;
            if (errMsg.endsWith("401")) {

            }
            console.log("error => ", error.message);
            console.log("error => ", error.status);
            // handleError(error)
            console.log(error)
            this.notificationService.error(
              'Error on deleting the job',
              error.message,
              {nzDuration: 1500}
            );
          }).finally(() => {
            console.log("final called!!!!");
          });
        }
        }
    });
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  onBack() {}

  edit(item: any): void {
    // this.msg.success(item.email);
  }
}

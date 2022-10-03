import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@app/@shared/shared.module';
import { JobRoutingModule } from './job-routing.module';
import { JobComponent } from './job.component';

import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    JobRoutingModule,

    NzTableModule,
    NzPageHeaderModule,
    NzListModule,
    NzDividerModule,
    NzSkeletonModule,
  ],
  declarations: [JobComponent],
})
export class JobModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms'; 
import { FormsModule } from '@angular/forms';

import { SharedModule } from '@app/@shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzCommentModule } from 'ng-zorro-antd/comment';

import { NewJobModalHomeComponent } from './modal/new.job.component';
import { EditJobModalHomeComponent } from './modal/edit.job.component';
import { ShowJobModalHomeComponent } from './modal/show.job.component';
import { DeleteJobModalHomeComponent } from './modal/delete.job.component';
import { I18nModule } from '@app/i18n';


@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    I18nModule,
    // SharedModule,
    HomeRoutingModule,

    FormsModule,
    ReactiveFormsModule,

    NzAvatarModule,
    NzButtonModule,
    NzTableModule,
    NzPageHeaderModule,
    NzListModule,
    NzDividerModule,
    NzSkeletonModule,
    NzSpaceModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzCheckboxModule,
    NzSelectModule,
    NzGridModule,
    NzNotificationModule,
    NzCommentModule,
  ],
  declarations: [
    HomeComponent,
    NewJobModalHomeComponent,
    EditJobModalHomeComponent,
    ShowJobModalHomeComponent,
    DeleteJobModalHomeComponent
  ],
})
export class HomeModule {}

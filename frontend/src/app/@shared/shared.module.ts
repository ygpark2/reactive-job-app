import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxPaginationModule } from 'ngx-pagination';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzProgressModule } from 'ng-zorro-antd/progress';

import { AuthModule } from '@app/@shared/modules/auth';
import { LayoutModule } from '@app/@shared/modules/layout';

import { LoaderComponent, LoginComponent } from '@app/@shared/components';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    InfiniteScrollModule,
    NgxPaginationModule,
    NzCardModule,
    NzTableModule,
    NzButtonModule,
    NzDividerModule,
    NzToolTipModule,
    NzMessageModule,
    NzTabsModule,
    NzIconModule,
    NzSkeletonModule,
    NzEmptyModule,
    NzPopconfirmModule,
    NzProgressModule,
    NzDescriptionsModule,

    AuthModule,
    LayoutModule,
  ],
  declarations: [LoaderComponent],
  exports: [LoaderComponent],
})
export class SharedModule {}

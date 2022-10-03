import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { JobComponent } from './job.component';
import { LayoutService } from '@app/@shared/modules/layout';

const routes: Routes = [
  LayoutService.childRoutes([
    { path: 'job', component: JobComponent, data: { title: marker('Job') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class JobRoutingModule {}

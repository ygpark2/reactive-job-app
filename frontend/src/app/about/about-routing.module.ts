import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { LayoutService } from '@app/@shared/modules/layout';
import { AboutComponent } from './about.component';

const routes: Routes = [
  LayoutService.childRoutes([{ path: 'about', component: AboutComponent, data: { title: marker('About') } }]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AboutRoutingModule {}

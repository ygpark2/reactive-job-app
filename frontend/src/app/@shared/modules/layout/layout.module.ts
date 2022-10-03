import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { I18nModule } from '@app/i18n';
import { LayoutComponent } from '@app/@shared/modules/layout';
import { HeaderComponent } from './header/header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { FooterComponent } from './footer/footer.component';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    I18nModule,
    RouterModule,

    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzBreadCrumbModule,
  ],
  declarations: [HeaderComponent, SideMenuComponent, LayoutComponent, FooterComponent],
})
export class LayoutModule {}

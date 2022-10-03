import { Routes, Route } from '@angular/router';

import { AuthenticationGuard } from '@app/@shared/modules/auth';
import { LayoutComponent } from '@app/@shared/modules/layout';

/**
 * Provides helper methods to create routes.
 */
export class LayoutService {
  /**
   * Creates routes using the shell component and authentication.
   * @param routes The routes to add.
   * @return The new route using shell as the base.
   */
  static childRoutes(routes: Routes): Route {
    return {
      path: '',
      component: LayoutComponent,
      children: routes,
      canActivate: [AuthenticationGuard],
    };
  }
}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from 'app/layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';

import { AlternativeMainComponent } from './layouts/alternative-main/alternative-main.component';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];
const alternativeMainRoutes = [...errorRoute];

/* A bit of an interesting set upt*/
@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: 'default',
                    children: [
                        ...LAYOUT_ROUTES,
                        {
                            path: 'admin',
                            loadChildren: './admin/admin.module#QQuitAdminModule'
                        }
                    ]
                },
                {
                    path: 'alternative-home-page',
                    children: [
                        ...alternativeMainRoutes,
                        {
                            path: '',
                            component: AlternativeMainComponent
                        }
                    ]
                },
                {
                    path: '',
                    redirectTo: '/default',
                    pathMatch: 'full'
                }
            ],
            { useHash: true, enableTracing: DEBUG_INFO_ENABLED }
        )
    ],
    exports: [RouterModule]
})
export class QQuitAppRoutingModule { }

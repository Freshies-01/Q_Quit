import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from 'app/layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];


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
                    path: '',
                    redirectTo: '/default',
                    pathMatch: 'full'
                }
            ],
            { useHash: true /*, enableTracing: DEBUG_INFO_ENABLED */ }
        )
    ],
    exports: [RouterModule]
})
export class QQuitAppRoutingModule { }

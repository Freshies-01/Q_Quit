import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { QQuitLocationModule } from "./location/location.module";
import { QQuitEmployeeModule } from "./employee/employee.module";
import { QQuitSeparationApplicationModule } from "./separation-application/separation-application.module";
import { QQuitHrRepsModule } from "./hr-reps/hr-reps.module";
import { QQuitFunctionRepsModule } from "./function-reps/function-reps.module";
import { QQuitActionModule } from "./action/action.module";
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
  // prettier-ignore
  imports: [
        QQuitLocationModule,
        QQuitEmployeeModule,
        QQuitSeparationApplicationModule,
        QQuitHrRepsModule,
        QQuitFunctionRepsModule,
        QQuitActionModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QQuitEntityModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { QQuitLocationModule } from "app/entities/location/location.module";
import { QQuitEmployeeModule } from "app/entities/employee/employee.module";
import { QQuitSeparationApplicationModule } from "app/entities/separation-application/separation-application.module";
import { QQuitHrRepsModule } from "app/entities/hr-reps/hr-reps.module";
import { QQuitFunctionRepsModule } from "app/entities/function-reps/function-reps.module";
import { QQuitActionModule } from "app/entities/action/action.module";
import { QQuitDepartmentModule } from "app/entities/department/department.module";
import { QQuitSepartationApplicationLogModule } from "app/entities/separtation-application-log/separtation-application-log.module";
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
        QQuitDepartmentModule,
        QQuitSepartationApplicationLogModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QQuitEntityModule {}

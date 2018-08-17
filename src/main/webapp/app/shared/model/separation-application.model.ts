import { Moment } from "moment";
import { IEmployee } from "app/shared/model//employee.model";
import { IAction } from "app/shared/model//action.model";
import { IHrReps } from "app/shared/model//hr-reps.model";
import { IFunctionReps } from "app/shared/model//function-reps.model";

export const enum Status {
  PENDING = 0,
  UNDER_REVIEW_FR = 25,
  EMPLOYEE_TASKS_IN_PROGRESS = 50,
  EMPLOYEE_TASKS_COMPLETED = 75,
  CLOSED_BY_HR = 100
}

export interface ISeparationApplication {
  id?: number;
  status?: Status;
  dateOfLeave?: Moment;
  dateSumbitted?: Moment;
  dateCompleted?: Moment;
  dateApproved?: Moment;
  employee?: IEmployee;
  actions?: IAction[];
  hr?: IHrReps;
  fr?: IFunctionReps;
}

export class SeparationApplication implements ISeparationApplication {
  constructor(
    public id?: number,
    public status?: Status,
    public dateOfLeave?: Moment,
    public dateSumbitted?: Moment,
    public dateCompleted?: Moment,
    public dateApproved?: Moment,
    public employee?: IEmployee,
    public actions?: IAction[],
    public hr?: IHrReps,
    public fr?: IFunctionReps
  ) {}
}

import { Moment } from "moment";
import { IEmployee } from "app/shared/model/employee.model";
import { IAction } from "app/shared/model/action.model";
import { IHrReps } from "app/shared/model/hr-reps.model";
import { IFunctionReps } from "app/shared/model/function-reps.model";

export const enum Status {
  COMPLETED = "COMPLETED",
  PENDING = "PENDING",
  CLOSED = "CLOSED",
  IN_PROGRESS = "IN_PROGRESS"
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

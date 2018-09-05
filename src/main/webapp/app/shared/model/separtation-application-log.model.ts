import { Moment } from "moment";
import { ISeparationApplication } from "app/shared/model//separation-application.model";
import { IEmployee } from "app/shared/model//employee.model";

export const enum EditType {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE"
}

export interface ISepartationApplicationLog {
  id?: number;
  dateEdited?: Moment;
  editType?: EditType;
  editId?: number;
  separationApplication?: ISeparationApplication;
  employee?: IEmployee;
}

export class SepartationApplicationLog implements ISepartationApplicationLog {
  constructor(
    public id?: number,
    public dateEdited?: Moment,
    public editType?: EditType,
    public editId?: number,
    public separationApplication?: ISeparationApplication,
    public employee?: IEmployee
  ) {}
}

import { ISeparationApplication } from 'app/shared/model//separation-application.model';

export interface IAction {
    id?: number;
    isCompleted?: boolean;
    task?: string;
    separationApplication?: ISeparationApplication;
}

export class Action implements IAction {
    constructor(
        public id?: number,
        public isCompleted?: boolean,
        public task?: string,
        public separationApplication?: ISeparationApplication
    ) {
        this.isCompleted = false;
    }
}

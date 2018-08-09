import { ILocation } from 'app/shared/model//location.model';
import { ISeparationApplication } from 'app/shared/model//separation-application.model';
import { IHrReps } from 'app/shared/model//hr-reps.model';
import { IFunctionReps } from 'app/shared/model//function-reps.model';
import { User } from 'app/core';

export interface IEmployee {
    id?: number;
    user?: User;
    fname?: string;
    lname?: string;
    location?: ILocation;
    separationApplication?: ISeparationApplication;
    hr?: IHrReps;
    fr?: IFunctionReps;
}

export class Employee implements IEmployee {
    constructor(
        public id?: number,
        public user?: User,
        public fname?: string,
        public lname?: string,
        public location?: ILocation,
        public separationApplication?: ISeparationApplication,
        public hr?: IHrReps,
        public fr?: IFunctionReps
    ) { }
}

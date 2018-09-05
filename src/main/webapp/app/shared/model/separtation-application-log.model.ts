export interface ISepartationApplicationLog {
  id?: number;
}

export class SepartationApplicationLog implements ISepartationApplicationLog {
  constructor(public id?: number) {}
}

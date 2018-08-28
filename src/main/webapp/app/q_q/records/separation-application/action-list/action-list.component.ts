import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SeparationApplicationService } from "app/entities/separation-application/separation-application.service";
import {
  ISeparationApplication,
  SeparationApplication
} from "app/shared/model/separation-application.model";
import { IAction } from "app/shared/model/action.model";

@Component({
  selector: "jhi-action-list",
  templateUrl: "./action-list.component.html",
  styleUrls: ["./action-list.component.css"],
  providers: [SeparationApplicationService]
})
export class ActionListComponent implements OnInit {
  actions: IAction[];
  @Input() saId: number;

  constructor(
    private separationApplicationService: SeparationApplicationService
  ) {}

  ngOnInit() {
    this.separationApplicationService.queryActions(this.saId);
  }
}

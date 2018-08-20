import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import {
  NgbActiveModal,
  NgbModal,
  NgbModalRef
} from "@ng-bootstrap/ng-bootstrap";
import { JhiEventManager } from "ng-jhipster";

import { IFunctionReps } from "app/shared/model/function-reps.model";
import { FunctionRepsService } from "app/entities/function-reps/function-reps.service";

@Component({
  selector: "jhi-function-reps-delete-dialog",
  templateUrl: "./function-reps-delete-dialog.component.html"
})
export class FunctionRepsDeleteDialogComponent {
  functionReps: IFunctionReps;

  constructor(
    private functionRepsService: FunctionRepsService,
    public activeModal: NgbActiveModal,
    private eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss("cancel");
  }

  confirmDelete(id: number) {
    this.functionRepsService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: "functionRepsListModification",
        content: "Deleted an functionReps"
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: "jhi-function-reps-delete-popup",
  template: ""
})
export class FunctionRepsDeletePopupComponent implements OnInit, OnDestroy {
  private ngbModalRef: NgbModalRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ functionReps }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(
          FunctionRepsDeleteDialogComponent as Component,
          {
            size: "lg",
            backdrop: "static"
          }
        );
        this.ngbModalRef.componentInstance.functionReps = functionReps;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate([{ outlets: { popup: null } }], {
              replaceUrl: true,
              queryParamsHandling: "merge"
            });
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate([{ outlets: { popup: null } }], {
              replaceUrl: true,
              queryParamsHandling: "merge"
            });
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}

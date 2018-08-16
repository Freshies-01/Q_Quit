import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import {
  NgbActiveModal,
  NgbModal,
  NgbModalRef
} from "@ng-bootstrap/ng-bootstrap";
import { JhiEventManager } from "ng-jhipster";

import { IHrReps } from "app/shared/model/hr-reps.model";
import { HrRepsService } from "app/entities/hr-reps/hr-reps.service";

@Component({
  selector: "jhi-hr-reps-delete-dialog",
  templateUrl: "./hr-reps-delete-dialog.component.html"
})
export class HrRepsDeleteDialogComponent {
  hrReps: IHrReps;

  constructor(
    private hrRepsService: HrRepsService,
    public activeModal: NgbActiveModal,
    private eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss("cancel");
  }

  confirmDelete(id: number) {
    this.hrRepsService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: "hrRepsListModification",
        content: "Deleted an hrReps"
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: "jhi-hr-reps-delete-popup",
  template: ""
})
export class HrRepsDeletePopupComponent implements OnInit, OnDestroy {
  private ngbModalRef: NgbModalRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ hrReps }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(
          HrRepsDeleteDialogComponent as Component,
          { size: "lg", backdrop: "static" }
        );
        this.ngbModalRef.componentInstance.hrReps = hrReps;
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

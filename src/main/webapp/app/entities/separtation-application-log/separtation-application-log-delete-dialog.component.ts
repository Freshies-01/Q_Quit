import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import {
  NgbActiveModal,
  NgbModal,
  NgbModalRef
} from "@ng-bootstrap/ng-bootstrap";
import { JhiEventManager } from "ng-jhipster";

import { ISepartationApplicationLog } from "app/shared/model/separtation-application-log.model";
import { SepartationApplicationLogService } from "app/entities/separtation-application-log/separtation-application-log.service";

@Component({
  selector: "jhi-separtation-application-log-delete-dialog",
  templateUrl: "./separtation-application-log-delete-dialog.component.html"
})
export class SepartationApplicationLogDeleteDialogComponent {
  separtationApplicationLog: ISepartationApplicationLog;

  constructor(
    private separtationApplicationLogService: SepartationApplicationLogService,
    public activeModal: NgbActiveModal,
    private eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss("cancel");
  }

  confirmDelete(id: number) {
    this.separtationApplicationLogService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: "separtationApplicationLogListModification",
        content: "Deleted an separtationApplicationLog"
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: "jhi-separtation-application-log-delete-popup",
  template: ""
})
export class SepartationApplicationLogDeletePopupComponent
  implements OnInit, OnDestroy {
  private ngbModalRef: NgbModalRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ separtationApplicationLog }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(
          SepartationApplicationLogDeleteDialogComponent as Component,
          {
            size: "lg",
            backdrop: "static"
          }
        );
        this.ngbModalRef.componentInstance.separtationApplicationLog = separtationApplicationLog;
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

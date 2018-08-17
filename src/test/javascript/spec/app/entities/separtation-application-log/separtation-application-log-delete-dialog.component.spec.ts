/* tslint:disable max-line-length */
import {
  ComponentFixture,
  TestBed,
  inject,
  fakeAsync,
  tick
} from "@angular/core/testing";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable, of } from "rxjs";
import { JhiEventManager } from "ng-jhipster";

import { QQuitTestModule } from "../../../test.module";
import { SepartationApplicationLogDeleteDialogComponent } from "app/entities/separtation-application-log/separtation-application-log-delete-dialog.component";
import { SepartationApplicationLogService } from "app/entities/separtation-application-log/separtation-application-log.service";

describe("Component Tests", () => {
  describe("SepartationApplicationLog Management Delete Component", () => {
    let comp: SepartationApplicationLogDeleteDialogComponent;
    let fixture: ComponentFixture<
      SepartationApplicationLogDeleteDialogComponent
    >;
    let service: SepartationApplicationLogService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [QQuitTestModule],
        declarations: [SepartationApplicationLogDeleteDialogComponent]
      })
        .overrideTemplate(SepartationApplicationLogDeleteDialogComponent, "")
        .compileComponents();
      fixture = TestBed.createComponent(
        SepartationApplicationLogDeleteDialogComponent
      );
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(
        SepartationApplicationLogService
      );
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe("confirmDelete", () => {
      it(
        "Should call delete service on confirmDelete",
        inject(
          [],
          fakeAsync(() => {
            // GIVEN
            spyOn(service, "delete").and.returnValue(of({}));

            // WHEN
            comp.confirmDelete(123);
            tick();

            // THEN
            expect(service.delete).toHaveBeenCalledWith(123);
            expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
            expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
          })
        )
      );
    });
  });
});

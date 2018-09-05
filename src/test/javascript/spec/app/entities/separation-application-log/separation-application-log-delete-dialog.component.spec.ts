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
import { SeparationApplicationLogDeleteDialogComponent } from "app/entities/separation-application-log/separation-application-log-delete-dialog.component";
import { SeparationApplicationLogService } from "app/entities/separation-application-log/separation-application-log.service";

describe("Component Tests", () => {
  describe("SeparationApplicationLog Management Delete Component", () => {
    let comp: SeparationApplicationLogDeleteDialogComponent;
    let fixture: ComponentFixture<
      SeparationApplicationLogDeleteDialogComponent
    >;
    let service: SeparationApplicationLogService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [QQuitTestModule],
        declarations: [SeparationApplicationLogDeleteDialogComponent]
      })
        .overrideTemplate(SeparationApplicationLogDeleteDialogComponent, "")
        .compileComponents();
      fixture = TestBed.createComponent(
        SeparationApplicationLogDeleteDialogComponent
      );
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(
        SeparationApplicationLogService
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

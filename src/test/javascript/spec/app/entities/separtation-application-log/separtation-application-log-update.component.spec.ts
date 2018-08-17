/* tslint:disable max-line-length */
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from "@angular/core/testing";
import { HttpResponse } from "@angular/common/http";
import { Observable, of } from "rxjs";

import { QQuitTestModule } from "../../../test.module";
import { SepartationApplicationLogUpdateComponent } from "app/entities/separtation-application-log/separtation-application-log-update.component";
import { SepartationApplicationLogService } from "app/entities/separtation-application-log/separtation-application-log.service";
import { SepartationApplicationLog } from "app/shared/model/separtation-application-log.model";

describe("Component Tests", () => {
  describe("SepartationApplicationLog Management Update Component", () => {
    let comp: SepartationApplicationLogUpdateComponent;
    let fixture: ComponentFixture<SepartationApplicationLogUpdateComponent>;
    let service: SepartationApplicationLogService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [QQuitTestModule],
        declarations: [SepartationApplicationLogUpdateComponent]
      })
        .overrideTemplate(SepartationApplicationLogUpdateComponent, "")
        .compileComponents();

      fixture = TestBed.createComponent(
        SepartationApplicationLogUpdateComponent
      );
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(
        SepartationApplicationLogService
      );
    });

    describe("save", () => {
      it(
        "Should call update service on save for existing entity",
        fakeAsync(() => {
          // GIVEN
          const entity = new SepartationApplicationLog(123);
          spyOn(service, "update").and.returnValue(
            of(new HttpResponse({ body: entity }))
          );
          comp.separtationApplicationLog = entity;
          // WHEN
          comp.save();
          tick(); // simulate async

          // THEN
          expect(service.update).toHaveBeenCalledWith(entity);
          expect(comp.isSaving).toEqual(false);
        })
      );

      it(
        "Should call create service on save for new entity",
        fakeAsync(() => {
          // GIVEN
          const entity = new SepartationApplicationLog();
          spyOn(service, "create").and.returnValue(
            of(new HttpResponse({ body: entity }))
          );
          comp.separtationApplicationLog = entity;
          // WHEN
          comp.save();
          tick(); // simulate async

          // THEN
          expect(service.create).toHaveBeenCalledWith(entity);
          expect(comp.isSaving).toEqual(false);
        })
      );
    });
  });
});

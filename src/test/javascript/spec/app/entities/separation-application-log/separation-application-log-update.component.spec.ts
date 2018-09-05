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
import { SeparationApplicationLogUpdateComponent } from "app/entities/separation-application-log/separation-application-log-update.component";
import { SeparationApplicationLogService } from "app/entities/separation-application-log/separation-application-log.service";
import { SeparationApplicationLog } from "app/shared/model/separation-application-log.model";

describe("Component Tests", () => {
  describe("SeparationApplicationLog Management Update Component", () => {
    let comp: SeparationApplicationLogUpdateComponent;
    let fixture: ComponentFixture<SeparationApplicationLogUpdateComponent>;
    let service: SeparationApplicationLogService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [QQuitTestModule],
        declarations: [SeparationApplicationLogUpdateComponent]
      })
        .overrideTemplate(SeparationApplicationLogUpdateComponent, "")
        .compileComponents();

      fixture = TestBed.createComponent(
        SeparationApplicationLogUpdateComponent
      );
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(
        SeparationApplicationLogService
      );
    });

    describe("save", () => {
      it(
        "Should call update service on save for existing entity",
        fakeAsync(() => {
          // GIVEN
          const entity = new SeparationApplicationLog(123);
          spyOn(service, "update").and.returnValue(
            of(new HttpResponse({ body: entity }))
          );
          comp.separationApplicationLog = entity;
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
          const entity = new SeparationApplicationLog();
          spyOn(service, "create").and.returnValue(
            of(new HttpResponse({ body: entity }))
          );
          comp.separationApplicationLog = entity;
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

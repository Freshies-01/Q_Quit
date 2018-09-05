/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Observable, of } from "rxjs";
import { HttpHeaders, HttpResponse } from "@angular/common/http";

import { QQuitTestModule } from "../../../test.module";
import { SeparationApplicationLogComponent } from "app/entities/separation-application-log/separation-application-log.component";
import { SeparationApplicationLogService } from "app/entities/separation-application-log/separation-application-log.service";
import { SeparationApplicationLog } from "app/shared/model/separation-application-log.model";

describe("Component Tests", () => {
  describe("SeparationApplicationLog Management Component", () => {
    let comp: SeparationApplicationLogComponent;
    let fixture: ComponentFixture<SeparationApplicationLogComponent>;
    let service: SeparationApplicationLogService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [QQuitTestModule],
        declarations: [SeparationApplicationLogComponent],
        providers: []
      })
        .overrideTemplate(SeparationApplicationLogComponent, "")
        .compileComponents();

      fixture = TestBed.createComponent(SeparationApplicationLogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(
        SeparationApplicationLogService
      );
    });

    it("Should call load all on init", () => {
      // GIVEN
      const headers = new HttpHeaders().append("link", "link;link");
      spyOn(service, "query").and.returnValue(
        of(
          new HttpResponse({
            body: [new SeparationApplicationLog(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.separationApplicationLogs[0]).toEqual(
        jasmine.objectContaining({ id: 123 })
      );
    });
  });
});

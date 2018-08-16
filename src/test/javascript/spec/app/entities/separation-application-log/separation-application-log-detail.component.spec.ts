/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

import { QQuitTestModule } from "../../../test.module";
import { SeparationApplicationLogDetailComponent } from "app/entities/separation-application-log/separation-application-log-detail.component";
import { SeparationApplicationLog } from "app/shared/model/separation-application-log.model";

describe("Component Tests", () => {
  describe("SeparationApplicationLog Management Detail Component", () => {
    let comp: SeparationApplicationLogDetailComponent;
    let fixture: ComponentFixture<SeparationApplicationLogDetailComponent>;
    const route = ({
      data: of({
        separationApplicationLog: new SeparationApplicationLog(123)
      })
    } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [QQuitTestModule],
        declarations: [SeparationApplicationLogDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SeparationApplicationLogDetailComponent, "")
        .compileComponents();
      fixture = TestBed.createComponent(
        SeparationApplicationLogDetailComponent
      );
      comp = fixture.componentInstance;
    });

    describe("OnInit", () => {
      it("Should call load all on init", () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.separationApplicationLog).toEqual(
          jasmine.objectContaining({ id: 123 })
        );
      });
    });
  });
});

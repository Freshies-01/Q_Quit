/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

import { QQuitTestModule } from "../../../test.module";
import { SepartationApplicationLogDetailComponent } from "app/entities/separtation-application-log/separtation-application-log-detail.component";
import { SepartationApplicationLog } from "app/shared/model/separtation-application-log.model";

describe("Component Tests", () => {
  describe("SepartationApplicationLog Management Detail Component", () => {
    let comp: SepartationApplicationLogDetailComponent;
    let fixture: ComponentFixture<SepartationApplicationLogDetailComponent>;
    const route = ({
      data: of({
        separtationApplicationLog: new SepartationApplicationLog(123)
      })
    } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [QQuitTestModule],
        declarations: [SepartationApplicationLogDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SepartationApplicationLogDetailComponent, "")
        .compileComponents();
      fixture = TestBed.createComponent(
        SepartationApplicationLogDetailComponent
      );
      comp = fixture.componentInstance;
    });

    describe("OnInit", () => {
      it("Should call load all on init", () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.separtationApplicationLog).toEqual(
          jasmine.objectContaining({ id: 123 })
        );
      });
    });
  });
});

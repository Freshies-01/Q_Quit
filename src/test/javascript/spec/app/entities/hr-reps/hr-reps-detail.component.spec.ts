/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { QQuitTestModule } from '../../../test.module';
import { HrRepsDetailComponent } from 'app/entities/hr-reps/hr-reps-detail.component';
import { HrReps } from 'app/shared/model/hr-reps.model';

describe('Component Tests', () => {
    describe('HrReps Management Detail Component', () => {
        let comp: HrRepsDetailComponent;
        let fixture: ComponentFixture<HrRepsDetailComponent>;
        const route = ({ data: of({ hrReps: new HrReps(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [QQuitTestModule],
                declarations: [HrRepsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(HrRepsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HrRepsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.hrReps).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

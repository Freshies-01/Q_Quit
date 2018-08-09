/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { QQuitTestModule } from '../../../test.module';
import { FunctionRepsDetailComponent } from 'app/entities/function-reps/function-reps-detail.component';
import { FunctionReps } from 'app/shared/model/function-reps.model';

describe('Component Tests', () => {
    describe('FunctionReps Management Detail Component', () => {
        let comp: FunctionRepsDetailComponent;
        let fixture: ComponentFixture<FunctionRepsDetailComponent>;
        const route = ({ data: of({ functionReps: new FunctionReps(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [QQuitTestModule],
                declarations: [FunctionRepsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FunctionRepsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FunctionRepsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.functionReps).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

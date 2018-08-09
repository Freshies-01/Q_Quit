/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { QQuitTestModule } from '../../../test.module';
import { HrRepsComponent } from 'app/entities/hr-reps/hr-reps.component';
import { HrRepsService } from 'app/entities/hr-reps/hr-reps.service';
import { HrReps } from 'app/shared/model/hr-reps.model';

describe('Component Tests', () => {
    describe('HrReps Management Component', () => {
        let comp: HrRepsComponent;
        let fixture: ComponentFixture<HrRepsComponent>;
        let service: HrRepsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [QQuitTestModule],
                declarations: [HrRepsComponent],
                providers: []
            })
                .overrideTemplate(HrRepsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HrRepsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HrRepsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new HrReps(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.hrReps[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

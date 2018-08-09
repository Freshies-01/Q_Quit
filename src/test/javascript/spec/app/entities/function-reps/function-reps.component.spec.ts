/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { QQuitTestModule } from '../../../test.module';
import { FunctionRepsComponent } from 'app/entities/function-reps/function-reps.component';
import { FunctionRepsService } from 'app/entities/function-reps/function-reps.service';
import { FunctionReps } from 'app/shared/model/function-reps.model';

describe('Component Tests', () => {
    describe('FunctionReps Management Component', () => {
        let comp: FunctionRepsComponent;
        let fixture: ComponentFixture<FunctionRepsComponent>;
        let service: FunctionRepsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [QQuitTestModule],
                declarations: [FunctionRepsComponent],
                providers: []
            })
                .overrideTemplate(FunctionRepsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FunctionRepsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FunctionRepsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new FunctionReps(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.functionReps[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

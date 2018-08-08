/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { QQuitTestModule } from '../../../test.module';
import { FunctionRepsUpdateComponent } from 'app/entities/function-reps/function-reps-update.component';
import { FunctionRepsService } from 'app/entities/function-reps/function-reps.service';
import { FunctionReps } from 'app/shared/model/function-reps.model';

describe('Component Tests', () => {
    describe('FunctionReps Management Update Component', () => {
        let comp: FunctionRepsUpdateComponent;
        let fixture: ComponentFixture<FunctionRepsUpdateComponent>;
        let service: FunctionRepsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [QQuitTestModule],
                declarations: [FunctionRepsUpdateComponent]
            })
                .overrideTemplate(FunctionRepsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FunctionRepsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FunctionRepsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FunctionReps(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.functionReps = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FunctionReps();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.functionReps = entity;
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

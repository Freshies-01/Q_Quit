/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { QQuitTestModule } from '../../../test.module';
import { FunctionRepsDeleteDialogComponent } from 'app/entities/function-reps/function-reps-delete-dialog.component';
import { FunctionRepsService } from 'app/entities/function-reps/function-reps.service';

describe('Component Tests', () => {
    describe('FunctionReps Management Delete Component', () => {
        let comp: FunctionRepsDeleteDialogComponent;
        let fixture: ComponentFixture<FunctionRepsDeleteDialogComponent>;
        let service: FunctionRepsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [QQuitTestModule],
                declarations: [FunctionRepsDeleteDialogComponent]
            })
                .overrideTemplate(FunctionRepsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FunctionRepsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FunctionRepsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});

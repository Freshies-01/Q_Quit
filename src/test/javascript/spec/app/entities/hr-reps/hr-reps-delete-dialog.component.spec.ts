/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { QQuitTestModule } from '../../../test.module';
import { HrRepsDeleteDialogComponent } from 'app/entities/hr-reps/hr-reps-delete-dialog.component';
import { HrRepsService } from 'app/entities/hr-reps/hr-reps.service';

describe('Component Tests', () => {
    describe('HrReps Management Delete Component', () => {
        let comp: HrRepsDeleteDialogComponent;
        let fixture: ComponentFixture<HrRepsDeleteDialogComponent>;
        let service: HrRepsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [QQuitTestModule],
                declarations: [HrRepsDeleteDialogComponent]
            })
                .overrideTemplate(HrRepsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HrRepsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HrRepsService);
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

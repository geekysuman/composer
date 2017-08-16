/* tslint:disable:no-unused-expression */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { PublishProgressComponent } from './publish-progress.component';
import { AlertService } from '../alert.service';
import { BehaviorSubject, Subject } from 'rxjs/Rx';

import * as chai from 'chai';
import * as sinon from 'sinon';

let should = chai.should();

class MockTransactionService {
    public event$: Subject<string> = new BehaviorSubject<string>(null);
}

describe('PublishProgressComponent', () => {
    let component: PublishProgressComponent;
    let fixture: ComponentFixture<PublishProgressComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [PublishProgressComponent],
            providers: [
                AlertService
            ]
        });

        fixture = TestBed.createComponent(PublishProgressComponent);
        component = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
        it('should create', () => {
            component.should.be.ok;
        });

        it('should subscribe to alerts and only dismiss on close', fakeAsync(inject([AlertService], (service: AlertService) => {

            component.ngOnInit();

            service.publishStatus$.next({title: 'Publishing...'});

            tick();

            component['messages'].length.should.equal(1);

            component['messages'][0].should.deep.equal({title: 'Publishing...'});
        })));
    });

    describe('close', () => {
        it('should remove the alert', () => {
            component['messages'] = [{title: 'bob'}];

            component.close(0);

            component['messages'].length.should.equal(0);
        });
    });
});

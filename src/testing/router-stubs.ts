import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ActivatedRouteStub {

  private _testParams: {};
  private subject: BehaviorSubject<any>;
  public params: Observable<any>;

  constructor(initialParams: any = {}) {
    this._testParams = initialParams;
    this.subject = new BehaviorSubject(this.testParams);
    this.params = this.subject.asObservable();
  }

  get testParams() { return this._testParams; }
  set testParams(params: {}) {
    this._testParams = params;
    this.subject.next(params);
  }

  get snapshot() {
    return { params: this.testParams };
  }
}

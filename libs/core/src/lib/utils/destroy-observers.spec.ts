import { DestroyObservers } from './destroy-observers';
import { of } from 'rxjs';

class Component extends DestroyObservers {
  observable = of([]);
}

describe('DestroyObservers', () => {
  let component: Component;
  beforeEach(() => {
    component = new Component();
  });

  it('should create an instance', () => {
    expect(new Component()).toBeTruthy();
  });

  it('should create two subscriptions and unsubscribe both times', () => {
    component.subs = component.observable.subscribe();
    component.subs = component.observable.subscribe();
    spyOn(component.$subs[0], 'unsubscribe');
    component.ngOnDestroy();
    expect(component.$subs.shift().unsubscribe).toHaveBeenCalledTimes(2);
  });
});

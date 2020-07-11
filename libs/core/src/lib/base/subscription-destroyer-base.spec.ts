import { SubscriptionDestroyerBase } from './subscription-destroyer-base';
import { of } from 'rxjs';

class Component extends SubscriptionDestroyerBase {
  observable = of([]);
}

describe('SubscriptionDestroyerBase', () => {
  let component: Component;
  beforeEach(() => {
    component = new Component();
  });
  it('should create an instance', (done) => {
    component.observable.subscribe((data) => {
      expect(data.length).toBe(0);
      done();
    });
  });

  it('should create two subscriptions and unsubscribe both times', () => {

    component.subs = component.observable.subscribe();
    component.subs = component.observable.subscribe();

    spyOn(component.$subs[0], 'unsubscribe');

    component.ngOnDestroy();

    expect(component.$subs[0].unsubscribe).toHaveBeenCalledTimes(2);

  });
});

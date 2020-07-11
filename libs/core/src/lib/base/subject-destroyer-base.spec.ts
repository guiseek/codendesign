import { SubjectDestroyerBase } from './subject-destroyer-base';
import { of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

class Component extends SubjectDestroyerBase {
  observable = of([]);

  constructor() {
    super();
    this.observable.pipe(takeUntil(this.destroy$)).subscribe();
  }
}

describe('SubjectDestroyerBase', () => {
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
  it('should create an subscription', async (done) => {
    spyOn(component.destroy$, 'unsubscribe');

    component.observable.subscribe((data) => {
      component.ngOnDestroy();

      expect(component.destroy$.unsubscribe).toHaveBeenCalledTimes(1);
      done();
    });
  });
});

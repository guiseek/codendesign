import { CompleteSubject } from './complete-subject';
import { of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

class Component extends CompleteSubject {
  subject$ = of([1, 2, 3, 4, 5]);

  constructor() {
    super();
    this.subject$
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => result);
  }
}

describe('CompleteSubject', () => {
  let component: Component;

  beforeEach(() => (component = new Component()));

  it('should create an instance', () => {
    expect(new CompleteSubject()).toBeTruthy();
  });

  it('should unsubscribe an observable', async () => {
    spyOn(component.destroy$, 'unsubscribe');
    component.subject$.subscribe(() => {
      component.ngOnDestroy();
      expect(component.destroy$.unsubscribe).toHaveBeenCalledTimes(1);
    });
  });
});

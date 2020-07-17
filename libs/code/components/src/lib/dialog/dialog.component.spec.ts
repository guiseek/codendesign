import {
  ComponentFixture,
  fakeAsync,
  flushMicrotasks,
  inject,
  TestBed,
  tick,
  flush,
} from '@angular/core/testing';
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  Inject,
  Injector,
  NgModule,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { Directionality } from '@angular/cdk/bidi';
import { CodeDialogContainer } from './dialog.container';
import { OverlayContainer } from '@angular/cdk/overlay';
import { A, ESCAPE } from '@angular/cdk/keycodes';
import { DIALOG_DATA, Dialog, CodeDialogModule, DialogRef } from './index';
import { DialogConfig } from './dialog-config';

describe('Dialog', () => {
  let dialog: Dialog;
  let overlayContainerElement: HTMLElement;

  let testViewContainerRef: ViewContainerRef;
  let viewContainerFixture: ComponentFixture<ComponentWithChildViewContainer>;
  let mockLocation: SpyLocation;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [CodeDialogModule, DialogTestModule],
      providers: [
        {
          provide: OverlayContainer,
          useFactory: () => {
            overlayContainerElement = document.createElement('div');
            return { getContainerElement: () => overlayContainerElement };
          },
        },
        { provide: Location, useClass: SpyLocation },
      ],
    });

    TestBed.compileComponents();
  }));

  beforeEach(inject([Dialog, Location], (d: Dialog, l: Location) => {
    dialog = d;
    mockLocation = l as SpyLocation;
  }));

  beforeEach(() => {
    viewContainerFixture = TestBed.createComponent(
      ComponentWithChildViewContainer
    );

    viewContainerFixture.detectChanges();
    testViewContainerRef =
      viewContainerFixture.componentInstance.childViewContainer;
  });

  it('should open a dialog with a component', () => {
    const dialogRef = dialog.openFromComponent(PizzaMsg, {
      viewContainerRef: testViewContainerRef,
    } as DialogConfig);

    viewContainerFixture.detectChanges();

    expect(overlayContainerElement.textContent).toContain('Pizza');
    expect(dialogRef.componentInstance instanceof PizzaMsg).toBe(true);
    expect(dialogRef.componentInstance.dialogRef).toBe(dialogRef);

    viewContainerFixture.detectChanges();
    viewContainerFixture.detectChanges();
    const dialogContainerElement = overlayContainerElement.querySelector(
      'cnd-dialog'
    )!;
    expect(dialogContainerElement.getAttribute('role')).toBe('dialog');
    expect(dialogContainerElement.getAttribute('aria-modal')).toBe('true');
  });

  it('should open a dialog with a template', () => {
    const templateRefFixture = TestBed.createComponent(
      ComponentWithTemplateRef
    );
    templateRefFixture.componentInstance.localValue = 'Bees';
    templateRefFixture.detectChanges();

    const data = { value: 'Knees' };

    const dialogRef = dialog.openFromTemplate(
      templateRefFixture.componentInstance.templateRef,
      { data } as DialogConfig
    );

    viewContainerFixture.detectChanges();

    expect(overlayContainerElement.textContent).toContain('Cheese Bees Knees');
    expect(templateRefFixture.componentInstance.dialogRef).toBe(dialogRef);

    viewContainerFixture.detectChanges();

    const dialogContainerElement = overlayContainerElement.querySelector(
      'cnd-dialog'
    )!;
    expect(dialogContainerElement.getAttribute('role')).toBe('dialog');
    expect(dialogContainerElement.getAttribute('aria-modal')).toBe('true');

    dialogRef.close();
  });

  it('should emit when dialog opening animation is complete', fakeAsync(() => {
    const dialogRef = dialog.openFromComponent(PizzaMsg, {
      viewContainerRef: testViewContainerRef,
    } as DialogConfig);
    const spy = jasmine.createSpy('afterOpen spy');

    dialogRef.afterOpened().subscribe(spy);

    viewContainerFixture.detectChanges();

    // callback should not be called before animation is complete
    expect(spy).not.toHaveBeenCalled();

    flushMicrotasks();
    expect(spy).toHaveBeenCalled();
  }));

  it('should use injector from viewContainerRef for DialogInjector', () => {
    const dialogRef = dialog.openFromComponent(PizzaMsg, {
      viewContainerRef: testViewContainerRef,
    } as DialogConfig);

    viewContainerFixture.detectChanges();

    const dialogInjector = dialogRef.componentInstance.dialogInjector as Injector;

    expect(dialogRef.componentInstance.dialogRef).toBe(dialogRef);
    expect(
      dialogInjector.get<DirectiveWithViewContainer>(DirectiveWithViewContainer)
    ).toBeTruthy();
  });

  it('should open a dialog with a component and no ViewContainerRef', () => {
    const dialogRef = dialog.openFromComponent(PizzaMsg);

    viewContainerFixture.detectChanges();

    expect(overlayContainerElement.textContent).toContain('Pizza');
    expect(dialogRef.componentInstance instanceof PizzaMsg).toBe(true);
    expect(dialogRef.componentInstance.dialogRef).toBe(dialogRef);

    viewContainerFixture.detectChanges();
    const dialogContainerElement = overlayContainerElement.querySelector(
      'cnd-dialog'
    )!;
    expect(dialogContainerElement.getAttribute('role')).toBe('dialog');
  });

  it('should apply the configured role to the dialog element', () => {
    dialog.openFromComponent(PizzaMsg, { role: 'alertdialog' } as DialogConfig);

    viewContainerFixture.detectChanges();

    const dialogContainerElement = overlayContainerElement.querySelector(
      'cnd-dialog'
    )!;
    expect(dialogContainerElement.getAttribute('role')).toBe('alertdialog');
  });

  it('should apply the specified `aria-describedby`', () => {
    dialog.openFromComponent(PizzaMsg, {
      ariaDescribedBy: 'description-element',
    } as DialogConfig);

    viewContainerFixture.detectChanges();

    const dialogContainerElement = overlayContainerElement.querySelector(
      'cnd-dialog'
    )!;
    expect(dialogContainerElement.getAttribute('aria-describedby')).toBe(
      'description-element'
    );
  });

  it('should close a dialog and get back a result', fakeAsync(() => {
    const dialogRef = dialog.openFromComponent(PizzaMsg, {
      viewContainerRef: testViewContainerRef,
    } as DialogConfig);
    const afterCloseCallback = jasmine.createSpy('afterClose callback');

    viewContainerFixture.detectChanges();
    dialogRef.afterClosed().subscribe(afterCloseCallback);
    dialogRef.close('Charmander');
    viewContainerFixture.detectChanges();
    flush();

    expect(afterCloseCallback).toHaveBeenCalledWith('Charmander');
    expect(overlayContainerElement.querySelector('cnd-dialog')).toBeNull();
  }));

  it('should only emit the afterCloseEvent once when closed', fakeAsync(() => {
    const dialogRef = dialog.openFromComponent(PizzaMsg, {
      viewContainerRef: testViewContainerRef,
    } as DialogConfig);
    const afterCloseCallback = jasmine.createSpy('afterClose callback');

    viewContainerFixture.detectChanges();
    dialogRef.afterClosed().subscribe(afterCloseCallback);
    dialogRef.close();
    viewContainerFixture.detectChanges();
    flush();

    expect(afterCloseCallback).toHaveBeenCalledTimes(1);
  }));

  it('should close a dialog and get back a result before it is closed', fakeAsync(() => {
    const dialogRef = dialog.openFromComponent(PizzaMsg, {
      viewContainerRef: testViewContainerRef,
    } as DialogConfig);
    viewContainerFixture.detectChanges();

    // beforeClose should emit before dialog container is destroyed
    const beforeCloseHandler = jasmine
      .createSpy('beforeClose callback')
      .and.callFake(() => {
        expect(
          overlayContainerElement.querySelector('cnd-dialog')
        ).not.toBeNull();
      });

    dialogRef.beforeClosed().subscribe(beforeCloseHandler);
    dialogRef.close('Bulbasaur');
    viewContainerFixture.detectChanges();
    flush();

    expect(beforeCloseHandler).toHaveBeenCalledWith('Bulbasaur');
    expect(overlayContainerElement.querySelector('cnd-dialog')).toBeNull();
  }));

  // it('should close a dialog via the escape key', fakeAsync(() => {
  //   dialog.openFromComponent(PizzaMsg, {
  //     viewContainerRef: testViewContainerRef,
  //   } as DialogConfig);

  //   viewContainerFixture.detectChanges();
  //   const event = dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
  //   viewContainerFixture.detectChanges();
  //   flush();

  //   expect(overlayContainerElement.querySelector('cnd-dialog')).toBeNull();
  //   expect(event.defaultPrevented).toBe(true);
  // }));

  // it('should not close a dialog via the escape key if a modifier is pressed', fakeAsync(() => {
  //   dialog.openFromComponent(PizzaMsg, {
  //     viewContainerRef: testViewContainerRef,
  //   } as DialogConfig);

  //   viewContainerFixture.detectChanges();
  //   const event = createKeyboardEvent('keydown', ESCAPE);
  //   Object.defineProperty(event, 'altKey', { get: () => true });
  //   dispatchEvent(document.body, event);
  //   viewContainerFixture.detectChanges();
  //   flush();

  //   expect(overlayContainerElement.querySelector('cnd-dialog')).toBeTruthy();
  //   expect(event.defaultPrevented).toBe(false);
  // }));

  it('should close from a ViewContainerRef with OnPush change detection', fakeAsync(() => {
    const onPushFixture = TestBed.createComponent(
      ComponentWithOnPushViewContainer
    );

    onPushFixture.detectChanges();

    const dialogRef = dialog.openFromComponent(PizzaMsg, {
      viewContainerRef: onPushFixture.componentInstance.viewContainerRef,
    } as DialogConfig);

    flushMicrotasks();
    onPushFixture.detectChanges();
    flushMicrotasks();

    expect(overlayContainerElement.querySelectorAll('cnd-dialog').length).toBe(
      1,
      // 'Expected one open dialog.'
    );

    dialogRef.close();
    flushMicrotasks();
    onPushFixture.detectChanges();
    tick(500);

    expect(overlayContainerElement.querySelectorAll('cnd-dialog').length).toBe(
      0,
      // 'Expected no open dialogs.'
    );
  }));

  it('should close when clicking on the overlay backdrop', fakeAsync(() => {
    dialog.openFromComponent(PizzaMsg, {
      viewContainerRef: testViewContainerRef,
    } as DialogConfig);
    viewContainerFixture.detectChanges();

    const backdrop = overlayContainerElement.querySelector(
      '.cdk-overlay-backdrop'
    ) as HTMLElement;

    backdrop.click();
    viewContainerFixture.detectChanges();
    flush();

    expect(overlayContainerElement.querySelector('cnd-dialog')).toBeFalsy();
  }));

  it('should emit the backdropClick stream when clicking on the overlay backdrop', fakeAsync(() => {
    const dialogRef = dialog.openFromComponent(PizzaMsg, {
      viewContainerRef: testViewContainerRef,
    } as DialogConfig);
    const spy = jasmine.createSpy('backdropClick spy');
    dialogRef.backdropClick().subscribe(spy);
    viewContainerFixture.detectChanges();

    const backdrop = overlayContainerElement.querySelector(
      '.cdk-overlay-backdrop'
    ) as HTMLElement;

    backdrop.click();
    expect(spy).toHaveBeenCalledTimes(1);

    viewContainerFixture.detectChanges();
    flush();

    // Additional clicks after the dialog has closed should not be emitted
    backdrop.click();
    expect(spy).toHaveBeenCalledTimes(1);
  }));

  // it('should emit the keyboardEvent stream when key events target the overlay', fakeAsync(() => {
  //   const dialogRef = dialog.openFromComponent(PizzaMsg, {
  //     viewContainerRef: testViewContainerRef,
  //   } as DialogConfig);

  //   const spy = jasmine.createSpy('keyboardEvent spy');
  //   dialogRef.keydownEvents().subscribe(spy);

  //   viewContainerFixture.detectChanges();

  //   const backdrop = overlayContainerElement.querySelector(
  //     '.cdk-overlay-backdrop'
  //   ) as HTMLElement;
  //   const container = overlayContainerElement.querySelector(
  //     'cnd-dialog'
  //   ) as HTMLElement;
  //   dispatchKeyboardEvent(document.body, 'keydown', A);
  //   dispatchKeyboardEvent(document.body, 'keydown', A, undefined, backdrop);
  //   dispatchKeyboardEvent(document.body, 'keydown', A, undefined, container);

  //   expect(spy).toHaveBeenCalledTimes(3);
  // }));

  it('should notify the observers if a dialog has been opened', () => {
    dialog.afterOpened.subscribe((ref) => {
      expect(
        dialog.openFromComponent(PizzaMsg, {
          viewContainerRef: testViewContainerRef,
        } as DialogConfig)
      ).toBe(ref);
    });
  });

  it('should notify the observers if all open dialogs have finished closing', fakeAsync(() => {
    const ref1 = dialog.openFromComponent(PizzaMsg, {
      viewContainerRef: testViewContainerRef,
    } as DialogConfig);
    const ref2 = dialog.openFromComponent(ContentElementDialog, {
      viewContainerRef: testViewContainerRef,
    } as DialogConfig);
    const spy = jasmine.createSpy('afterAllClosed spy');

    viewContainerFixture.detectChanges();
    dialog.afterAllClosed.subscribe(spy);

    ref1.close();
    viewContainerFixture.detectChanges();
    flush();

    expect(spy).not.toHaveBeenCalled();

    ref2.close();
    viewContainerFixture.detectChanges();
    flush();
    viewContainerFixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  }));

  it('should emit the afterAllClosed stream on subscribe if there are no open dialogs', () => {
    const spy = jasmine.createSpy('afterAllClosed spy');

    dialog.afterAllClosed.subscribe(spy);

    expect(spy).toHaveBeenCalled();
  });

  it('should override the width of the overlay pane', () => {
    dialog.openFromComponent(PizzaMsg, {
      width: '500px',
    } as DialogConfig);

    viewContainerFixture.detectChanges();

    const overlayPane = overlayContainerElement.querySelector(
      '.cdk-overlay-pane'
    ) as HTMLElement;

    expect(overlayPane.style.width).toBe('500px');
  });

  it('should override the height of the overlay pane', () => {
    dialog.openFromComponent(PizzaMsg, {
      height: '100px',
    } as DialogConfig);

    viewContainerFixture.detectChanges();

    const overlayPane = overlayContainerElement.querySelector(
      '.cdk-overlay-pane'
    ) as HTMLElement;

    expect(overlayPane.style.height).toBe('100px');
  });

  it('should override the min-width of the overlay pane', () => {
    dialog.openFromComponent(PizzaMsg, {
      minWidth: '500px',
    } as DialogConfig);

    viewContainerFixture.detectChanges();

    const overlayPane = overlayContainerElement.querySelector(
      '.cdk-overlay-pane'
    ) as HTMLElement;

    expect(overlayPane.style.minWidth).toBe('500px');
  });

  it('should override the max-width of the overlay pane', fakeAsync(() => {
    let dialogRef = dialog.openFromComponent(PizzaMsg);

    viewContainerFixture.detectChanges();

    let overlayPane = overlayContainerElement.querySelector(
      '.cdk-overlay-pane'
    ) as HTMLElement;

    expect(overlayPane.style.maxWidth).toBe(
      '80vw',
    );

    dialogRef.close();

    tick(500);
    viewContainerFixture.detectChanges();
    flushMicrotasks();

    dialogRef = dialog.openFromComponent(PizzaMsg, {
      maxWidth: '100px',
    } as DialogConfig);

    tick(500);
    viewContainerFixture.detectChanges();
    flushMicrotasks();

    overlayPane = overlayContainerElement.querySelector(
      '.cdk-overlay-pane'
    ) as HTMLElement;
    expect(overlayPane.style.maxWidth).toBe('100px');
  }));

  it('should override the min-height of the overlay pane', () => {
    dialog.openFromComponent(PizzaMsg, {
      minHeight: '300px',
    } as DialogConfig);

    viewContainerFixture.detectChanges();

    const overlayPane = overlayContainerElement.querySelector(
      '.cdk-overlay-pane'
    ) as HTMLElement;

    expect(overlayPane.style.minHeight).toBe('300px');
  });

  it('should override the max-height of the overlay pane', () => {
    dialog.openFromComponent(PizzaMsg, {
      maxHeight: '100px',
    } as DialogConfig);

    viewContainerFixture.detectChanges();

    const overlayPane = overlayContainerElement.querySelector(
      '.cdk-overlay-pane'
    ) as HTMLElement;

    expect(overlayPane.style.maxHeight).toBe('100px');
  });

  it('should override the top offset of the overlay pane', () => {
    dialog.openFromComponent(PizzaMsg, {
      position: {
        top: '100px',
      },
    } as DialogConfig);

    viewContainerFixture.detectChanges();

    const overlayPane = overlayContainerElement.querySelector(
      '.cdk-overlay-pane'
    ) as HTMLElement;

    expect(overlayPane.style.marginTop).toBe('100px');
  });

  it('should override the bottom offset of the overlay pane', () => {
    dialog.openFromComponent(PizzaMsg, {
      position: {
        bottom: '200px',
      },
    } as DialogConfig);

    viewContainerFixture.detectChanges();

    const overlayPane = overlayContainerElement.querySelector(
      '.cdk-overlay-pane'
    ) as HTMLElement;

    expect(overlayPane.style.marginBottom).toBe('200px');
  });

  it('should override the left offset of the overlay pane', () => {
    dialog.openFromComponent(PizzaMsg, {
      position: {
        left: '250px',
      },
    } as DialogConfig);

    viewContainerFixture.detectChanges();

    const overlayPane = overlayContainerElement.querySelector(
      '.cdk-overlay-pane'
    ) as HTMLElement;

    expect(overlayPane.style.marginLeft).toBe('250px');
  });

  it('should override the right offset of the overlay pane', () => {
    dialog.openFromComponent(PizzaMsg, {
      position: {
        right: '125px',
      },
    } as DialogConfig);

    viewContainerFixture.detectChanges();

    const overlayPane = overlayContainerElement.querySelector(
      '.cdk-overlay-pane'
    ) as HTMLElement;

    expect(overlayPane.style.marginRight).toBe('125px');
  });

  it('should allow for the position to be updated', () => {
    const dialogRef = dialog.openFromComponent(PizzaMsg, {
      position: {
        left: '250px',
      },
    } as DialogConfig);

    viewContainerFixture.detectChanges();

    const overlayPane = overlayContainerElement.querySelector(
      '.cdk-overlay-pane'
    ) as HTMLElement;

    expect(overlayPane.style.marginLeft).toBe('250px');

    dialogRef.updatePosition({ left: '500px' });

    expect(overlayPane.style.marginLeft).toBe('500px');
  });

  it('should allow for the dimensions to be updated', () => {
    const dialogRef = dialog.openFromComponent(PizzaMsg, { width: '100px' } as DialogConfig);

    viewContainerFixture.detectChanges();

    const overlayPane = overlayContainerElement.querySelector(
      '.cdk-overlay-pane'
    ) as HTMLElement;

    expect(overlayPane.style.width).toBe('100px');

    dialogRef.updateSize({ width: '200px' });

    expect(overlayPane.style.width).toBe('200px');
  });

  it('should allow setting the layout direction', () => {
    dialog.openFromComponent(PizzaMsg, { direction: 'rtl' } as DialogConfig);

    viewContainerFixture.detectChanges();

    const overlayPane = overlayContainerElement.querySelector(
      '.cdk-global-overlay-wrapper'
    )!;

    expect(overlayPane.getAttribute('dir')).toBe('rtl');
  });

  it('should inject the correct layout direction in the component instance', () => {
    const dialogRef = dialog.openFromComponent(PizzaMsg, { direction: 'rtl' } as DialogConfig);

    viewContainerFixture.detectChanges();

    expect(dialogRef.componentInstance.directionality.value).toBe('rtl');
  });

  it('should fall back to injecting the global direction if none is passed by the config', () => {
    const dialogRef = dialog.openFromComponent(PizzaMsg, {} as DialogConfig);

    viewContainerFixture.detectChanges();

    expect(dialogRef.componentInstance.directionality.value).toBe('ltr');
  });

  it('should close all of the dialogs', fakeAsync(() => {
    dialog.openFromComponent(PizzaMsg);
    viewContainerFixture.detectChanges();
    dialog.openFromComponent(PizzaMsg);
    viewContainerFixture.detectChanges();
    dialog.openFromComponent(PizzaMsg);
    viewContainerFixture.detectChanges();

    expect(overlayContainerElement.querySelectorAll('cnd-dialog').length).toBe(
      3
    );

    dialog.closeAll();
    viewContainerFixture.detectChanges();
    flush();

    expect(overlayContainerElement.querySelectorAll('cnd-dialog').length).toBe(
      0
    );
  }));

  it('should set the proper animation states', () => {
    const dialogRef = dialog.openFromComponent(PizzaMsg, {
      viewContainerRef: testViewContainerRef,
    } as DialogConfig);
    const dialogContainer: CodeDialogContainer = viewContainerFixture.debugElement.query(
      By.directive(CodeDialogContainer)
    )!.componentInstance;

    expect(dialogContainer._state).toBe('enter');

    dialogRef.close();

    expect(dialogContainer._state).toBe('exit');
  });

  it('should close all dialogs when the user goes forwards/backwards in history', fakeAsync(() => {
    dialog.openFromComponent(PizzaMsg);
    viewContainerFixture.detectChanges();
    dialog.openFromComponent(PizzaMsg);
    viewContainerFixture.detectChanges();

    expect(overlayContainerElement.querySelectorAll('cnd-dialog').length).toBe(
      2
    );

    mockLocation.simulateUrlPop('');
    viewContainerFixture.detectChanges();
    flush();

    expect(overlayContainerElement.querySelectorAll('cnd-dialog').length).toBe(
      0
    );
  }));

  it('should close all open dialogs when the location hash changes', fakeAsync(() => {
    dialog.openFromComponent(PizzaMsg);
    viewContainerFixture.detectChanges();
    dialog.openFromComponent(PizzaMsg);
    viewContainerFixture.detectChanges();

    expect(overlayContainerElement.querySelectorAll('cnd-dialog').length).toBe(
      2
    );

    mockLocation.simulateHashChange('');
    viewContainerFixture.detectChanges();
    flush();

    expect(overlayContainerElement.querySelectorAll('cnd-dialog').length).toBe(
      0
    );
  }));

  it('should have the componentInstance available in the afterClosed callback', fakeAsync(() => {
    const dialogRef = dialog.openFromComponent(PizzaMsg);
    const spy = jasmine.createSpy('afterClosed spy');

    flushMicrotasks();
    viewContainerFixture.detectChanges();
    flushMicrotasks();

    dialogRef.afterClosed().subscribe(() => {
      spy();
    });

    dialogRef.close();

    flushMicrotasks();
    viewContainerFixture.detectChanges();
    tick(500);

    // Ensure that the callback actually fires.
    expect(spy).toHaveBeenCalled();
  }));

  it('should close all open dialogs on destroy', fakeAsync(() => {
    dialog.openFromComponent(PizzaMsg, {
      viewContainerRef: testViewContainerRef,
    } as DialogConfig);
    dialog.openFromComponent(PizzaMsg, {
      viewContainerRef: testViewContainerRef,
    } as DialogConfig);

    viewContainerFixture.detectChanges();
    expect(overlayContainerElement.querySelectorAll('cnd-dialog').length).toBe(
      2
    );

    dialog.ngOnDestroy();
    viewContainerFixture.detectChanges();
    flush();

    expect(overlayContainerElement.querySelectorAll('cnd-dialog').length).toBe(
      0
    );
  }));

  it('should complete the various lifecycle streams on destroy', fakeAsync(() => {
    const dialogRef = dialog.openFromComponent(PizzaMsg, {
      viewContainerRef: testViewContainerRef,
    } as DialogConfig);
    const beforeOpenedComplete = jasmine.createSpy('before opened complete spy');
    const afterOpenedComplete = jasmine.createSpy('after opened complete spy');
    const beforeClosedComplete = jasmine.createSpy('before closed complete spy');
    const afterClosedComplete = jasmine.createSpy('after closed complete spy');

    viewContainerFixture.detectChanges();
    dialogRef.beforeOpened().subscribe({ complete: beforeOpenedComplete });
    dialogRef.afterOpened().subscribe({ complete: afterOpenedComplete });
    dialogRef.beforeClosed().subscribe({ complete: beforeClosedComplete });
    dialogRef.afterClosed().subscribe({ complete: afterClosedComplete });

    dialogRef.close('Charmander');
    viewContainerFixture.detectChanges();
    flush();

    expect(beforeOpenedComplete).toHaveBeenCalled();
    expect(afterOpenedComplete).toHaveBeenCalled();
    expect(beforeClosedComplete).toHaveBeenCalled();
    expect(afterClosedComplete).toHaveBeenCalled();
  }));

  describe('passing in data', () => {
    it('should be able to pass in data', () => {
      const config = {
        data: {
          stringParam: 'hello',
          dateParam: new Date(),
        },
      };

      const instance = dialog.openFromComponent(DialogWithInjectedData, config as DialogConfig)
        .componentInstance;

      expect(instance.data.stringParam).toBe(config.data.stringParam);
      expect(instance.data.dateParam).toBe(config.data.dateParam);
    });

    it('should default to null if no data is passed', () => {
      expect(() => {
        const dialogRef = dialog.openFromComponent(DialogWithInjectedData);
        viewContainerFixture.detectChanges();
        expect(dialogRef.componentInstance.data).toBeNull();
      }).not.toThrow();
    });
  });

  it('should not keep a reference to the component after the dialog is closed', fakeAsync(() => {
    const dialogRef = dialog.openFromComponent(PizzaMsg);
    viewContainerFixture.detectChanges();

    expect(dialogRef.componentInstance).toBeTruthy();

    dialogRef.close();
    flush();
    viewContainerFixture.detectChanges();
    flush();

    expect(dialogRef.componentInstance).toBeFalsy(
      // 'Expected reference to have been cleared.'
    );
  }));

  it('should assign a unique id to each dialog', () => {
    const one = dialog.openFromComponent(PizzaMsg);
    const two = dialog.openFromComponent(PizzaMsg);

    expect(one.id).toBeTruthy();
    expect(two.id).toBeTruthy();
    expect(one.id).not.toBe(two.id);
  });

  it('should allow for the id to be overwritten', () => {
    const dialogRef = dialog.openFromComponent(PizzaMsg, { id: 'pizza' } as DialogConfig);
    expect(dialogRef.id).toBe('pizza');
  });

  it('should throw when trying to open a dialog with the same id as another dialog', () => {
    dialog.openFromComponent(PizzaMsg, { id: 'pizza' } as DialogConfig);
    expect(() =>
      dialog.openFromComponent(PizzaMsg, { id: 'pizza' } as DialogConfig)
    ).toThrowError(/must be unique/g);
  });

  it('should be able to find a dialog by id', () => {
    const dialogRef = dialog.openFromComponent(PizzaMsg, { id: 'pizza' } as DialogConfig);
    expect(dialog.getById('pizza')).toBe(dialogRef);
  });

  describe('disableClose option', () => {
    it('should prevent closing via clicks on the backdrop', fakeAsync(() => {
      dialog.openFromComponent(PizzaMsg, {
        disableClose: true,
        viewContainerRef: testViewContainerRef,
      } as DialogConfig);

      viewContainerFixture.detectChanges();

      const backdrop = overlayContainerElement.querySelector(
        '.cdk-overlay-backdrop'
      ) as HTMLElement;
      backdrop.click();
      viewContainerFixture.detectChanges();
      flush();

      expect(overlayContainerElement.querySelector('cnd-dialog')).toBeTruthy();
    }));

    // it('should prevent closing via the escape key', fakeAsync(() => {
    //   dialog.openFromComponent(PizzaMsg, {
    //     disableClose: true,
    //     viewContainerRef: testViewContainerRef,
    //   } as DialogConfig);

    //   viewContainerFixture.detectChanges();
    //   dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
    //   viewContainerFixture.detectChanges();
    //   flush();

    //   expect(overlayContainerElement.querySelector('cnd-dialog')).toBeTruthy();
    // }));

    it('should allow for the disableClose option to be updated while open', fakeAsync(() => {
      const dialogRef = dialog.openFromComponent(PizzaMsg, {
        disableClose: true,
        viewContainerRef: testViewContainerRef,
      } as DialogConfig);

      viewContainerFixture.detectChanges();

      const backdrop = overlayContainerElement.querySelector(
        '.cdk-overlay-backdrop'
      ) as HTMLElement;
      backdrop.click();

      expect(overlayContainerElement.querySelector('cnd-dialog')).toBeTruthy();

      dialogRef.disableClose = false;
      backdrop.click();
      viewContainerFixture.detectChanges();
      flush();

      expect(overlayContainerElement.querySelector('cnd-dialog')).toBeFalsy();
    }));

    // it('should work when opening from a template', fakeAsync(() => {
    //   const templateRefFixture = TestBed.createComponent(
    //     ComponentWithTemplateRef
    //   );
    //   templateRefFixture.detectChanges();

    //   dialog.openFromTemplate(
    //     templateRefFixture.componentInstance.templateRef,
    //     {
    //       disableClose: true,
    //     } as DialogConfig
    //   );

    //   templateRefFixture.detectChanges();

    //   const backdrop = overlayContainerElement.querySelector(
    //     '.cdk-overlay-backdrop'
    //   ) as HTMLElement;
    //   backdrop.click();
    //   templateRefFixture.detectChanges();
    //   flush();

    //   expect(overlayContainerElement.querySelector('cnd-dialog')).toBeTruthy();
    // }));
  });

  describe('hasBackdrop option', () => {
    it('should have a backdrop', () => {
      dialog.openFromComponent(PizzaMsg, {
        hasBackdrop: true,
        viewContainerRef: testViewContainerRef,
      } as DialogConfig);

      viewContainerFixture.detectChanges();

      expect(
        overlayContainerElement.querySelector('.cdk-overlay-backdrop')
      ).toBeTruthy();
    });

    it('should not have a backdrop', () => {
      dialog.openFromComponent(PizzaMsg, {
        hasBackdrop: false,
        viewContainerRef: testViewContainerRef,
      } as DialogConfig);

      viewContainerFixture.detectChanges();

      expect(
        overlayContainerElement.querySelector('.cdk-overlay-backdrop')
      ).toBeFalsy();
    });
  });

  describe('panelClass option', () => {
    it('should have custom panel class', () => {
      dialog.openFromComponent(PizzaMsg, {
        panelClass: 'custom-panel-class',
        viewContainerRef: testViewContainerRef,
      } as DialogConfig);

      viewContainerFixture.detectChanges();

      expect(
        overlayContainerElement.querySelector('.custom-panel-class')
      ).toBeTruthy();
    });
  });

  describe('backdropClass option', () => {
    it('should have default backdrop class', () => {
      dialog.openFromComponent(PizzaMsg, {
        backdropClass: '',
        viewContainerRef: testViewContainerRef,
      } as DialogConfig);

      viewContainerFixture.detectChanges();

      expect(
        overlayContainerElement.querySelector('.cdk-overlay-dark-backdrop')
      ).toBeTruthy();
    });

    it('should have custom backdrop class', () => {
      dialog.openFromComponent(PizzaMsg, {
        backdropClass: 'custom-backdrop-class',
        viewContainerRef: testViewContainerRef,
      } as DialogConfig);

      viewContainerFixture.detectChanges();

      expect(
        overlayContainerElement.querySelector('.custom-backdrop-class')
      ).toBeTruthy();
    });
  });

  describe('focus management', () => {
    // When testing focus, all of the elements must be in the DOM.
    beforeEach(() => document.body.appendChild(overlayContainerElement));
    afterEach(() => document.body.removeChild(overlayContainerElement));

    it('should focus the first tabbable element of the dialog on open', fakeAsync(() => {
      dialog.openFromComponent(PizzaMsg, {
        viewContainerRef: testViewContainerRef,
      } as DialogConfig);

      viewContainerFixture.detectChanges();
      flushMicrotasks();

      expect(document.activeElement!.tagName).toBe(
        'CND-DIALOG',
        // 'Expected first tabbable element (input) in the dialog to be focused.'
      );
    }));

    it('should allow disabling focus of the first tabbable element', fakeAsync(() => {
      dialog.openFromComponent(PizzaMsg, {
        viewContainerRef: testViewContainerRef,
        autoFocus: false,
      } as DialogConfig);

      viewContainerFixture.detectChanges();
      flushMicrotasks();

      expect(document.activeElement!.tagName).not.toBe('INPUT');
    }));

    // it('should re-focus trigger element when dialog closes', fakeAsync(() => {
    //   // Create a element that has focus before the dialog is opened.
    //   const button = document.createElement('button');
    //   button.id = 'dialog-trigger';
    //   document.body.appendChild(button);
    //   button.focus();

    //   const dialogRef = dialog.openFromComponent(PizzaMsg, {
    //     viewContainerRef: testViewContainerRef,
    //   } as DialogConfig);

    //   flushMicrotasks();
    //   viewContainerFixture.detectChanges();
    //   flushMicrotasks();

    //   expect(document.activeElement!.id).not.toBe(
    //     'dialog-trigger',
    //     // 'Expected the focus to change when dialog was opened.'
    //   );

    //   dialogRef.close();
    //   expect(document.activeElement!.id).not.toBe(
    //     'dialog-trigger',
    //     // 'Expcted the focus not to have changed before the animation finishes.'
    //   );

    //   flushMicrotasks();
    //   viewContainerFixture.detectChanges();
    //   flush();

    //   expect(document.activeElement!.id).toBe(
    //     'dialog-trigger',
    //     // 'Expected that the trigger was refocused after the dialog is closed.'
    //   );

    //   document.body.removeChild(button);
    // }));

    // it('should not move focus if it was moved outside the dialog while animating', fakeAsync(() => {
    //   // Create a element that has focus before the dialog is opened.
    //   const button = document.createElement('button');
    //   const otherButton = document.createElement('button');
    //   const body = document.body;
    //   button.id = 'dialog-trigger';
    //   otherButton.id = 'other-button';
    //   body.appendChild(button);
    //   body.appendChild(otherButton);
    //   button.focus();

    //   const dialogRef = dialog.openFromComponent(PizzaMsg, {
    //     viewContainerRef: testViewContainerRef,
    //   } as DialogConfig);

    //   flushMicrotasks();
    //   viewContainerFixture.detectChanges();
    //   flushMicrotasks();

    //   expect(document.activeElement!.id).not.toBe(
    //     'dialog-trigger',
    //     // 'Expected the focus to change when dialog was opened.'
    //   );

    //   // Start the closing sequence and move focus out of dialog.
    //   dialogRef.close();
    //   otherButton.focus();

    //   expect(document.activeElement!.id).toBe(
    //     'other-button',
    //     // 'Expected focus to be on the alternate button.'
    //   );

    //   flushMicrotasks();
    //   viewContainerFixture.detectChanges();
    //   flush();

    //   expect(document.activeElement!.id).toBe(
    //     'other-button',
    //     // 'Expected focus to stay on the alternate button.'
    //   );

    //   body.removeChild(button);
    //   body.removeChild(otherButton);
    // }));

    // it('should allow the consumer to shift focus in afterClosed', fakeAsync(() => {
    //   // Create a element that has focus before the dialog is opened.
    //   const button = document.createElement('button');
    //   const input = document.createElement('input');

    //   button.id = 'dialog-trigger';
    //   input.id = 'input-to-be-focused';

    //   document.body.appendChild(button);
    //   document.body.appendChild(input);
    //   button.focus();

    //   const dialogRef = dialog.openFromComponent(PizzaMsg, {
    //     viewContainerRef: testViewContainerRef,
    //   } as DialogConfig);

    //   tick(500);
    //   viewContainerFixture.detectChanges();

    //   dialogRef.afterClosed().subscribe(() => input.focus());
    //   dialogRef.close();

    //   tick(500);
    //   viewContainerFixture.detectChanges();
    //   flushMicrotasks();

    //   expect(document.activeElement!.id).toBe(
    //     'input-to-be-focused',
    //     // 'Expected that the trigger was refocused after the dialog is closed.'
    //   );

    //   document.body.removeChild(button);
    //   document.body.removeChild(input);
    //   flush();
    // }));

    it('should move focus to the container if there are no focusable elements in the dialog', fakeAsync(() => {
      dialog.openFromComponent(DialogWithoutFocusableElements);

      viewContainerFixture.detectChanges();
      flushMicrotasks();

      expect(document.activeElement!.tagName.toLowerCase()).toBe(
        'cnd-dialog',
        // 'Expected dialog container to be focused.'
      );
    }));
  });

  describe('aria-label', () => {
    it('should be able to set a custom aria-label', () => {
      dialog.openFromComponent(PizzaMsg, {
        ariaLabel: 'Hello there',
        viewContainerRef: testViewContainerRef,
      } as DialogConfig);
      viewContainerFixture.detectChanges();

      const container = overlayContainerElement.querySelector('cnd-dialog')!;
      expect(container.getAttribute('aria-label')).toBe('Hello there');
    });

    it('should not set the aria-labelledby automatically if it has an aria-label', fakeAsync(() => {
      dialog.openFromComponent(ContentElementDialog, {
        ariaLabel: 'Hello there',
        viewContainerRef: testViewContainerRef,
      } as DialogConfig);
      viewContainerFixture.detectChanges();
      tick();
      viewContainerFixture.detectChanges();

      const container = overlayContainerElement.querySelector('cnd-dialog')!;
      expect(container.hasAttribute('aria-labelledby')).toBe(false);
    }));
  });
});

describe('Dialog with a parent Dialog', () => {
  let parentDialog: Dialog;
  let childDialog: Dialog;
  let overlayContainerElement: HTMLElement;
  let fixture: ComponentFixture<ComponentThatProvidesMatDialog>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [CodeDialogModule, DialogTestModule],
      declarations: [ComponentThatProvidesMatDialog],
      providers: [
        {
          provide: OverlayContainer,
          useFactory: () => {
            overlayContainerElement = document.createElement('div');
            return { getContainerElement: () => overlayContainerElement };
          },
        },
        { provide: Location, useClass: SpyLocation },
      ],
    });

    TestBed.compileComponents();
  }));

  beforeEach(inject([Dialog], (d: Dialog) => {
    parentDialog = d;

    fixture = TestBed.createComponent(ComponentThatProvidesMatDialog);
    childDialog = fixture.componentInstance.dialog;
    fixture.detectChanges();
  }));

  afterEach(() => {
    overlayContainerElement.innerHTML = '';
  });

  it('should close dialogs opened by a parent when calling closeAll on a child Dialog', fakeAsync(() => {
    parentDialog.openFromComponent(PizzaMsg);
    fixture.detectChanges();
    flush();

    expect(overlayContainerElement.textContent).toContain(
      'Pizza',
      // 'Expected a dialog to be opened'
    );

    childDialog.closeAll();
    fixture.detectChanges();
    flush();

    expect(overlayContainerElement.textContent!.trim()).toBe(
      '',
      // 'Expected closeAll on child Dialog to close dialog opened by parent'
    );
  }));

  it('should close dialogs opened by a child when calling closeAll on a parent Dialog', fakeAsync(() => {
    childDialog.openFromComponent(PizzaMsg);
    fixture.detectChanges();

    expect(overlayContainerElement.textContent).toContain(
      'Pizza',
      // 'Expected a dialog to be opened'
    );

    parentDialog.closeAll();
    fixture.detectChanges();
    flush();

    expect(overlayContainerElement.textContent!.trim()).toBe(
      '',
      // 'Expected closeAll on parent Dialog to close dialog opened by child'
    );
  }));

  it('should not close the parent dialogs, when a child is destroyed', fakeAsync(() => {
    parentDialog.openFromComponent(PizzaMsg);
    fixture.detectChanges();
    flush();

    expect(overlayContainerElement.textContent).toContain(
      'Pizza',
      // 'Expected a dialog to be opened'
    );

    childDialog.ngOnDestroy();
    fixture.detectChanges();
    flush();

    expect(overlayContainerElement.textContent).toContain(
      'Pizza',
      // 'Expected a dialog to remain opened'
    );
  }));

  // it('should close the top dialog via the escape key', fakeAsync(() => {
  //   childDialog.openFromComponent(PizzaMsg);
  //   fixture.detectChanges();

  //   dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
  //   fixture.detectChanges();
  //   flush();

  //   expect(overlayContainerElement.querySelector('cnd-dialog')).toBeNull();
  // }));
});

@Directive({ selector: 'dir-with-view-container' })
class DirectiveWithViewContainer {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: 'hello',
})
class ComponentWithOnPushViewContainer {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

@Component({
  selector: 'arbitrary-component',
  template: `<dir-with-view-container></dir-with-view-container>`,
})
class ComponentWithChildViewContainer {
  @ViewChild(DirectiveWithViewContainer)
  childWithViewContainer: DirectiveWithViewContainer;

  get childViewContainer() {
    return this.childWithViewContainer.viewContainerRef;
  }
}

@Component({
  selector: 'arbitrary-component-with-template-ref',
  template: `<ng-template let-data let-dialogRef="dialogRef">
    Cheese {{ localValue }} {{ data?.value
    }}{{ setDialogRef(dialogRef) }}</ng-template
  >`,
})
class ComponentWithTemplateRef {
  localValue: string;
  dialogRef: DialogRef<any>;

  @ViewChild(TemplateRef) templateRef: TemplateRef<any>;

  setDialogRef(dialogRef: DialogRef<any>): string {
    this.dialogRef = dialogRef;
    return '';
  }
}

/** Simple component for testing ComponentPortal. */
@Component({ template: '<p>Pizza</p> <input> <button>Close</button>' })
class PizzaMsg {
  constructor(
    public dialogRef: DialogRef<PizzaMsg>,
    public dialogInjector: Injector,
    public directionality: Directionality
  ) {}
}

@Component({
  template: ` <h1>This is the title</h1> `,
})
class ContentElementDialog {
  closeButtonAriaLabel: string;
}

@Component({
  template: '',
  providers: [Dialog],
})
class ComponentThatProvidesMatDialog {
  constructor(public dialog: Dialog) {}
}

/** Simple component for testing ComponentPortal. */
@Component({ template: '' })
class DialogWithInjectedData {
  constructor(@Inject(DIALOG_DATA) public data: any) {}
}

@Component({ template: '<p>Pasta</p>' })
class DialogWithoutFocusableElements {}

// Create a real (non-test) NgModule as a workaround for
// https://github.com/angular/angular/issues/10760
const TEST_DIRECTIVES = [
  ComponentWithChildViewContainer,
  ComponentWithTemplateRef,
  PizzaMsg,
  DirectiveWithViewContainer,
  ComponentWithOnPushViewContainer,
  ContentElementDialog,
  DialogWithInjectedData,
  DialogWithoutFocusableElements,
];

@NgModule({
  imports: [CodeDialogModule, NoopAnimationsModule],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [
    ComponentWithChildViewContainer,
    ComponentWithTemplateRef,
    PizzaMsg,
    ContentElementDialog,
    DialogWithInjectedData,
    DialogWithoutFocusableElements,
  ],
})
class DialogTestModule {}
// import { Spectator, createComponentFactory } from '@ngneat/spectator';

// import { DialogComponent } from './dialog.component';

// describe('DialogComponent', () => {
//   let spectator: Spectator<DialogComponent>;
//   const createComponent = createComponentFactory(DialogComponent);

//   it('should create', () => {
//     spectator = createComponent();

//     expect(spectator.component).toBeTruthy();
//   });
// });

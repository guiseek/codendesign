import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { CdkTableModule } from '@angular/cdk/table';
import { async, TestBed } from '@angular/core/testing';

import { CodeTableComponent } from './table.component';
import { CODE_DECLARATIONS } from './table.module';

describe('CodeTableComponent', () => {
  let component: Spectator<CodeTableComponent<any>>;
  const createComponent = createComponentFactory({
    component: CodeTableComponent,
    imports: [CdkTableModule],
    declarations: [CODE_DECLARATIONS]
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CdkTableModule],
      declarations: [CodeTableComponent],
    }).compileComponents();
  }));

  beforeEach(() => component = createComponent());

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

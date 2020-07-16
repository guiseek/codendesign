import { CodeAccordionModule } from '@cnd/code/components';
import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemosComponent } from './demos.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterTestingModule } from '@angular/router/testing';

describe('DemosComponent', () => {
  let component: DemosComponent;
  let fixture: ComponentFixture<DemosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DemosComponent],
      imports: [
        CommonModule,
        MatButtonModule,
        MatDividerModule,
        CodeAccordionModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { DocsRoutingModule } from './docs-routing.module';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsComponent } from './docs.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('DocsComponent', () => {
  let component: DocsComponent;
  let fixture: ComponentFixture<DocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ScullyLibModule],
      declarations: [ DocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

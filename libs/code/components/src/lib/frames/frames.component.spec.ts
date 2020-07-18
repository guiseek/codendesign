import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { FramesComponent } from './frames.component';

describe('FramesComponent', () => {
  let component: FramesComponent;
  let fixture: ComponentFixture<FramesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FramesComponent ],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FramesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
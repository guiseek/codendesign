import { CodeUploadItemComponent } from './upload-item/upload-item.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CodeUploadComponent } from './upload.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

describe('CodeUploadComponent', () => {
  let component: CodeUploadComponent;
  let fixture: ComponentFixture<CodeUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CodeUploadComponent, CodeUploadItemComponent],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatProgressBarModule
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

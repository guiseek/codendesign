import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'pocs-elements'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('pocs-elements');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'Welcome to pocs-elements!'
    );
  });
});



// import { Component } from '@angular/core';
// import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

// import { CodeUploadItemComponent } from './upload-item.component';
// import { MatProgressBarModule } from '@angular/material/progress-bar';

// @Component({ template: '' })
// class CustomHostComponent {
//   file = new File([], 'file1.svg', {
//     type: 'image/svg+xml',
//     lastModified: new Date().getTime(),
//   });
// }

// describe('CodeUploadItemComponent', () => {
//   let host: SpectatorHost<CodeUploadItemComponent, CustomHostComponent>;
//   const createHost = createHostFactory({
//     component: CodeUploadItemComponent,
//     host: CustomHostComponent,
//     imports: [MatProgressBarModule]
//   });

//   it('should display the host component title', () => {
//     host = createHost(`<cnd-upload-item [file]="file"></cnd-upload-item>`);
//     expect(host.component.file.type).toBe('image/svg+xml');
//   });
// });

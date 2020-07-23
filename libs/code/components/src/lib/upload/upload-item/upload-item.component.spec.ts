import { Component } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { CodeUploadItemComponent } from './upload-item.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({ template: '' })
class CustomHostComponent {
  file = new File([], 'file1.svg', {
    type: 'image/svg+xml',
    lastModified: new Date().getTime(),
  });
}

describe('CodeUploadItemComponent', () => {
  let host: SpectatorHost<CodeUploadItemComponent, CustomHostComponent>;
  const createHost = createHostFactory({
    component: CodeUploadItemComponent,
    host: CustomHostComponent,
    imports: [MatProgressBarModule]
  });

  it('should display the host component title', () => {
    host = createHost(`<cnd-upload-item [file]="file"></cnd-upload-item>`);
    expect(host.component.file.type).toBe('image/svg+xml');
  });
});

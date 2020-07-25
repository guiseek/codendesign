import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';

import { UploadDropzoneDirective } from './upload-dropzone.directive';

describe('UploadDropzoneDirective ', () => {
  let spectator: SpectatorDirective<UploadDropzoneDirective>;
  const createDirective = createDirectiveFactory(UploadDropzoneDirective);

  beforeEach(() => spectator = createDirective(`<div cndUploadDropzone>Testing UploadDropzoneDirective</div>`));

  it('should call the onDrop method when dropping files', async () => {
    spyOn(spectator.directive, 'onDrop');
    spectator.dispatchMouseEvent(spectator.element, 'drop');
    expect(spectator.directive.onDrop).toHaveBeenCalled();
  });
  it('should call the onDragOver method when hovering over the mouse', async () => {
    spyOn(spectator.directive, 'onDragOver');
    spectator.dispatchMouseEvent(spectator.element, 'dragover');
    expect(spectator.directive.onDragOver).toHaveBeenCalled();
  });
  it('must call the onDragLeave method when removing the mouse from above', async () => {
    spyOn(spectator.directive, 'onDragLeave');
    spectator.dispatchMouseEvent(spectator.element, 'dragleave');
    expect(spectator.directive.onDragLeave).toHaveBeenCalled();
  });
});

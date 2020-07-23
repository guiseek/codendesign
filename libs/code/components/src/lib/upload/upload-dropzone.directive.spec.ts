import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';

import { UploadDropzoneDirective } from './upload-dropzone.directive';

describe('UploadDropzoneDirective ', () => {
  let spectator: SpectatorDirective<UploadDropzoneDirective>;
  const createDirective = createDirectiveFactory(UploadDropzoneDirective);

  it('should change the background color', () => {
    spectator = createDirective(`<div highlight>Testing UploadDropzoneDirective</div>`);

    spectator.dispatchMouseEvent(spectator.element, 'mouseover');

    expect(spectator.element).toHaveStyle({
      backgroundColor: 'rgba(0,0,0, 0.1)'
    });

    spectator.dispatchMouseEvent(spectator.element, 'mouseout');
    expect(spectator.element).toHaveStyle({
      backgroundColor: '#fff'
    });
  });

});

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { HttpClient, HttpEventType, HttpUploadProgressEvent } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { UploadService } from './upload.service';
import { skipWhile } from 'rxjs/operators';

const file = new File([], 'file1.svg', {
  type: 'image/svg+xml',
  lastModified: new Date().getTime(),
});

type DoneFn = () => {};

describe('UploadService', () => {
  const mockHttp = {
    post: jest.fn()
  };
  let httpTestingController: HttpTestingController;
  let service: UploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HttpClient, useValue: mockHttp }
      ]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UploadService);
    service.url = 'http://localhost/upload';
  });

  // it('should...', () => {
  //   expect(service).toBeTruthy();
  // });

  it('#upload should report the progress of the file upload', async (done: DoneFn) => {
    // Prepare our mocked service to return an HttpProgressEvent event of type UploadProgress
    mockHttp.post.mockReturnValue(
      of({ type: HttpEventType.UploadProgress, loaded: 7, total: 10 } as HttpUploadProgressEvent)
    );

    // Trigger the file upload and subscribe for results
    service.upload(file).pipe(
      // Discard the first response
      skipWhile((progress: number) => progress === 0)
    ).subscribe(
      (progress: number) => {
        // Define what we expect after receiving a progress response
        expect(progress).toEqual(70);
        done();
      }
    );

    // const req = httpTestingController.expectOne(service.url);
    // expect(req.request.method).toEqual('POST');
    // // Respond with a mocked UploadProgress HttpEvent
    // req.event({ type: HttpEventType.UploadProgress, loaded: 7, total: 10 });

  });
});

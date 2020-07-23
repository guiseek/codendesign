import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpEventType, HttpUploadProgressEvent } from '@angular/common/http';

export function uploadProgress() {
  return (src: Observable<HttpUploadProgressEvent>) => {
    return src.pipe(
      filter((event) => event.type === HttpEventType.UploadProgress),
      map((event) => Math.round(100 * event.loaded) / event.total)
    );
  };
}

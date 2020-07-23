import { BehaviorSubject } from 'rxjs';
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpResponse,
  HttpEvent,
  HttpUploadProgressEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  public url: string;

  constructor(private http: HttpClient) {}

  public upload(file: File) {
    const progress = new BehaviorSubject<number>(0);

    this.http
      .post(this.url, file, {
        reportProgress: true,
      })
      .subscribe((event: HttpUploadProgressEvent) => {
        if (event.type === HttpEventType.UploadProgress) {
          progress.next(Math.round(100 * event.loaded) / event.total);
        } else if (event instanceof HttpResponse) {
          progress.next(100);
          progress.complete();
        }
      });

    return progress.asObservable();
  }
}

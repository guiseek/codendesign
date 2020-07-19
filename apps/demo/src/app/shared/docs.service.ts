import { Observable } from 'rxjs';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DocsService {
  constructor(private scully: ScullyRoutesService) {}
  components(published = true): Observable<ScullyRoute[]> {
    return this.scully.available$.pipe(
      map((routes) =>
        routes
          .filter((c) => c.published === published)
          .filter((c) => c.route.indexOf('/docs') === 0)
      )
    );
  }
}

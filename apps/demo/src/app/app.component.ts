import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CodeTableDataSource } from '@cnd/code/components';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';




export interface PeriodicElement {
  name: string;
  position: number;
  symbol: string;
  weight: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'cnd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Code \'N Design';

  panels = [1,2,3,4,5];

  displayedColumns: string[] = ['select','position', 'name', 'weight', 'symbol'];
  dataSource: CodeTableDataSource<PeriodicElement>;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
  });
  navigation$: Observable<ScullyRoute[]>;
  constructor(
    private scully: ScullyRoutesService
  ) {
    this.navigation$ = this.scully.available$.pipe(
      map((allComponents) => {
        return allComponents.filter(c => c.route.indexOf('/docs') === 0)
      })
    );
    this.dataSource = new CodeTableDataSource(ELEMENT_DATA);
  }
  ngOnInit() {

  }
}

import { Component } from '@angular/core';
import { ObservableArray } from '@grapecity/wijmo';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { getData } from './data';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  data = getData(5);
  data2 = getData(15);
  colData: Observable<any[]>;

  InitcolData: Observable<any[]> = of([
    { id: 0, header: `header ${0}`, binding: 'value', value: 1 },
    { id: 1, header: `header ${1}`, binding: 'value', value: 1 },
    { id: 2, header: `header ${2}`, binding: 'value', value: 1 },
  ]);

  addColumnSubject = new BehaviorSubject<any>(null);

  constructor() {
    // other processes handles addColumnSubject.asObservable()
    // retruns colData[] => a bit like that:

    this.colData = combineLatest([
      this.InitcolData,
      this.addColumnSubject.asObservable(),
    ]).pipe(
      map(([colData, newly]) => {
        const alreadyAdded = colData.findIndex((col) => col.id === newly?.id);
        if (newly !== null && alreadyAdded === -1) {
          colData.push(newly);
        }
        return colData;
      })
    );
  }

  onAdd() {
    const newOne = getData(1)[0];
    newOne.No = this.data.length;

    this.data.push(newOne);
    // this.flex.collectionView.refresh();
    console.log('onADD', this.data);
  }

  onAddColumn() {
    const id = parseInt((Math.random() * 1000).toString());
    const newOne = {
      id: id,
      header: `header ${id}`,
      binding: 'value',
      value: 1,
    };
    this.addColumnSubject.next(newOne);
  }

  onDeleteColumn() {}
}

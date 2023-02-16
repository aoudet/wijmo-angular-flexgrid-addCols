import { Directive, OnInit } from '@angular/core';
import { CollectionView, DataType } from '@grapecity/wijmo';
import { Column, FlexGrid } from '@grapecity/wijmo.grid';
import { last, map, tap } from 'rxjs/operators';
import { TestComponent } from '../test/test.component';

@Directive({
  selector: '[appAddCols]',
})
export class AddColumns implements OnInit {
  private startIndex_colData = 7; // this is fix 2/2 only for initial load 

  constructor(private host: TestComponent) {
    const keepOldInit = this.host.wjFlexInitialized;

    this.host.wjFlexInitialized = (flex: FlexGrid) => {
      //make sure previous initializations are avialables
      keepOldInit.bind(this.host)(flex);

      flex.columns.insert(
        0,
        new Column({
          binding: 'cnt',
          width: '*',
          dataType: DataType.Number,
          header: 'Nbr',
        })
      );

      flex.columns.insert(
        flex.columns.length - 1,
        new Column({
          binding: 'commentaires',
          width: '*',
          header: 'comments',
        })
      );

      // this is fix 2/2 here after initial load 
      this.startIndex_colData = 8;
    };
  }

  ngOnInit(): void {
    this.host.colData = this.host.colData.pipe(
      //so here is your original answer ( mapped to target host's viewChild )
      //same issue as before (index) beacause we loose info of "new"

      tap((colData) => {
        console.log('In directive with data', [colData]);

        //this is the actual fix 1/2 
        const sorted = [
          ...this.host.flex.columns.sort(
            (x, y) => x.visibleIndex - y.visibleIndex
          ),
        ];
        this.host.flex.columns.clear();
        sorted.forEach((x) => this.host.flex.columns.push(x));
        //fix 1/2

        setTimeout(() => {
          colData.forEach((col, idx) => {
            let lastColIndex = this.startIndex_colData + idx; // here is the 2nd part needed

            // get the new column index
            let newColIndex = this.host.flex.columns.findIndex(
              (c) => c.header === col.header
            );
            // remove the column from previous index and insert at the required index
            let column: any = this.host.flex.columns.splice(newColIndex, 1);

            // 2 choices to do same result 
            // this.host.flex.columns.splice(lastColIndex, 0, column[0]);
            this.host.flex.columns.insert(lastColIndex - 1, column[0]);
          });

          this.host.flex.collectionView.refresh();
        });
      })
    );
  }
}

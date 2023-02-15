import { Directive, OnInit } from '@angular/core';
import { DataType } from '@grapecity/wijmo';
import { Column, FlexGrid } from '@grapecity/wijmo.grid';
import { last, map, tap } from 'rxjs/operators';
import { TestComponent } from '../test/test.component';

@Directive({
  selector: '[appAddCols]',
})
export class AddColumns implements OnInit {
  // private startIndex_colData = 6;

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
        new Column({ binding: 'commentaires', width: '*', header: 'comments' })
      );
    };
  }

  ngOnInit(): void {
    this.host.colData = this.host.colData.pipe(
      //so here is your original answer ( mapped to target host's viewChild )
      //same issue as before (index) beacause we loose info of "new"

      tap((colData) => {
        console.log('In directive with data', colData);

        setTimeout(() => {
          let startIndex_colData = this.host.flex.columns.findIndex(
            (x) => x.binding === null
          );
          colData.forEach((col, idx) => {
            let lastColIndex = startIndex_colData - (colData.length - 1 - idx);

            // get the new column index
            let newColIndex = this.host.flex.columns.findIndex(
              (c) => c.header === col.header
            );
            // remove the column from previous index and insert at the required index
            let column: any = this.host.flex.columns.splice(newColIndex, 1);

            // this.host.flex.columns.splice(lastColIndex, 0, column[0]);
            this.host.flex.columns.insert(lastColIndex - 1, column[0]);            
          });
          
          // make sure commentaire is just before delete (by default) 
          let commentCol = this.host.flex.columns.findIndex(x => x.binding === "commentaires");
          if(commentCol !== -1) {
            this.host.flex.columns.moveElement(commentCol,this.host.flex.columns.length -2);
          }
        });
        this.host.flex.collectionView.refresh();
      })
    );
  }
}

import { Directive } from '@angular/core';
import { DataType } from '@grapecity/wijmo';
import { Column, FlexGrid } from '@grapecity/wijmo.grid';
import { TestComponent } from '../test/test.component';

@Directive({
  selector: '[appAddCols]',
})
export class AddColumns {
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
}

import { Component, ViewChild } from '@angular/core';
import { FlexGrid, SelectionMode } from '@grapecity/wijmo.grid';

import { getData } from '../data';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent {
  @ViewChild('flex', { static: true }) flex: FlexGrid;

  data: any[];
  colData: any[];

  constructor() {
    this.data = getData(5);
    this.colData = [
      { id: 0, header: `header ${0}`, binding: 'value', value: 1 },
      { id: 1, header: `header ${1}`, binding: 'value', value: 1 },
      { id: 2, header: `header ${2}`, binding: 'value', value: 1 }
    ];
  }

  wjFlexInitialized(flex: FlexGrid) {
    flex.selectionMode = SelectionMode.MultiRange;

    //code to set up event hadlers... not really relevant but needed

    const panel = flex.columnHeaders;
    panel.rows[0].allowMerging = true;
  }

  onAdd() {
    const newOne = getData(1)[0];
    newOne.No = this.data.length;

    this.data.push(newOne);
    this.flex.collectionView.refresh();
    console.log('onADD', this.data);
  }

  onAddColumn() {
    const newCol = {
      id: this.colData.length,
      header: `header ${this.colData.length}`,
      binding: 'value',
      value: 1,
    };
    this.colData.push(newCol);
    this.flex.collectionView.refresh();
  }

  onDeleteColumn() {
  }


  onDelete(item: any) {
    const idx = this.data.findIndex((x) => x === item);
    this.data.splice(idx, 1);
    this.flex.collectionView.refresh();
  }
}

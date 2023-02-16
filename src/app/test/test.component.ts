import { Component, Input, ViewChild } from '@angular/core';
import { FlexGrid, SelectionMode } from '@grapecity/wijmo.grid';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent {
  @ViewChild('flex', { static: true }) flex: FlexGrid;

  @Input() data: any[] = [];
  @Input() colData: Observable<any[]> = of([]);

  constructor() {}

  wjFlexInitialized(flex: FlexGrid) {
    flex.selectionMode = SelectionMode.MultiRange;

    //code to set up event hadlers... not really relevant but needed

    const panel = flex.columnHeaders;
    panel.rows[0].allowMerging = true;
  }

  onDelete(item: any) {
    const idx = this.data.findIndex((x) => x === item);
    this.data.splice(idx, 1);
    this.flex.collectionView.refresh();
  }
}

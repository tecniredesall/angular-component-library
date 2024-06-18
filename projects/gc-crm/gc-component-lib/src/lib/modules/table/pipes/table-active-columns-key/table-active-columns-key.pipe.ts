import { Pipe, PipeTransform } from '@angular/core';
import { ITableColumnCheckboxConfig } from '../../models/table/table-column-checkbox-config.model';
import { GCCLITableColumn } from '../../../../shared/models/table/table-column.model';
import { EGCCLTableColumnShow } from '../../../../shared/types/table/table-column-show.type';

@Pipe({
  name: 'tableActiveColumnsKey',
})
export class TableActiveColumnsKeyPipe implements PipeTransform {
  transform(
    columns: GCCLITableColumn[],
    includeItemsSelection: ITableColumnCheckboxConfig,
    includeActions: boolean
  ): string[] {
    let cols = columns
      .filter((column) => column.show === EGCCLTableColumnShow.Default)
      .map((column) => column.key);

    if (includeActions) {
      cols = [...cols, ...['actions']];
    }

    if (includeItemsSelection?.status) {
      cols =
        'first' === includeItemsSelection?.position
          ? [...['selected'], ...cols]
          : [...cols, ...['selected']];
    }

    return cols;
  }
}

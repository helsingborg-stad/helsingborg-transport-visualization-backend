/* eslint-disable no-param-reassign -- worksheets are passed by reference */
/* eslint-disable class-methods-use-this */
import { WorkBook, WorkSheet, utils } from 'xlsx';

export interface IFileOptions {
  headerRow: number;
  dataRangeStart: number;
}

export class ExcelFileWriter {
  public workBook: WorkBook = null;

  constructor(existingWorkBook?: WorkBook) {
    this.workBook = existingWorkBook ?? utils.book_new();
  }

  public addSheetsToWorkBook({ sheets }: {
    sheets: {
      workSheet: WorkSheet,
      name: string,
    }[] }) {
    sheets.forEach((sheet) => {
      utils.book_append_sheet(this.workBook, sheet.workSheet, sheet.name);
    });
    return this.workBook;
  }

  public addRowsToSheet({ workSheet, values, origin }: {
    workSheet: WorkSheet,
    values: (undefined | null | string | Date | number | Object)[][],
    origin: string
  }) {
    utils.sheet_add_aoa(workSheet, values, { origin });
  }

  public addObjectToSheet({ objects, origin }: {
    objects: Object[],
    origin: string,
  }) {
    return utils.json_to_sheet(objects, {
      cellDates: true,
      origin,
      skipHeader: true,
    });
  }

  public setColumProperties({ workSheet, columnIndex, properties }: {
    workSheet: WorkSheet,
    columnIndex: number,
    properties: {
      widthPx?: number,
      hidden?: boolean,
    }
  }) {
    this.ensureExist({ workSheet, index: columnIndex, type: 'cols' });
    workSheet['!cols'][columnIndex] = { wpx: properties.widthPx, hidden: properties.hidden };
  }

  public setRowProperties({ workSheet, rowIndex, properties }: {
    workSheet: WorkSheet,
    rowIndex: number,
    properties: {
      hidden?: boolean,
    }
  }) {
    this.ensureExist({ workSheet, index: rowIndex, type: 'rows' });
    workSheet['!rows'][rowIndex] = { hidden: properties.hidden };
  }

  ensureExist({ workSheet, index, type }: { workSheet: WorkSheet, index?: number, type: 'rows' | 'cols' }) {
    const accessor = type === 'rows' ? '!rows' : '!cols';
    if (!workSheet[accessor]) {
      workSheet[accessor] = [];
    }
    if (!workSheet[accessor][index]) {
      workSheet[accessor][index] = { };
    }
  }
}

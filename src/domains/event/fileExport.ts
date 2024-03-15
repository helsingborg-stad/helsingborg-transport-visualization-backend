import { WorkSheet, WorkBook } from 'xlsx';
import { ExcelFileWriter } from '@root/services/excel';
import { EventResponseType } from '@root/entities';
import { flattenObject } from '@root/utils/flattenObject';

export class FileExport {

  private dataSheet: WorkSheet = null;

  private exportFields: string[] = null;

  private mappedFields = {
    sessionId: 'Session ID',
    deviceId: 'Device ID',
    os: 'OS',
    zoneType: 'Zone Type',
    address: 'Address',
    name: 'Name',
    area: 'Area',
    zoneId: 'Zone ID',
    enteredAt: 'Entered At',
    exitedAt: 'Exited At',
    createdAt: 'Created At',
    ["organisation.name"]: 'Organisation',
    ["distributionOrganisation.name"]: 'Distribution Organisation',
  }

  constructor(private excelFileWriter = new ExcelFileWriter()) {}

    public setExportFields(fields: string[]) {
        this.exportFields = fields;
    }

    public setDataSheet(sheet: WorkSheet) {
        this.dataSheet = sheet;
    }

    public async exportEventsToExcel(events: EventResponseType[]): Promise<WorkBook> {
        //flatten the object
        const data = events.map((event) => this.exportFields.map((field) => {
            const val = flattenObject(event)[field];
            return val instanceof Date ? val.toISOString() : val
        }));

        this.setDataSheet(this.excelFileWriter.addObjectToSheet({
            objects: data,
            origin: 'A1',
        }));

        //make all column widths 40px
        this.exportFields.forEach((_field, index) => {
            this.excelFileWriter.setColumProperties({
                workSheet: this.dataSheet,
                columnIndex: index,
                properties: {
                    widthPx: 120,
                },
            });
        });
        //make first row 300px
        this.excelFileWriter.setColumProperties({
            workSheet: this.dataSheet,
            columnIndex: 0,
            properties: {
                widthPx: 300,
            },
        });

        this.excelFileWriter.addRowsToSheet({
            workSheet: this.dataSheet,
            values: [this.exportFields.map((field) => this.mappedFields[field]), ...data],
            origin: 'A1',
        });

        const workBook = this.excelFileWriter.addSheetsToWorkBook({
            sheets: [
                { workSheet: this.dataSheet, name: 'Data' },
            ],
        });
        return workBook;
    }
}
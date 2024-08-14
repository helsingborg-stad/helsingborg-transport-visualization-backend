import StatusError from '@root/utils/statusError';
import XLSX from 'xlsx';

export interface IFileReadOptions {
    headerRow: number;
    dataRangeStart: number;
    /** Note: exposes underlying behaviour from library, use with caution! (the excel lib might change!) */
    xlsxReadOptions?: Partial<XLSX.ParsingOptions>;
}

/**
 * If file is specified, tries to read that from Buffer.
 * If fileOptions.readSheet is specified (index or name), tries to read that sheet on which the other methods operate on.
 */
export class ExcelFileReader {
    private file: XLSX.WorkBook = null;

    private currentWorkSheet: XLSX.WorkSheet = null;

    private fileOptions: IFileReadOptions = {
        headerRow: 0,
        dataRangeStart: 0,
    };

    constructor({ fileBuffer, fileOptions }: { fileBuffer?: Buffer, fileOptions?: IFileReadOptions }) {
        if (fileOptions) {
            this.fileOptions = fileOptions;
        }
        if (fileBuffer) {
            this.readFile(fileBuffer);
        }
    }

    readFile(fileBuffer: Buffer) {
        try {
            this.file = XLSX.read(fileBuffer, {
                type: 'buffer',
                cellFormula: false,
                cellHTML: false,
                cellNF: false,
                cellText: false,
                cellDates: false,
                sheets: 0,
                raw: true,
                xlfn: false,
                dense: false, // default. TODO: look into parsing the header/object definition with a sparse array.
                ...this.fileOptions.xlsxReadOptions,
            });
            if (this.currentWorkSheet === null) {
                this.currentWorkSheet = this.file.Sheets[this.file.Workbook.Sheets[0].name];
            }
        } catch (error) {
            console.error(error, 'Could not read excel file.');
            throw new StatusError(400, error);
        }
    }

    getHeader() {
        const lastHeaderCell = this.getEndCell().replace(/\d+/g, `${this.fileOptions.headerRow}`);
        const headerDefinition: any[][] = XLSX
            .utils.sheet_to_json(this.currentWorkSheet, { range: `A${this.fileOptions.headerRow}:${lastHeaderCell}`, defval: null, header: 'A' });
        return headerDefinition[0] ? Object.values(headerDefinition[0]) : [];
    }

    private getEndCell() {
        return this.currentWorkSheet['!ref'].split(':')[1];
    }

    private getRowCount() {
        return Number.parseInt(this.getEndCell().replace(/[a-zA-Z]/g, ''), 10);
    }

    getDataStartOffset() {
        return this.fileOptions.dataRangeStart;
    }

    getObjectCount() {
        return this.getRowCount() - this.fileOptions.headerRow;
    }

    getRows() {
        const data = [];
        const sheets = this.file.SheetNames;

        for (let i = 0; i < sheets.length; i++) {
            const sheet = this.file.Sheets[sheets[i]];
            data.push(XLSX.utils.sheet_to_json(sheet, { defval: null }));
        }

        return data;
    }

    getRange<T>(row: number, rowEnd: number): T[] {
        const excelDataRowStart = row + this.fileOptions.dataRangeStart;
        const excelDataRowEnd = rowEnd + this.fileOptions.dataRangeStart;

        const startRange = `A${excelDataRowStart}`;
        const endRange = this.getEndCell().replace(/\d+/g, `${excelDataRowEnd}`);

        const headers = this.getHeader();
        const data: T[] = XLSX.utils.sheet_to_json(this.currentWorkSheet, { range: `${startRange}:${endRange}`, defval: null, header: headers });

        return data as T[];
    }
}

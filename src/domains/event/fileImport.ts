import { ExcelFileReader, IFileReadOptions } from '@root/services/excel';
import StatusError from '@root/utils/statusError';


type TRow = {
    orgNumber: string,
    sessionId: string,
    gln: string,
    time: string,
}

export class FileImport {
    private excelFileReader: ExcelFileReader;
    private keyMap: Record<string, string> = {
        ['Orgnr']: 'orgNumber',
        ['Leverans med']: 'sessionId',
        ['Till enhet']: 'gln',
        ['Tidpunkt']: 'time',
    }

    constructor(fileBuffer: Buffer, fileOptions: IFileReadOptions) {
        this.excelFileReader = new ExcelFileReader({ fileBuffer, fileOptions });
    }

    async getRows(): Promise<TRow[]> {
        if (!this.excelFileReader) {
            throw new StatusError(400, 'Excel file not read');
        }
        const rows = this.excelFileReader.getRows();
        const headers = this.excelFileReader.getHeader();
        const missingHeaders = Object.keys(this.keyMap).filter((key) => !headers.includes(key));
        
        
        if (missingHeaders.length > 0) {
            throw new StatusError(400, `Saknar kolumner: ${missingHeaders.join(', ')}`);
        }
        return rows[0].map((row) => {
            const newRow = {};
            Object.keys(row).forEach((key) => {
                newRow[this.keyMap[key]] = row[key];
            });
            return newRow;
        });
    }
}
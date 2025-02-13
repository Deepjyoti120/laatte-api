import * as XLSX from 'xlsx';
export class ExcelController {
    static getMergedCells(sheet) {
        const mergedCells = [];
        if (sheet['!merges']) {
            sheet['!merges'].forEach(merge => {
                if (merge.e.r > merge.s.r) {
                    for (let row = merge.s.r + 1; row <= merge.e.r; row++) {
                        mergedCells.push({
                            row, col: merge.s.c, 
                            value: sheet[XLSX.utils.encode_cell({ r: row, c: merge.s.c })]?.v,
                            employeeID: sheet[XLSX.utils.encode_cell({ r: row, c: 2 })]?.v,
                        });
                    }
                }
                if (merge.e.c > merge.s.c) {
                    for (let col = merge.s.c + 1; col <= merge.e.c; col++) {
                        mergedCells.push({
                            row: merge.s.r, col, 
                            value: sheet[XLSX.utils.encode_cell({ r: merge.s.r, c: col })]?.v,
                            employeeID: sheet[XLSX.utils.encode_cell({ r: merge.s.r, c: 2 })]?.v,
                        });
                    }
                }
            });
        }
        return mergedCells;
    }
}
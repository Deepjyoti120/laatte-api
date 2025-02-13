import * as XLSX from "xlsx";
import { ApiAccess } from "../../services/ApiAccess";
import { ExcelController } from "../../controllers/excelController";

export class ExcelRead {
  // static readExcelFile(req, res, next) {
  //     return new Promise(async (resolve, reject) => {
  //         try {
  //             let excelLink = await ApiAccess.getExelFromLink(req.body.excelLink);
  //             let workbook = XLSX.readFile(excelLink);
  //             let sheet_name_list = workbook.SheetNames;
  //             let data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  //             res.json(data);
  //             resolve(data);
  //         } catch (err) {
  //             reject(err.message);
  //         }
  //     });
  // }
  static readExcelFile(req, res, next) {
    return new Promise(async (resolve, reject) => {
      try {
        let excelLink = await ApiAccess.getExelFromLink(req.body.excelLink);
        let workbook = XLSX.readFile(excelLink);
        let sheet_name_list = workbook.SheetNames;
        let sheet = workbook.Sheets[sheet_name_list[0]];
        let mergedCells = ExcelController.getMergedCells(sheet);
        if (mergedCells.length > 0) {
          res.status(400).json({
            error: "Merged cells found in Excel file",
            details: mergedCells,
          });
          reject("Merged cells found in Excel file");
        } else {
          let data = XLSX.utils.sheet_to_json(sheet);
          res.json(data);
          resolve(data);
        }
      } catch (err) {
        reject(err.message);
      }
    });
  }
  // readExcelFile make it for dot net core from node js
}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {SheetCell} from "./sheet";

@Injectable({
  providedIn: 'root'
})
export class SheetService {

  constructor(private http: HttpClient) { }
  getSheetCells(): SheetCell[]{
    let sheetCells: SheetCell[] = []
    const sheetId="102178305"
    const docId = "12HXORIpjx0bgox8t3VAxe5mMCIW-doqprdv6_AWDesg"
    const url = `https://docs.google.com/spreadsheets/d/${docId}/gviz/tq?tqx=out:json${sheetId}`;

    this.http.get(url, {
      responseType: 'text',
    }).subscribe((response: string): void => {
      const rawJSONText = response.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\)/); // strip the header response
      if (rawJSONText) {
        const json = JSON.parse(rawJSONText[1]);
        json.table.rows.forEach((row: any)=>{
          let sheetCell = SheetCell.sheetFromRecord(row.c)
          sheetCells.push(sheetCell)
        })
      }
    });
    return sheetCells
  }
}

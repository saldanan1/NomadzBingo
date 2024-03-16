import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {SheetCell} from "./sheet";

@Injectable({
  providedIn: 'root'
})
export class SheetService {

  constructor(private http: HttpClient) { }
  getCooker(){
    const sheetId="102178305"
    const docId = "12HXORIpjx0bgox8t3VAxe5mMCIW-doqprdv6_AWDesg"
    const url = `https://docs.google.com/spreadsheets/d/${docId}/gviz/tq?tqx=out:json${sheetId}`;

    this.http.get(url, {
      responseType: 'text',
    }).subscribe((response: string): void => {
      console.log(response);
      const rawJSONText = response.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\)/); // strip the header response
      console.log(rawJSONText)
      if (rawJSONText) {
        const json = JSON.parse(rawJSONText[1]);
        console.log(json.table)
        console.log(json.table.rows);
        let sheetCell = SheetCell.sheetFromRecord(json.table.rows)
      }
    });
  }

  data: any = null;
  getSheetData(): Observable<any> {
    const sheetId = '2PACX-1vRgNyEcdjzeiDA6wOL_rxqXgOTk_4EsSfzRfsjABICiCmPFcdOBxu5lFjJHo8BmRwBKS-wnINjS0lW-';
    const url = `https://spreadsheets.google.com/feeds/list/${sheetId}/od6/public/values?alt=json`;
    return this.http.get(url)
      .pipe(
        map((res: any) => {
          const data = res.feed.entry;

          const returnArray: Array<any> = [];
          if (data && data.length > 0) {
            data.forEach((entry:any )=> {
              const obj = {};
              for (const x in entry) {
                if (x.includes('gsx$') && entry[x].$t) {
                  // @ts-ignore
                  obj[x.split('$')[1]] = entry[x]['$t'];
                }
              }
              returnArray.push(obj);
            });
          }
          return returnArray;
        })
      );
  }
}

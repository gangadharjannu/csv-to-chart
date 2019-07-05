import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvparserService {

  CSVToObj(CSVString: string): object {
    const labels = new Set();
    const datasets = CSVString
      .split(/\r\n|\n/)
      .map(rows => {
        const cols = rows.split(',');
        return {
          label: cols[0],
          data: cols.slice(1).map(dataCols => {
            const obj = dataCols.split('|');
            labels.add(obj[0]);
            return { x: obj[0], y: obj[1] };
          }),
          borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16)
        };
      });
    return { labels: Array.from(labels).sort(), datasets };
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public chartData;
  fileInput(files: FileList): void {
    this.readFile(files[0]).then(success => {
      this.chartData = this.CSVToObj(success);
    }, error => {
      console.log(error);
    });
  }

  readFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result.toString());
      };
      reader.onerror = (event) => {
        reject(reader.error);
      };
      reader.readAsText(file);
    });
  }

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

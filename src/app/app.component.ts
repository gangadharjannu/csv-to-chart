import { Component } from '@angular/core';
import { CsvparserService } from './csvparser.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public chartData;

  constructor(private csvparserService: CsvparserService) { }

  fileInput(files: FileList): void {
    this.readFile(files[0]).then(success => {
      this.chartData = this.csvparserService.CSVToObj(success);
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
}

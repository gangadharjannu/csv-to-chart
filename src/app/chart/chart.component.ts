import { Component, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  private ctx;
  private labels: Array<string>;
  private datasets;
  public chart: Chart;

  @ViewChild('canvas', { static: true }) private canvas;

  @Input() set dataObj(chartObj) {
    console.log(chartObj);
    if (chartObj) {
      // tslint:disable-next-line:no-unused-expression
      this.chart && this.chart.destroy();
      this.labels = chartObj.labels;
      this.datasets = chartObj.datasets.slice(0);
      this.drawChart();
    }
  }

  constructor(private cdr: ChangeDetectorRef) { }

  drawChart() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.chart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: this.datasets
      }
    });
  }
}

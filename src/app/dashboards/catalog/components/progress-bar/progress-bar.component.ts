import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {
  value = 0;
  total = 100;
  constructor() {}

  ngOnInit(): void {}

  calcPercent() {
    if (this.value === 0) return 0;
    return (this.value * 100) / this.total;
  }

  sum(): void {
    if (this.value < 100) {
      this.value++;
    }
  }

  rest(): void {
    if (this.value > 0) {
      this.value--;
    }
  }
}

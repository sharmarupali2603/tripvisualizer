import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip-visualizer',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './trip-visualizer.component.html',
  styleUrls: ['./trip-visualizer.component.css'],
})
export class TripVisualizerComponent {
  trips = [{ start: '', end: '' }];
  processedTrips: any[] = [];
  svgWidth = 1200;

  addTrip() {
    this.trips.push({ start: '', end: '' });
  }

  ngDoCheck() {
    this.updatePaths();
  }

  updatePaths() {
    const baseSpacing = 100;
    this.processedTrips = [];
    const yLevel1 = 80;
    const yLevel2 = 160;
    const totalTrips = this.trips.filter((t) => t.start && t.end).length;
    const spacing = Math.max(baseSpacing, 1000 / (totalTrips || 1));
    let x = 50;

    for (let i = 0; i < this.trips.length; i++) {
      const { start, end } = this.trips[i];
      if (!start || !end) continue;

      const from = start.trim().slice(0, 3).toUpperCase();
      const to = end.trim().slice(0, 3).toUpperCase();
      const label = `${from} - ${to}`;
      const color = this.getColor(i);
      const xNext = x + spacing;

      const isLoop = from === to;
      const prevEnd = i > 0 ? this.trips[i - 1].end.trim().toLowerCase() : null;
      const isContinued = prevEnd === start.trim().toLowerCase();

      if (isLoop) {
        const path = `M ${x} ${yLevel1}
                    C ${x + 30} ${yLevel1 - 60},
                      ${xNext - 30} ${yLevel2 + 60},
                      ${xNext} ${yLevel2}`;
        this.processedTrips.push({
          type: 'loop',
          path,
          label,
          color,
          labelX: x + 10,
          labelY: yLevel2 + 10,
        });
      } else if (isContinued) {
        this.processedTrips.push({
          type: 'continued',
          x1: x,
          y1: yLevel1,
          x2: xNext,
          y2: yLevel1,
          label,
          color,
          labelX: x + 10,
          labelY: yLevel1 + 20,
        });
      } else {
        const path = `M ${x} ${yLevel1} L ${xNext} ${yLevel1}`;
        this.processedTrips.push({
          type: 'arrow',
          path,
          label,
          color,
          labelX: x + 10,
          labelY: yLevel1 + 20,
        });
      }

      x = xNext;
    }

    this.svgWidth = x + spacing;
  }

  getColor(index: number): string {
    const colors = ['#6C63FF', '#00BFFF', '#FFA500', '#555', '#aa00aa', '#33cc33'];
    return colors[index % colors.length];
  }
}

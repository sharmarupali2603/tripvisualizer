import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TripVisualizerComponent } from './trip-visualizer/trip-visualizer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TripVisualizerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'trip-visualizer-app';
}

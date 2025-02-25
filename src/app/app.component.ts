import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TrainerComponent } from './components/trainer/trainer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TrainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lexico-trainer';
  currentYear: number = new Date().getFullYear();
}

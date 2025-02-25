import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { WordService } from '../../services/word.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-trainer',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './trainer.component.html',
  styleUrl: './trainer.component.css'
})
export class TrainerComponent {
  userInput = '';
  feedback = '';
  buttonText = 'Submit';
  showNext = false;
  
  @ViewChild('resetBtn', { static: false }) resetButton!: ElementRef;

  constructor(public wordService: WordService) {}

  ngOnInit(): void {
    this.wordService.getNewWord();
  }

  ngAfterViewInit(): void {
    // Initialize Bootstrap Tooltip
    new bootstrap.Tooltip(this.resetButton.nativeElement);
  }

  onSubmit(): void {
    if (this.buttonText === 'Submit') {
      const result = this.wordService.checkAnswer(this.userInput);
      if (result.correct) {
        this.feedback = 'Correct! Moving to the next word.';
        // Automatically load a new word:
        this.wordService.getNewWord();
        this.resetInput();
      } else {
        this.feedback = `Wrong! The correct answer is "${this.wordService.currentWord.word}".<br>${result.sampleSentence}`;
        this.buttonText = 'Next';
        this.showNext = true;
      }
    } else {
      // If button says "Next"
      this.wordService.getNewWord();
      this.resetInput();
      this.feedback = '';
      this.buttonText = 'Submit';
      this.showNext = false;
    }
  }

  resetInput(): void {
    this.userInput = '';
  }

  onReset(): void {
    this.wordService.resetGame();
    this.feedback = '';
    this.buttonText = 'Submit';
    this.userInput = '';
  }
}

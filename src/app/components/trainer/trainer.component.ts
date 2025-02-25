import { Component } from '@angular/core';
import { WordService } from '../../services/word.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trainer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './trainer.component.html',
  styleUrl: './trainer.component.css'
})
export class TrainerComponent {
  userInput = '';
  feedback = '';
  buttonText = 'Submit';
  showNext = false;
  
  constructor(public wordService: WordService) {}

  ngOnInit(): void {
    this.wordService.getNewWord();
    ///console.log(this.wordService.currentWord);
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

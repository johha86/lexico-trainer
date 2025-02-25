import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Word {
  word: string;
  meaning: string;
  example: string; // Added to match the new structure from JSON
}

@Injectable({
  providedIn: 'root'
})
export class WordService {
  private words: Word[] = [];
  private usedIndices = new Set<number>();
  public correctAnswers = 0;
  public totalAnswers = 0;
  public currentWord!: Word;

  constructor(private http: HttpClient) {
    this.loadWords();
  }

  // Load words from the assets/words.json file
   loadWords(): void {
    this.http.get<Word[]>('assets/words.json').subscribe(
      (data) => {
        this.words = data;
        this.getNewWord();
      },
      (error) => {
        console.error('Error loading words:', error);
      }
    );
  }

  getNewWord(): void {
    if (this.usedIndices.size >= this.words.length) {
      this.usedIndices.clear();
    }
    let index: number;
    do {
      index = Math.floor(Math.random() * this.words.length);
    } while (this.usedIndices.has(index));
    this.usedIndices.add(index);
    this.currentWord = this.words[index];
  }

  checkAnswer(userInput: string): { correct: boolean; sampleSentence?: string } {
    this.totalAnswers++;
    const isCorrect = userInput.trim().toLowerCase() === this.currentWord.word.toLowerCase();
    if (isCorrect) {
      this.correctAnswers++;
      return { correct: true };
    } else {
      // Use the example sentence from the current word object
      const sampleSentence = `For example: ${this.currentWord.example}`;
      return { correct: false, sampleSentence };
    }
  }

  resetGame(): void {
    this.usedIndices.clear();
    this.correctAnswers = 0;
    this.totalAnswers = 0;
    this.getNewWord();
  }

  getSuccessRate(): string {
    return this.totalAnswers > 0 ? ((this.correctAnswers / this.totalAnswers) * 100).toFixed(2) : '0.00';
  }
}

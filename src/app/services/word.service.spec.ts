import { TestBed } from '@angular/core/testing';
import { WordService, Word } from './word.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('WordService', () => {
  let service: WordService;
  let httpTestingController: HttpTestingController;

  const mockWords: Word[] = [
    { word: 'blurry', meaning: 'not clear', example: 'The picture was too <b>blurry</b> to recognize any faces.' },
    { word: 'cozy', meaning: 'comfortable', example: 'The small cabin felt very <b>cozy</b> in winter.' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WordService],
    });

    service = TestBed.inject(WordService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensures no outstanding HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load words from JSON file', () => {
    service.loadWords();

    const req = httpTestingController.expectOne('assets/words.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockWords); // Provide mock data

    expect(service['words'].length).toBe(2); // Ensure words are loaded
  });

  it('should get a new word', () => {
    service.loadWords();
    const req = httpTestingController.expectOne('assets/words.json');
    req.flush(mockWords); // Provide mock data

    service.getNewWord();
    expect(service.currentWord).toBeDefined();
    expect(mockWords).toContain(service.currentWord);
  });

  it('should check answer correctly', () => {
    service.loadWords();
    const req = httpTestingController.expectOne('assets/words.json');
    req.flush(mockWords); // Provide mock data

    service.currentWord = mockWords[0];

    expect(service.checkAnswer('blurry').correct).toBe(true);
    expect(service.checkAnswer('wrongword').correct).toBe(false);
    expect(service.checkAnswer('wrongword').sampleSentence).toContain('<b>blurry</b>');
  });

  it('should reset the game', () => {
    service.correctAnswers = 5;
    service.totalAnswers = 10;
    service.resetGame();

    expect(service.correctAnswers).toBe(0);
    expect(service.totalAnswers).toBe(0);
    expect(service['usedIndices'].size).toBe(0);
  });

  it('should calculate success rate correctly', () => {
    service.correctAnswers = 5;
    service.totalAnswers = 10;
    expect(service.getSuccessRate()).toBe('50.00');

    service.correctAnswers = 0;
    service.totalAnswers = 0;
    expect(service.getSuccessRate()).toBe('0.00');
  });
});

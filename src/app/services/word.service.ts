import { Injectable } from '@angular/core';

export interface Word {
  word: string;
  meaning: string;
  example: string; // Added to match the new structure from JSON
}

@Injectable({
  providedIn: 'root'
})
export class WordService {
  private usedIndices = new Set<number>();
  public correctAnswers = 0;
  public totalAnswers = 0;
  public currentWord!: Word;

  constructor() {
    this.getNewWord();
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

  private words: Word[] = [
    { "word": "blurry", "meaning": "not clear", "example": "The photo was so <strong>blurry</strong> that I couldn't see anything." },
    { "word": "cozy", "meaning": "comfortable", "example": "The room was so <strong>cozy</strong> that I didn't want to leave." },
    { "word": "rigorous", "meaning": "detailed or thorough", "example": "He gave a <strong>rigorous</strong> explanation of the process." },
    { "word": "rehearse", "meaning": "practice", "example": "She needed to <strong>rehearse</strong> her lines before the play." },
    { "word": "allege", "meaning": "blame", "example": "The police <strong>allege</strong> that the suspect was involved in the robbery." },
    { "word": "convict", "meaning": "criminal (noun) or criminally charging someone (verb)", "example": "The jury will <strong>convict</strong> the defendant if they find sufficient evidence." },
    { "word": "testify", "meaning": "to bear witness", "example": "She was called to <strong>testify</strong> in court about what she saw." },
    { "word": "verdict", "meaning": "final decision", "example": "The jury reached a <strong>verdict</strong> after deliberating for hours." },
    { "word": "adore", "meaning": "appreciate", "example": "I absolutely <strong>adore</strong> this new book I just bought." },
    { "word": "envy", "meaning": "be jealous of someone (verb)", "example": "She couldn't help but <strong>envy</strong> her friend's success." },
    { "word": "enthusiasm", "meaning": "eagerness", "example": "His <strong>enthusiasm</strong> for the project was contagious." },
    { "word": "brag", "meaning": "show off", "example": "He likes to <strong>brag</strong> about his achievements." },
    { "word": "cautious", "meaning": "careful", "example": "Be <strong>cautious</strong> when handling fragile items." },
    { "word": "affection", "meaning": "love or emotions", "example": "She showed great <strong>affection</strong> for her pet dog." },
    { "word": "fond", "meaning": "proud of", "example": "I am very <strong>fond</strong> of my childhood memories." },
    { "word": "poverty", "meaning": "lack of money", "example": "The charity works to fight <strong>poverty</strong> in developing countries." },
    { "word": "tenant", "meaning": "the one renting", "example": "The <strong>tenant</strong> has agreed to pay rent on time." },
    { "word": "landlord", "meaning": "the owner of the premises", "example": "The <strong>landlord</strong> fixed the plumbing issue quickly." },
    { "word": "slogan", "meaning": "saying (mostly of companies)", "example": "Their <strong>slogan</strong> was 'Just Do It'." },
    { "word": "valuable", "meaning": "important", "example": "This old painting is extremely <strong>valuable</strong>." },
    { "word": "crew", "meaning": "a group of people who work closely together", "example": "The film <strong>crew</strong> worked late into the night." },
    { "word": "harvest", "meaning": "to take out crops when they are fully grown", "example": "Farmers <strong>harvest</strong> wheat in the late summer." },
    { "word": "prosper", "meaning": "to be successful", "example": "The company aims to <strong>prosper</strong> in the global market." },
    { "word": "possess", "meaning": "own something", "example": "She <strong>possesses</strong> a rare collection of coins." },
    { "word": "shallow", "meaning": "not deep", "example": "The river was <strong>shallow</strong> near the bank." },
    { "word": "fluid", "meaning": "water-like substance", "example": "The <strong>fluid</strong> inside the pipe leaked onto the floor." },
    { "word": "decay", "meaning": "go bad", "example": "The fruit began to <strong>decay</strong> after a few days." },
    { "word": "batch", "meaning": "group", "example": "The bakery prepared a <strong>batch</strong> of fresh cookies." },
    { "word": "aftermath", "meaning": "after events", "example": "The <strong>aftermath</strong> of the storm left many families without power." },
    { "word": "plethora", "meaning": "a lot of", "example": "There was a <strong>plethora</strong> of options to choose from." },
    { "word": "temper", "meaning": "mood", "example": "She tried to control her <strong>temper</strong> during the meeting." },
    { "word": "postpone", "meaning": "delay", "example": "The meeting was <strong>postponed</strong> until next week." },
    { "word": "conceal", "meaning": "hide", "example": "She tried to <strong>conceal</strong> the gift until her birthday." },
    { "word": "swap", "meaning": "exchange", "example": "They decided to <strong>swap</strong> seats during the concert." },
    { "word": "exhaust", "meaning": "use up", "example": "The long hike completely <strong>exhausted</strong> him." },
    { "word": "shrink", "meaning": "become small", "example": "The shirt will <strong>shrink</strong> if you wash it in hot water." },
    { "word": "tremble", "meaning": "shake", "example": "She began to <strong>tremble</strong> from the cold." },
    { "word": "soak", "meaning": "make wet in the water", "example": "He loves to <strong>soak</strong> in the bathtub after a long day." },
    { "word": "timid", "meaning": "shy", "example": "The <strong>timid</strong> child hid behind his mother." },
    { "word": "urge", "meaning": "persuade", "example": "I <strong>urge</strong> you to reconsider your decision." },
    { "word": "agitate", "meaning": "disturb", "example": "The loud noise began to <strong>agitate</strong> the crowd." },
    { "word": "absolute", "meaning": "the most or the greatest", "example": "She gave an <strong>absolute</strong> answer without hesitation." },
    { "word": "classify", "meaning": "to attach a name to something", "example": "The documents were <strong>classified</strong> for security reasons." },
    { "word": "scaffolding", "meaning": "outer structure", "example": "The workers set up <strong>scaffolding</strong> around the building." },
    { "word": "supplant", "meaning": "replace", "example": "The new system will <strong>supplant</strong> the old one." },
    { "word": "aura", "meaning": "vibes", "example": "She had a calm and positive <strong>aura</strong> about her." },
    { "word": "focal", "meaning": "point of focus", "example": "The <strong>focal</strong> point of the meeting was the new project proposal." },
    { "word": "astray", "meaning": "go away from the right path", "example": "The group wandered <strong>astray</strong> in the forest." },
    { "word": "pursue", "meaning": "run after", "example": "She decided to <strong>pursue</strong> her dream of becoming a writer." },
    { "word": "aggregate", "meaning": "total", "example": "The <strong>aggregate</strong> score of the game was 5-3." },
    { "word": "explicit", "meaning": "to make clear", "example": "He gave an <strong>explicit</strong> explanation of the instructions." },
    { "word": "deviate", "meaning": "move away from course", "example": "The car began to <strong>deviate</strong> from its lane." },
    { "word": "arbitrary", "meaning": "based on random judgment", "example": "The decision was made in an <strong>arbitrary</strong> manner." },
    { "word": "predominant", "meaning": "powerful", "example": "She had a <strong>predominant</strong> influence on the team." },
    { "word": "indifferent", "meaning": "not caring", "example": "He seemed <strong>indifferent</strong> to the outcome of the game." },
    { "word": "reinforce", "meaning": "remind", "example": "The teacher will <strong>reinforce</strong> the lesson tomorrow." },
    { "word": "considerable", "meaning": "a lot", "example": "The project required a <strong>considerable</strong> amount of time." },
    { "word": "constrain", "meaning": "to limit someone", "example": "Rules <strong>constrain</strong> what you can and can't do." },
    { "word": "convene", "meaning": "to come together", "example": "The board will <strong>convene</strong> for a special meeting." },
    { "word": "correspond", "meaning": "matches with", "example": "Her response did not <strong>correspond</strong> with the question." },
    { "word": "demonstrate", "meaning": "show", "example": "The teacher will <strong>demonstrate</strong> how to solve the problem." },
    { "word": "specify", "meaning": "to give a title or assign a position", "example": "Please <strong>specify</strong> the exact time for the meeting." },
    { "word": "impose", "meaning": "force", "example": "The government will <strong>impose</strong> new regulations next year." },
    { "word": "implicate", "meaning": "to suggest something", "example": "The evidence could <strong>implicate</strong> him in the crime." },
    { "word": "subsequent", "meaning": "next", "example": "The <strong>subsequent</strong> actions led to a major breakthrough." },
    { "word": "despite", "meaning": "instead", "example": "She went to work <strong>despite</strong> the heavy rain." },
    { "word": "hypothesis", "meaning": "to assume after considering various options", "example": "The scientist formed a <strong>hypothesis</strong> based on the available data." },
    { "word": "draft", "meaning": "rough version", "example": "I reviewed the <strong>draft</strong> of the report before finalizing it." },
    { "word": "evolve", "meaning": "to grow", "example": "The business will <strong>evolve</strong> over the next few years." },
    { "word": "equivalent", "meaning": "equal version", "example": "His response was the <strong>equivalent</strong> of a yes." },
    { "word": "adapting", "meaning": "getting used to something", "example": "She is <strong>adapting</strong> to her new job quite well." },
    { "word": "advocate", "meaning": "support", "example": "He is a strong <strong>advocate</strong> for environmental protection." },
    { "word": "equip", "meaning": "to gift you with some tool", "example": "The workshop will <strong>equip</strong> you with the skills needed for the job." },
    { "word": "empirical", "meaning": "based on facts", "example": "The study relied on <strong>empirical</strong> evidence to draw conclusions." },
    { "word": "contrary", "meaning": "opposite", "example": "On the <strong>contrary</strong>, I think the plan is a great idea." },
    { "word": "hierarchy", "meaning": "a system of a management structure", "example": "The company has a strict <strong>hierarchy</strong> of management." },
    { "word": "coincide", "meaning": "happen at the same time", "example": "Our vacation plans <strong>coincide</strong> with the national holiday." },
    { "word": "erode", "meaning": "erase", "example": "The constant rain began to <strong>erode</strong> the cliffs." },
    { "word": "integral", "meaning": "important", "example": "An <strong>integral</strong> part of the project is the research phase." },
    { "word": "rigid", "meaning": "difficult to change", "example": "The company's policies are quite <strong>rigid</strong> and inflexible." },
    { "word": "steep", "meaning": "(of a price or demand) not reasonable", "example": "The hotel charges a <strong>steep</strong> fee for parking." }
  ];

}

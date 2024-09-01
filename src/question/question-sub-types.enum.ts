export enum SpeakingAndWritingSubTypes {
  PERSONAL_INTRODUCTION = 'Personal Introduction',
  READ_ALOUD = 'Read Aloud',
  REPEAT_SENTENCE = 'Repeat Sentence',
  DESCRIBE_IMAGE = 'Describe Image',
  RE_TELL_LECTURE = 'Re-tell Lecture',
  ANSWER_SHORT_QUESTION = 'Answer Short Question',
  SUMMARIZE_WRITTEN_TEXT = 'Summarize Written Text',
  ESSAY = 'Essay',
}

export type TypesOfSpeakingAndWritingSubTypes =
  keyof typeof SpeakingAndWritingSubTypes;

export enum ReadingSubTypes {
  READING_AND_WRITING_FILL_IN_THE_BLANKS = 'Reading & Writing: Fill in the Blanks',
  MULTIPLE_CHOICE_MULTIPLE_ANSWER = 'Multiple Choice, Multiple Answer',
  RE_ORDER_PARAGRAPHS = 'Re-order Paragraphs',
  FILL_IN_THE_BLANKS = 'Fill in the Blanks',
  MULTIPLE_CHOICE_SINGLE_ANSWER = 'Multiple Choice Single Answer',
}

export type TypesOfReadingSubTypes = keyof typeof ReadingSubTypes;

export enum ListeningSubTypes {
  SUMMARIZE_SPOKEN_TEXT = 'Summarize Spoken Text',
  MULTIPLE_CHOICE_MULTIPLE_ANSWER = 'Multiple Choice, Multiple Answer',
  FILL_IN_THE_BLANKS = 'Fill in the Blanks',
  HIGHLIGHT_CORRECT_SUMMARY = 'Highlight Correct Summary',
  MULTIPLE_CHOICE_SINGLE_ANSWER = 'Multiple Choice Single Answer',
  SELECT_MISSING_WORD = 'Select Missing Word',
  HIGHLIGHT_INCORRECT_WORDS = 'Highlight Incorrect Words',
  WRITE_FROM_DICTATION = 'Write from Dictation',
}

export type TypesOfListeningSubTypes = keyof typeof ListeningSubTypes;

export enum QuestionTypes {
  SPEAKING_AND_WRITING = 'Speaking & Writing',
  READING = 'Reading',
  LISTENING = 'Listening',
}

export type TypesOfQuestion = keyof typeof QuestionTypes;

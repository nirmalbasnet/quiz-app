import { IsNotEmpty } from 'class-validator';

export class GetTestQuestionsDto {
  @IsNotEmpty()
  testId: number;
}

import { IsBoolean, IsNotEmpty } from 'class-validator';
export class AnswerDto {
  @IsNotEmpty()
  answer: object;

  @IsNotEmpty()
  @IsBoolean()
  attempted: boolean;
}

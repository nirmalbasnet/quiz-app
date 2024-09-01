import { QuestionDetail } from './../../models/question-detail.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import {
  SpeakingAndWritingSubTypes,
  ReadingSubTypes,
  ListeningSubTypes,
} from '../question-sub-types.enum';
import { QuestionTypes, TypesOfQuestion } from '../question-types.enum';
import { Type } from 'class-transformer';

export class AddQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  testId: number;

  @ApiProperty({
    enum: QuestionTypes,
  })
  @IsNotEmpty()
  questionType: TypesOfQuestion;

  @ApiProperty({
    enum: [SpeakingAndWritingSubTypes, ReadingSubTypes, ListeningSubTypes],
  })
  @IsNotEmpty()
  questionSubType:
    | SpeakingAndWritingSubTypes
    | ReadingSubTypes
    | ListeningSubTypes;

  @ApiProperty()
  order: number;

  @ApiProperty({
    type: 'json',
  })
  @IsNotEmpty()
  @Type(() => QuestionDetail)
  details: QuestionDetail;
}

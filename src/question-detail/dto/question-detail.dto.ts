import { QuestionDetail } from './../../models/question-detail.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class QuestionDetailDto {
  @ApiProperty()
  @Type(() => QuestionDetail)
  question: Partial<QuestionDetail>;

  @ApiProperty({
    type: 'jsonb',
  })
  details: object;
}

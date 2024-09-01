import { QuestionDetailRepository } from './question-detail.repository';
import { QuestionDetailDto } from './dto';
import { Injectable } from '@nestjs/common';
import { QuestionDetail } from 'src/models/question-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuestionDetailService {
  constructor(
    @InjectRepository(QuestionDetailRepository)
    private readonly questionDetailRepository: QuestionDetailRepository,
  ) {}

  async createQuestionDetail(
    questionDetailDto: QuestionDetailDto,
  ): Promise<QuestionDetail> {
    const questionDetail =
      this.questionDetailRepository.create(questionDetailDto);
    return this.questionDetailRepository.save(questionDetail);
  }
}

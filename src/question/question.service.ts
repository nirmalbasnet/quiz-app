import { QuestionTypes } from './question-types.enum';
import { QuestionDetailService } from './../question-detail/question-detail.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/models/question.entity';
import { ListTestQuestionDto } from 'src/test/dto';
import { AddQuestionDto } from './dto';
import { QuestionRepository } from './question.repository';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionRepository)
    private readonly questionRepository: QuestionRepository,
    private readonly questionDetailService: QuestionDetailService,
  ) {}

  async getTestQuestions(
    id: number,
    orderKey?: string,
    orderType?: string,
  ): Promise<Question[]> {
    let orderDetail: object;
    if (orderKey && orderType) {
      orderDetail = {
        [orderKey]: orderType,
      };
    } else {
      orderDetail = {
        id: 'DESC',
      };
    }

    return this.questionRepository.find({
      where: {
        test: { id },
      },
      relations: ['details'],
      order: orderDetail,
    });
  }

  async createQuestion(addQuestionDto: AddQuestionDto): Promise<Question> {
    const newQuestion = this.questionRepository.create({
      title: addQuestionDto.title,
      questionType: addQuestionDto.questionType,
      questionSubType: addQuestionDto.questionSubType,
      order: addQuestionDto.order,
      test: {
        id: addQuestionDto.testId,
      },
    });

    const question = await this.questionRepository.save(newQuestion);

    const questionId = question.id;
    this.questionDetailService.createQuestionDetail({
      details: addQuestionDto.details,
      question: {
        id: questionId,
      },
    });

    return question;
  }

  async checkIfQuestionSubTypeAlreadyCreated(
    addQuestionDto: AddQuestionDto,
  ): Promise<Question> {
    return this.questionRepository.findOne({
      where: {
        test: {
          id: addQuestionDto.testId,
        },
        questionType: addQuestionDto.questionType,
        questionSubType: addQuestionDto.questionSubType,
      },
    });
  }

  createdQuestionTypes(testId: number) {
    return this.questionRepository.createdQuestionTypes(testId);
  }
}

import { ListTestQuestionDto } from 'src/test/dto';
import { QuestionService } from './../question/question.service';
import { CreateTestDto, ListTestDto } from './dto';
import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestRepository } from './test.repository';
import { Test } from 'src/models/test.entity';
import { Question } from 'src/models/question.entity';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(TestRepository)
    private readonly testRepository: TestRepository,
    private readonly questionService: QuestionService,
  ) {}

  getTest(@Query() listTestDto: ListTestDto): Promise<Test[]> {
    const skip = listTestDto.limit * listTestDto.page - listTestDto.limit;
    return this.testRepository.find({
      relations: ['questions'],
      take: listTestDto.limit,
      skip,
      order: {
        id: 'DESC',
      },
    });
  }

  getTestQuestions(
    id: number,
    orderKey?: string,
    orderType?: string,
  ): Promise<Question[]> {
    return this.questionService.getTestQuestions(id, orderKey, orderType);
  }

  createTest(createTestDto: CreateTestDto): Promise<Test> {
    const test = this.testRepository.create(createTestDto);
    return this.testRepository.save(test);
  }

  createdQuestionTypes(testId: number) {
    return this.questionService.createdQuestionTypes(testId);
  }

  findTestById(testId: number) {
    return this.testRepository.findOne(testId);
  }
}

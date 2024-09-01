import { AnswerDto } from './dto/answer.dto';
import { TestService } from 'src/test/test.service';
import { StudentTestRepository } from './student-test.repository';
import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { StudentTest } from 'src/models/student-test.entity';

@Injectable()
export class StudentTestService {
  constructor(
    @InjectRepository(StudentTestRepository)
    private readonly studentTestRepository: StudentTestRepository,
    private readonly testService: TestService,
  ) {}
  async getStudentTestQuestions(student: User, testId: number) {
    try {
      const test = await this.studentTestRepository.getTestQuestions(
        student.id,
        testId,
        false,
      );
      //   const test = await this.studentTestRepository.find({
      //     relations: ['user', 'test', 'question', 'question.details'],
      //     where: {
      //       user: {
      //         id: student.id,
      //       },
      //       test: {
      //         id: testId,
      //       },
      //       attempted: false,
      //     },
      //     order: {
      //       question: { order: 'ASC' },
      //     },
      //   });

      if (test && test.length) {
        return test;
      }

      const testQuestions = await this.testService.getTestQuestions(
        testId,
        'order',
        'ASC',
      );

      if (!testQuestions.length) {
        throw new UnprocessableEntityException(
          'Given test has no any questions',
        );
      }

      const testData = await this.testService.findTestById(testId);

      if (!testData) {
        throw new BadRequestException('Given test does not exist');
      }

      const data = testQuestions.map((question) => {
        return this.studentTestRepository.create({
          test: testData,
          question: question,
          user: student,
        });
      });
      return await this.studentTestRepository.save(data);
    } catch (error) {
      throw error;
    }
  }

  recordStudentAnswer(
    testId: number,
    questionId: number,
    currentUser: User,
    answer: AnswerDto,
  ) {
    return this.studentTestRepository.update(
      {
        test: {
          id: testId,
        },
        question: {
          id: questionId,
        },
        user: currentUser,
      },
      answer as Partial<StudentTest>,
    );
  }
}

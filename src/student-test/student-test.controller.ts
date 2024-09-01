import { AnswerDto } from './dto/answer.dto';
import { StudentTestService } from './student-test.service';
import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { CurrentUser } from 'src/auth/get-user.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { User } from 'src/models/user.entity';
import { GetTestQuestionsDto } from './dto/get-test-questions.dto';

@Controller('student/test/:testId')
export class StudentTestController {
  constructor(private readonly studentTestService: StudentTestService) {}
  @Get()
  @Roles('student')
  async getTestQuestions(
    @Param() getTestQuestionsDto: GetTestQuestionsDto,
    @CurrentUser() currentUser: User,
  ) {
    try {
      const studentTestQuestions =
        await this.studentTestService.getStudentTestQuestions(
          currentUser,
          getTestQuestionsDto.testId,
        );

      return studentTestQuestions;
    } catch (error) {
      throw error;
    }
  }

  @Patch('answer/:questionId')
  async recordStudentAnswer(
    @Param('testId') testId: number,
    @Param('questionId') questionId: number,
    @CurrentUser() currentUser: User,
    @Body() answer: AnswerDto,
  ) {
    try {
      return await this.studentTestService.recordStudentAnswer(
        testId,
        questionId,
        currentUser,
        answer,
      );
    } catch (error) {
      throw error;
    }
  }
}

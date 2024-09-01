import { AddQuestionDto } from './../question/dto/add-question.dto';
import { CreateTestDto, ListTestDto, ListTestQuestionDto } from './dto';
import { TestService } from './test.service';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Test } from 'src/models/test.entity';
import { Question } from 'src/models/question.entity';
import { QuestionService } from 'src/question/question.service';

@Controller('test')
@ApiTags('Tests')
export class TestController {
  constructor(
    private readonly testService: TestService,
    private readonly questionService: QuestionService,
  ) {}

  @Get()
  async getTest(@Query() listTestDto: ListTestDto): Promise<Test[]> {
    return await this.testService.getTest(listTestDto);
  }

  @Get(':id/questions')
  async getTestQuestions(@Param('id') id: number): Promise<Question[]> {
    return await this.testService.getTestQuestions(id);
  }

  @Post()
  async createTest(@Body() createTestDto: CreateTestDto): Promise<Test> {
    return await this.testService.createTest(createTestDto);
  }

  @Post(':id/questions')
  // @Roles('admin')
  @ApiConsumes('multipart/form-data')
  async createQuestion(
    @Body()
    addQuestionDto: AddQuestionDto,
  ): Promise<Question> {
    const check: Question =
      await this.questionService.checkIfQuestionSubTypeAlreadyCreated(
        addQuestionDto,
      );

    if (check) {
      throw new BadRequestException(
        'The question category you chose has already been created for given test',
      );
    }

    return await this.questionService.createQuestion(addQuestionDto);
  }

  @Get(':id/created-questions/types')
  async createdQuestionTypes(@Param('id', ParseIntPipe) id: number) {
    const data = await this.questionService.createdQuestionTypes(id);
    let response = {};
    if (data && data.length > 0) {
      data.forEach((datum) => {
        response = { ...response, [`${datum.types}-${datum.sub_types}`]: true };
      });
    }
    return response;
  }
}

import { QuestionRepository } from './question.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { Question } from 'src/models/question.entity';
import { QuestionDetailModule } from 'src/question-detail/question-detail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question, QuestionRepository]),
    QuestionDetailModule,
  ],
  providers: [QuestionService],
  controllers: [QuestionController],
  exports: [QuestionService],
})
export class QuestionModule {}

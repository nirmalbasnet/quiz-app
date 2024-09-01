import { Module } from '@nestjs/common';
import { QuestionDetailService } from './question-detail.service';
import { QuestionDetailController } from './question-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionDetail } from 'src/models/question-detail.entity';
import { QuestionDetailRepository } from './question-detail.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionDetail, QuestionDetailRepository]),
  ],
  providers: [QuestionDetailService],
  controllers: [QuestionDetailController],
  exports: [QuestionDetailService],
})
export class QuestionDetailModule {}

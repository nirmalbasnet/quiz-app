import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { Test } from 'src/models/test.entity';
import { TestRepository } from './test.repository';
import { QuestionModule } from 'src/question/question.module';

@Module({
  imports: [TypeOrmModule.forFeature([Test, TestRepository]), QuestionModule],
  providers: [TestService],
  controllers: [TestController],
  exports: [TestService],
})
export class TestModule {}

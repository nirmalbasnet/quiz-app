import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { configService } from './config/config.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TestModule } from './test/test.module';
import { QuestionModule } from './question/question.module';
import { QuestionDetailModule } from './question-detail/question-detail.module';
import { FileUploaderModule } from './file-uploader/file-uploader.module';
import { StudentTestModule } from './student-test/student-test.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    AuthModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets'),
      exclude: ['/api*'],
    }),
    TestModule,
    QuestionModule,
    QuestionDetailModule,
    FileUploaderModule,
    StudentTestModule,
  ],
})
export class AppModule {}

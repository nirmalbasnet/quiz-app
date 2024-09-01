import { TestModule } from './../test/test.module';
import { TokenService } from './../utils/token-service.utils';
import { AuthMiddleware } from './../middleware/auth.middleware';
import { StudentTestRepository } from './student-test.repository';
import { StudentTest } from './../models/student-test.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { StudentTestController } from './student-test.controller';
import { StudentTestService } from './student-test.service';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentTest, StudentTestRepository]),
    AuthModule,
    TestModule,
  ],
  controllers: [StudentTestController],
  providers: [StudentTestService, TokenService, ConfigService],
})
export class StudentTestModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('student/test/:testId');
  }
}

import { StudentTest } from './../models/student-test.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(StudentTest)
export class StudentTestRepository extends Repository<StudentTest> {
  getTestQuestions(userId: number, testId: number, attempted: boolean) {
    return this.createQueryBuilder('student_test')
      .where(
        'user_id = :userId AND student_test.test_id = :testId AND attempted = :attempted',
        {
          userId,
          testId,
          attempted,
        },
      )
      .leftJoinAndSelect('student_test.user', 'user')
      .leftJoinAndSelect('student_test.test', 'test')
      .leftJoinAndSelect('student_test.question', 'question')
      .leftJoinAndSelect('question.details', 'question_detail')
      .orderBy({
        'question.order': 'ASC',
      })
      .getMany();
  }
}

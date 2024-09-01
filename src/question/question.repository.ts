import { Question } from 'src/models/question.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Question)
export class QuestionRepository extends Repository<Question> {
  createdQuestionTypes(testId: number) {
    return this.createQueryBuilder('question')
      .where('question.test_id = :testId', { testId })
      .select('question.question_type', 'types')
      .addSelect('question.question_sub_type', 'sub_types')
      .groupBy('question.question_type')
      .addGroupBy('question.question_sub_type')
      .getRawMany();
  }
}

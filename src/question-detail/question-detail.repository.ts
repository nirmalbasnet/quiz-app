import { QuestionDetail } from 'src/models/question-detail.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(QuestionDetail)
export class QuestionDetailRepository extends Repository<QuestionDetail> {}

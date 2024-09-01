import { Test } from 'src/models/test.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Test)
export class TestRepository extends Repository<Test> {}

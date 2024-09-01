import { StudentTest } from './student-test.entity';
import { QuestionDetail } from './question-detail.entity';
import {
  SpeakingAndWritingSubTypes,
  ReadingSubTypes,
  ListeningSubTypes,
} from './../question/question-sub-types.enum';
import {
  QuestionTypes,
  TypesOfQuestion,
} from '../question/question-types.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Test } from './test.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @ManyToOne(() => Test, (test) => test.questions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'test_id', referencedColumnName: 'id' }])
  test: Test;

  @Column({
    type: 'text',
  })
  title: string;

  @Column({
    name: 'question_type',
    enum: QuestionTypes,
  })
  questionType: TypesOfQuestion;

  @Column({
    name: 'question_sub_type',
    enum: [SpeakingAndWritingSubTypes, ReadingSubTypes, ListeningSubTypes],
  })
  questionSubType:
    | SpeakingAndWritingSubTypes
    | ReadingSubTypes
    | ListeningSubTypes;

  @Column()
  order: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @OneToOne(() => QuestionDetail, (questionDetail) => questionDetail.question)
  details: QuestionDetail;

  @OneToMany(() => StudentTest, (studentTest) => studentTest.test)
  studentTests: StudentTest[];
}

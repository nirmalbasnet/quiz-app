import { Question } from 'src/models/question.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Test } from './test.entity';
import { User } from './user.entity';

@Entity()
export class StudentTest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Test, (test) => test.studentTests, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'test_id', referencedColumnName: 'id' })
  test: Test;

  @ManyToOne(() => Question, (question) => question.studentTests, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'question_id', referencedColumnName: 'id' })
  question: Question;

  @ManyToOne(() => User, (user) => user.studentTests, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @Column({ name: 'attempted', type: 'boolean', default: () => 'false' })
  attempted: false;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  answer: object;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}

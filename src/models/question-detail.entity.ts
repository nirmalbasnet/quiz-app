import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Question } from './question.entity';

@Entity()
export class QuestionDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @OneToOne(() => Question, (question) => question.details, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'question_id', referencedColumnName: 'id' }])
  question: Question;

  @Column({
    type: 'jsonb',
  })
  details: object;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}

import { IsIn, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";
import { TaskStatus } from "./task-status.enum";

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @Column()
  title: string

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @Column({ nullable: true })
  description: string

  @IsIn(Object.values(TaskStatus))
  @Column()
  status: TaskStatus

  // eslint-disable-next-line
  @ManyToOne(type => User, user => user.tasks, { eager: false })
  user: User

  @Column({ 
    type: 'number'
  })
  userId: number
}

import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "../tasks/task.entity";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 255,
    unique: true
  })
  username: string

  @Column({
    type: 'varchar',
    length: 255
  })
  password: string

  // eslint-disable-next-line
  @OneToMany(type => Task, task => task.user, { eager: true })
  tasks: Task[]
}

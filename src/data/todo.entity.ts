import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";


@Entity({ name: 'Todo' })
export class ToDoEntity {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({ type: 'text' })
    name: string | undefined;

    @OneToOne(() => UserEntity)
    @JoinColumn()
    user: UserEntity | undefined;

    @CreateDateColumn()
    date: Date | undefined;

    @Column({ type: 'bool' })
    state: boolean | undefined;

}
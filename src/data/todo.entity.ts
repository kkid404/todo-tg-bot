import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'Todo' })
export class ToDoEntity {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({ type: 'text' })
    name: string | undefined;

    @Column({ type: 'text' })
    userId: number | undefined;

    @CreateDateColumn()
    date: Date | undefined;

    @Column({ type: 'bool' })
    state: boolean | undefined;
}
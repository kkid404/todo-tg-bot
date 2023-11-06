import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'User' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({ type: 'text' })
    telegram_id: number | undefined;

    @Column({ type: 'text' })
    lang: string | undefined;

    @Column({ type: 'text' })
    name: string | undefined;
}
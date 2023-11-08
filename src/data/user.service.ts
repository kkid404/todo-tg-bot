import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";

export class UserService {
    constructor(
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async add(
        telegram_id: number,
        lang: string,
        name: string
    ) {
        const user = await this.userRepository.create({ telegram_id, lang, name });
        await this.userRepository.save(user);
    }

    async getByTgId(telegram_id: number) {
        return this.userRepository.findOneBy({ telegram_id });
    }
}
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    return await this.usersRepository.save(userData);
  }

  async checkEmailExist(email: string): Promise<boolean> {
    return await this.usersRepository.exists({ where: { email: email } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { email: email } });
  }

  async findById(id: number): Promise<User> {
    const userResponse = await this.usersRepository.findOne({
      where: { id: id },
    });
    if (!userResponse) throw new NotFoundException('User not found');
    return userResponse;
  }
}

/* eslint-disable @typescript-eslint/consistent-type-imports */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

import { UserEntity } from '@model/user.entity';
import { RedisCacheService } from '@core/service/cache.service';
import type { UpdateUserDto } from './dto/update-user.dto';
import type { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private readonly cacheService: RedisCacheService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepo.create(createUserDto);
    const result = await this.userRepo.save(user).catch((err: Error) => {
      throw new BadRequestException(
        err.message?.includes('duplicate')
          ? 'Username atau email sudah terdaftar'
          : err.message
      );
    });

    if (result.id) return 'Registrasi user sukses';
  }

  async findOne(id: string) {
    return await this.userRepo.findOne({
      where: { id: id },
      select: { created_at: false, updated_at: false, deleted_at: false },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const result = (await this.userRepo.update({ id: id }, updateUserDto))
      .affected;

    if (result === 0) {
      throw new NotFoundException('User tidak ditemukan');
    } else {
      return 'Data user berhasil di update';
    }
  }

  async remove(id: string) {
    const result = (await this.userRepo.delete({ id: id })).affected;

    if (result === 0) {
      throw new NotFoundException('User tidak ditemukan');
    } else {
      return 'User berhasil di hapus';
    }
  }
}

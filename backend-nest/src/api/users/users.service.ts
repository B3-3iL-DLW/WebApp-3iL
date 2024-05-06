import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, user } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(
    userWhereUniqueInput: Prisma.userWhereUniqueInput,
  ): Promise<user | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async findOneByEmail(email: string): Promise<user | null> {
    return this.prisma.user.findFirst({
      where: { email },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.userWhereUniqueInput;
    where?: Prisma.userWhereInput;
    orderBy?: Prisma.userOrderByWithRelationInput;
  }): Promise<user[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: CreateUserDto): Promise<user> {
    try {
      return await this.prisma.user.create({
        data,
      });
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur :", error);
      throw new Error("Erreur lors de la création de l'utilisateur.");
    }
  }

  async update(params: {
    where: Prisma.userWhereUniqueInput;
    data: UpdateUserDto;
  }): Promise<user> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.userWhereUniqueInput): Promise<user> {
    return this.prisma.user.delete({
      where,
    });
  }

  async updateClassGroup(userId: number, classGroupId: number): Promise<user> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { classGroupId },
    });
  }
}

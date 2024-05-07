import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
    try {
      return await this.prisma.user.findUnique({
        where: userWhereUniqueInput,
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error finding user');
    }
  }

  async findOneByEmail(email: string): Promise<user | null> {
    try {
      return await this.prisma.user.findFirst({
        where: { email },
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error finding user by email');
    }
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.userWhereUniqueInput;
    where?: Prisma.userWhereInput;
    orderBy?: Prisma.userOrderByWithRelationInput;
  }): Promise<user[]> {
    const { skip, take, cursor, where, orderBy } = params;
    try {
      return await this.prisma.user.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error finding users');
    }
  }

  async create(data: CreateUserDto): Promise<user> {
    const existingUser = await this.findOneByEmail(data.email);
    if (existingUser) {
      const errorMessage = 'An account with this email already exists';
      console.error(errorMessage);
      throw new ConflictException(errorMessage);
    }

    try {
      return await this.prisma.user.create({
        data,
      });
    } catch (error) {
      console.error('Error when creating user :', error);
      throw new InternalServerErrorException('Error when creating user :');
    }
  }

  async update(params: {
    where: Prisma.userWhereUniqueInput;
    data: UpdateUserDto;
  }): Promise<user> {
    const { where, data } = params;
    const existingUser = await this.findOne(where);
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    const userWithUpdatedEmail = await this.findOneByEmail(data.email);
    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== existingUser.id) {
      throw new ConflictException('Email already in use');
    }

    try {
      return await this.prisma.user.update({
        data,
        where,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
      throw new InternalServerErrorException(
        "Erreur lors de la mise à jour de l'utilisateur.",
      );
    }
  }

  async delete(where: Prisma.userWhereUniqueInput): Promise<user> {
    const existingUser = await this.findOne(where);
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    try {
      return await this.prisma.user.delete({
        where,
      });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
      throw new InternalServerErrorException(
        "Erreur lors de la suppression de l'utilisateur.",
      );
    }
  }

  async updateClassGroup(userId: number, classGroupId: number): Promise<user> {
    const existingUser = await this.findOne({ id: userId });
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    try {
      return await this.prisma.user.update({
        where: { id: userId },
        data: { classGroupId },
      });
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour du groupe de classe de l'utilisateur :",
        error,
      );
      throw new InternalServerErrorException(
        "Erreur lors de la mise à jour du groupe de classe de l'utilisateur.",
      );
    }
  }
}

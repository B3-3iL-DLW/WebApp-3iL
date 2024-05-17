import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { $Enums, Prisma, user } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number): Promise<user | null> {
    const existingUser = await this.prisma.user.findUnique({
      where: { id: id },
    });
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    try {
      return await this.prisma.user.findUnique({
        where: { id: id },
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error finding user');
    }
  }

  async findOneByEmail(email: string): Promise<user | null> {
    const existingUser = await this.prisma.user.findFirst({
      where: { email },
    });
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    try {
      return existingUser;
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
    let existingUser: {
      id: number;
      email: string;
      password: string;
      firstname: string;
      lastname: string;
      role: $Enums.user_role;
      classGroupId: number;
    };
    try {
      existingUser = await this.findOneByEmail(data.email);
    } catch (error) {
      if (error instanceof NotFoundException) {
        existingUser = null;
      } else {
        throw error;
      }
    }

    if (existingUser) {
      const errorMessage = 'An account with this email already exists';
      console.error(errorMessage);
      throw new ConflictException(errorMessage);
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);

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
    where: { id: number };
    data: UpdateUserDto;
  }): Promise<user> {
    let existingUser: {
      id: number;
      email: string;
      password: string;
      firstname: string;
      lastname: string;
      role: $Enums.user_role;
      classGroupId: number;
    };
    try {
      existingUser = await this.findOne(params.data.id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        existingUser = null;
      } else {
        throw error;
      }
    }

    if (!existingUser) {
      const errorMessage = 'No user found with this email';
      console.error(errorMessage);
      throw new NotFoundException(errorMessage);
    }

    const emailExists = await this.emailExists(params.data.email);
    if (emailExists && params.data.email !== existingUser.email) {
      const errorMessage = 'An account with this email already exists';
      console.error(errorMessage);
      throw new ConflictException(errorMessage);
    }

    try {
      return await this.prisma.user.update(params);
    } catch (error) {
      console.error('Error when updating user :', error);
      throw new InternalServerErrorException('Error when updating user :');
    }
  }

  async delete(where: Prisma.userWhereUniqueInput): Promise<user> {
    const existingUser = await this.findOne(where.id);
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
    const existingUser = await this.findOne(userId);
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

  async emailExists(email: string): Promise<boolean> {
    try {
      const existingUser = await this.findOneByEmail(email);
      return !!existingUser;
    } catch (error) {
      if (error instanceof NotFoundException) {
        return false;
      } else {
        throw error;
      }
    }
  }
}

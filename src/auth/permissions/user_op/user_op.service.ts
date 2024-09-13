import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserOpDto } from './dto/createUserOp.dto';
import { UpdateUserOpDto } from './dto/updateUserOp.dto';

@Injectable()
export class UserOpService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.userOp.findMany({
      select: {
        id: true,
        userId: true,
        op: {
          select: {
            id: true,
            name: true,
            sigle: true,
            email: true,
            adresse: true,
            telephone: true,
            prenom_contact: true,
            nom_contact: true,
            email_contact: true,
            telephone_contact: true,
          },
        },
      },
    });
  }

  async getOne(userOpId: number) {
    const userOp = await this.prismaService.userOp.findUnique({
      where: { id: userOpId },
    });
    if (!userOp) throw new NotFoundException('Post not found');
    return userOp;
  }
  async create(createUserOpDto: CreateUserOpDto) {
    const { userId, opId } = createUserOpDto;
    await this.prismaService.userOp.create({ data: { userId, opId } });
    return { data: 'UserOp created' };
  }

  async update(userOpId: number, updateUserOpDto: UpdateUserOpDto) {
    const userOp = await this.prismaService.userOp.findUnique({
      where: { id: userOpId },
    });
    if (!userOp) throw new NotFoundException('UserOp not found');
    await this.prismaService.userOp.update({
      where: { id: userOpId },
      data: { ...updateUserOpDto },
    });
    return { data: 'UserOp updeted!' };
  }

  async delete(userOpId: number) {
    const userOp = await this.prismaService.userOp.findUnique({
      where: { id: userOpId },
    });
    if (!userOp) throw new NotFoundException('Post not found');
    await this.prismaService.userOp.delete({ where: { id: userOpId } });
    return { data: 'UserOp deleted' };
  }
}

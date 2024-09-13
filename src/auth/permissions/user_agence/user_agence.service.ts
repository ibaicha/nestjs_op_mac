import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserAgenceDto, UpdateUserAgenceDto } from './dto/userAgence.dto';


@Injectable()
export class UserAgenceService {
    constructor(private readonly prismaService : PrismaService) {}

    async getAll() {
        return this.prismaService.userAgence.findMany({
            select: {
                id: true,
                userId: true,
                agence: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        }

        );
    }

    async getOne(userAgenceId: number) {
        const userAgence = await this.prismaService.userAgence.findUnique({where: {id: userAgenceId}});
        if(!userAgence) throw new NotFoundException('Post not found');
        return userAgence;
    }
    async create(createUserAgenceDto: CreateUserAgenceDto) {
        const { userId, agenceId} = createUserAgenceDto;
        await this.prismaService.userAgence.create({data : { userId, agenceId}});
        return {data : "UserAgence created"};
    }

    async update(userAgenceId: number, updateUserAgenceDto: UpdateUserAgenceDto) {
        const userAgence = await this.prismaService.userAgence.findUnique({where: {id: userAgenceId}});
        if(!userAgence) throw new NotFoundException('UserAgence not found');
        await this.prismaService.userAgence.update({where: {id: userAgenceId}, data : {...updateUserAgenceDto}});
        return {data : "UserAgence updeted!"};
    }

    async delete(userAgenceId: number) {
        const userAgence = await this.prismaService.userAgence.findUnique({where: {id: userAgenceId}});
        if(!userAgence) throw new NotFoundException('Post not found');
        await this.prismaService.userAgence.delete({where: {id: userAgenceId}});
        return {data : "UserAgence deleted"};
    }
}


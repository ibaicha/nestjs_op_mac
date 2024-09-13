import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDto } from './dto/createProfile.dto';
import { UpdateProfileDto } from './dto/updateProfile.dto';

@Injectable()
export class ProfileService {
    constructor(private readonly prismaService : PrismaService) {}

    async getAll() {
        return this.prismaService.profile.findMany();
    }

    async getOne(profileId: number) {
        const profile = await this.prismaService.profile.findUnique({where: {id: profileId}});
        if(!profile) throw new NotFoundException('Profile not found');
        return profile;
    }
    async create(createProfileDto: CreateProfileDto) {
        const { firstName, lastName, address, phone, userId } = createProfileDto;
        await this.prismaService.profile.create({data : {firstName, lastName, address, phone,userId}});
        return {data : "Profile created"};
    }

    async update(profileId: number, updateProfileDto: UpdateProfileDto) {
        const profile = await this.prismaService.profile.findUnique({where: {id: profileId}});
        if(!profile) throw new NotFoundException('Profile not found');
        await this.prismaService.profile.update({where: {id : profileId}, data : {...updateProfileDto}});
        return {data : "Profile updeted!"};
    }

    async delete(profileId: number) {
        const profile = await this.prismaService.profile.findUnique({where: {id: profileId}});
        if(!profile) throw new NotFoundException('Post not found');
        await this.prismaService.profile.delete({where: {id : profileId}});
        return {data : "Profile deleted"};
    }
}

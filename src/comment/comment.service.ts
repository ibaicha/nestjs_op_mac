import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateCommentDto } from './dto/createComment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateCommentDto } from './dto/updateComment.dto';

@Injectable()
export class CommentService {
    constructor(private readonly prismaService : PrismaService) {}

    async getAll() {
        return this.prismaService.comment.findMany(
            {
                select: {
                    id: true,
                    content: true,
                    post: {
                        select: {
                            id: true,
                            title: true,
                            body: true
                        }
                    }
                }
            }
        );
    }


    async create(userId: number, createCommentDto: CreateCommentDto ) {
        const { postId, content} = createCommentDto;
        const post = await this.prismaService.post.findUnique({
            where: {id: postId},
        });
        if(!post) throw new NotFoundException('Post not found');
        await this.prismaService.comment.create({
            data : {
                content,
             
                postId,
            },
        });
        return {
            data: 'Comment created!',
        };
    }

    async delete( commentId: number,userId: number, postId: number) {
        const comments = await this.prismaService.comment.findMany()
        //console.log('comments: ' + comments)
        console.log('commentId: ' + commentId)
        const comment = await this.prismaService.comment.findFirst({
            where: {id: commentId},
        });
        console.log(comment)
        if(!comment){
            throw new NotFoundException('Comment not found');
        }
        if(comment.postId !== postId) {
            console.log('comment.postId: ' + comment.postId)
            console.log('postId: ' + postId)
            throw new UnauthorizedException('Post id does not match');
        }
      
        await this.prismaService.comment.delete({
            where: {id: commentId}, 
        });
        return {
            data : 'Comment deleted!',
        }
    }

    async update( commentId: number,userId: number, updateCommentDto: UpdateCommentDto) {
        const { content,postId} = updateCommentDto;
        const comment = await this.prismaService.comment.findFirst({
            where: {id: commentId},
        });

        if(!comment) throw new NotFoundException('Comment not found');
        if(comment.postId !== postId) 
            throw new UnauthorizedException('Post id does not match');
 

            await this.prismaService.comment.update({where: {id: commentId}, data: {content}});
        return {
            data : 'Comment updated',
        }
    }
}

import { Controller, Post, Put, Delete, Body, Param, Req, ParseIntPipe, Get } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/createComment.dto';
import { UpdateCommentDto } from './dto/updateComment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Comment')
@Controller('comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}
    


    @Get()
    getAll() {
        return this.commentService.getAll();
    }
    @UseGuards(AuthGuard('jwt'))
    @Post("create")
    create( @Req() request : Request, @Body() createCommentDto: CreateCommentDto) {
        const userId = request.user['userId'];
        return this.commentService.create(userId, createCommentDto ); 
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete("delete/:id")
    delete(
        @Req() request : Request,
        @Param('id',ParseIntPipe) commentId: number,
        @Body('postId') postId: number,
        ){
            const userId = request.user['userId'];
            return this.commentService.delete(commentId,userId, postId); 
    }

    @UseGuards(AuthGuard('jwt'))
    @Put("update/:id")
    update(
        @Param('id',ParseIntPipe) commentId: number,
        @Req() request : Request, 
        @Body() updateCommentDto: UpdateCommentDto,
    ){
        const userId = request.user['userId'];
        return this.commentService.update(commentId, userId, updateCommentDto);
    }

}
 
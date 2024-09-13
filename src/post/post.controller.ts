import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostDto } from 'src/post/dto/createPost.dto';
import { Request } from 'express';
import { UpdatePostDto } from './dto/updatePost.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Post')
@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {}


    @Get()
    getAll() {
        return this.postService.getAll();
    }

    @Get("/:id")
    get(@Param("id", ParseIntPipe) postId : number, createPostDto: CreatePostDto) {
        return this.postService.getOne(postId); 
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post("create")
    create(@Body() createPostDto: CreatePostDto, @Req() request : Request) {
        const userId = request.user['userId'];
        return this.postService.create(createPostDto, userId); 
    }
    
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete("delete/:id")
    delete(@Param("id", ParseIntPipe) postId : number, createPostDto: CreatePostDto, @Req() request : Request) {
        const userId = request.user['id'];
        return this.postService.delete(postId, userId); 
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put("update/:id")
    update(
        @Param("id", ParseIntPipe) postId : number,
        @Body() UpdatePostDto: UpdatePostDto,
        @Req() request : Request
        ) {
        const userId = request.user['userId'];
        return this.postService.update(postId, userId, UpdatePostDto); 
    }
}

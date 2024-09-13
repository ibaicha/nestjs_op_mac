import { Controller,Get,Post,Delete } from '@nestjs/common';
import { Body, Req, UseGuards} from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { signupDto } from './dto/signup.dto';
import { signinDto } from './dto/signin.dto';
import { AuthService } from './auth.service';
import { ResetPasswordDemandDto } from './dto/resetPasswordDemand.dto';
import { ResetPasswordConfirmationDto } from 'src/auth/dto/resetPasswordConfirmation.dto';
import { Request } from 'express';
import { DeleteAccountdto } from 'src/auth/dto/deleteAccount.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentification')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get("users")
    getAll() {
        return this.authService.getAll();
    }



    @Post("signup")
    signup(@Body() signupDto: signupDto) {
        return this.authService.signup(signupDto);
    }

    @Post("signin")
    signin(@Body() signinDto: signinDto) {
        return this.authService.signin(signinDto);
    }

    @Post("reset-password")
    resetPasswordDemand(@Body() resetPasswordDemandDto: ResetPasswordDemandDto) {
        return this.authService.resetPasswordDemandDto(resetPasswordDemandDto);
    }

    @Post("reset-password-confirmation")
    resetPasswordConfirmation(@Body() resetPasswordConfirmationDto: ResetPasswordConfirmationDto) {
        return this.authService.resetPasswordConfirmationDto(resetPasswordConfirmationDto);
    }

    @UseGuards(AuthGuard("jwt"))
    @Delete("delete")
    deleteAccount(@Req() request : Request, @Body() deleteAccountDto : DeleteAccountdto) {
        const userId = request.user["userId"];
        return this.authService.deleteAccount(userId, deleteAccountDto);
    }
}

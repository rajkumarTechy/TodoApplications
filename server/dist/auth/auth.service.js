"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const EmailService_1 = require("../Utils/EmailService");
const user_model_1 = require("../users/Schemas/user.model");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    userModel;
    jwtService;
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    RESET_TOKEN = 'sddsbhdn@@nsndfsjnfsjn(hsdfsd)';
    async SignIn(createUserDto, res) {
        const { email, password } = createUserDto;
        const user = await this.userModel.findOne({ email }).lean();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const passwordBcrypt = await bcrypt.compare(password, user.password);
        if (!passwordBcrypt) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const access_token = this.jwtService.sign({ userId: user._id, role: user.role }, { expiresIn: '1h' });
        res.cookie('token', access_token, {
            maxAge: 15 * 60 * 1000,
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== 'development',
        });
        return res.status(200).json({ access_token, message: 'Login Successful' });
    }
    async Signout(res) {
        res.cookie('token', '', { maxAge: 0 });
        return res.status(200).json({ message: 'Logout Successful' });
    }
    async ResetPassword(resetEmail) {
        const User = await this.userModel.findOne({ email: resetEmail });
        if (!User) {
            throw new common_1.NotFoundException('Email Not Found');
        }
        const token = this.jwtService.sign({ userId: User._id, email: User.email }, { secret: this.RESET_TOKEN, expiresIn: '5m' });
        if (token) {
            await this.userModel.findByIdAndUpdate(User._id, { isRevoked: false });
        }
        ;
        const resetLink = `http://localhost:5173/reset-password?token=${token}`;
        const emailSend = await (0, EmailService_1.sendEmail)(resetEmail, resetLink);
        if (emailSend.status === 200) {
            return { message: 'Email send Successfully' };
        }
        else {
            return { message: 'Error Sending Email' };
        }
    }
    async NewPassword(password, token) {
        try {
            const decoded = await this.jwtService.verify(token, {
                secret: this.RESET_TOKEN,
            });
            if (!decoded || !decoded.userId) {
                throw new common_1.UnauthorizedException('Invalid or expired token');
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const users = await this.userModel.findById(decoded.userId);
            if (users?.isRevoked === true) {
                console.log("Password Already Updated");
                return;
            }
            const result = await this.userModel.findByIdAndUpdate(decoded.userId, { password: hashedPassword, isRevoked: true }, { new: true });
            if (!result) {
                throw new common_1.NotFoundException('User not Found');
            }
            await result.save();
            if (!result) {
                throw new common_1.NotFoundException('User not Found');
            }
            return { message: 'Password Updated Successfully' };
        }
        catch (err) {
            common_1.Logger.error(err);
            throw new common_1.InternalServerErrorException('Something went wrong');
        }
    }
    async Revoked(Id) {
        const userState = await this.userModel.findById(Id);
        if (!userState) {
            throw new common_1.NotFoundException("User Not Found");
        }
        return { isRevoked: userState?.isRevoked };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_model_1.Users.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
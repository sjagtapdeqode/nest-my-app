import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, SignupDto } from './dto';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(dto: SignupDto) {
    // generate password
    const saltOrRounds = 10;
    const passwordHash = await bcrypt.hash(dto.password, saltOrRounds);

    try {
      // create user to db
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          passwordHash,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
        select: {
          id: true,
          createdAt: true,
          email: true,
        },
      });
      return {
        message: 'Success',
        user,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials already taken!');
        }
      }
      throw error;
    }
  }
  async login(dto: LoginDto) {
    // find user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto?.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Incorrect credentials');
    }

    // compare password
    const passwordMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!passwordMatch) {
      throw new ForbiddenException('Incorrect credentials2');
    }

    delete user.passwordHash;

    return {
      message: 'Success',
      user,
    };
  }
}

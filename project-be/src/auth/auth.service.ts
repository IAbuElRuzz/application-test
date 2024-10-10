import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);  // Create a logger instance

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async signUp(name: string, email: string, password: string): Promise<User> {
    // Log the signup attempt
    this.logger.log(`Attempting to sign up user with email: ${email}`);

    // Validate password
    this.validatePassword(password);

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ name, email, password: hashedPassword });

    try {
      const savedUser = await newUser.save();
      this.logger.log(`Successfully signed up user with email: ${email}`);
      return savedUser;
    } catch (error) {
      this.logger.error(`Error signing up user with email: ${email}`, error.stack);
      throw new BadRequestException('Failed to sign up user');
    }
  }

  async signIn(email: string, password: string): Promise<User | null> {
    this.logger.log(`Attempting to sign in user with email: ${email}`);

    const user = await this.userModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      this.logger.log(`Successfully signed in user with email: ${email}`);
      return user;
    } else {
      this.logger.warn(`Failed login attempt for email: ${email}`);
      throw new BadRequestException('Invalid credentials');
    }
  }

  // Password validation logic
  validatePassword(password: string) {
    const minLength = 8;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength || !hasLetter || !hasNumber || !hasSpecialChar) {
      this.logger.warn('Password does not meet the security requirements');
      throw new BadRequestException('Password does not meet security requirements. It must be at least 8 characters long and contain at least one letter, one number, and one special character.');
    }
  }
}

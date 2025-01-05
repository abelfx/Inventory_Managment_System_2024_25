import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Res,
  Req,
  Get,
  UnauthorizedException,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './service/app.service';
import { ProductService } from './service/product.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly jwtService: JwtService,
    private readonly productService: ProductService,
  ) {}

  // Registration Controller
  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    // Check if user already exists
    const existingUser = await this.appService.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('Email is already in use');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const user = await this.appService.create({
      name,
      email,
      password: hashedPassword,
    });

    // Exclude password from the response
    const { password: _, ...result } = user.toObject();
    return result;
  }

  // Login Controller
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    // Find user by email
    const user = await this.appService.findOne({ email });

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    // Generate token
    const jwt = await this.jwtService.signAsync({ id: user._id });

    // Set cookie
    response.cookie('jwt', jwt, { httpOnly: true });

    return { status: 'Login successful!' };
  }

  // Get Authenticated User
  @Get('user')
  async users(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) throw new UnauthorizedException();

      // Find user by ID
      const user = await this.appService.findOne({ _id: data['id'] });

      if (!user) {
        throw new UnauthorizedException();
      }

      // Exclude password from the response
      const { password, ...response } = user.toObject();
      return response;
    } catch (error) {
      console.error(
        'An error occurred while getting authenticated users:',
        error,
      );
      throw new UnauthorizedException();
    }
  }

  // Logout Users
  @Get('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return { status: 'Logout successful!' };
  }

  /*-------------------------------------------------------*/

  @Post('addProduct')
  async addProduct(
    @Body('productId') productId: number,
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('catagory') catagory: string,
    @Body('price') price: number,
    @Body('quantityInStock') quantityInStock: number,
    @Body('imageURL') imageURL: string,
    @Body('createdAt') createdAt: Date,
    @Body('updatedAt') updatedAt: Date,
    @Body('supplierId') supplierId: number,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const product = await this.productService.add({
        productId,
        name,
        description,
        catagory,
        price,
        quantityInStock,
        imageURL,
        createdAt,
        updatedAt,
        supplierId,
      });

      return response.status(HttpStatus.CREATED).json({
        status: 'success',
        message: 'Product added successfully',
        data: product,
      });
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'error',
        message: 'Failed to add product',
        error: error.message,
      });
    }
  }

  // Get/View all product
  @Get('getProducts')
  async products(@Req() request: Request) {
    try {
      // Find user by ID
      const product = await this.productService.findAll();

      if (!product) {
        throw new UnauthorizedException();
      }

      return product;
    } catch (error) {
      console.error('An error occurred while getting  added products:', error);
      throw new UnauthorizedException();
    }
  }

  // Delete a product
  @Delete('deleteProduct/:id')
  async deleteProduct(@Param('_id') id: string, @Req() request: Request) {
    try {
      // Find producr by ID
      const product = await this.productService.findOne({ id });

      if (!product) {
        throw new UnauthorizedException();
      }

      await this.productService.deleteOne({ _id: product['id'] });

      return {
        status: 'deleted sucessfully',
      };
    } catch (error) {
      console.error('An error occurred while getting  added products:', error);
      throw new UnauthorizedException();
    }
  }
}

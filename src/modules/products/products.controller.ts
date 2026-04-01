import {
  Controller,
  Post,
  ValidationPipe,
  Body,
  Get,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './create-product.dto';
import { QueryProductDto } from './query-product.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Create a new product' })
  @Post()
  create(@Body(ValidationPipe) dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @ApiOperation({
    summary:
      'Get a list of products with pagination and optional category filter',
  })
  @Get()
  findAll(@Query(ValidationPipe) query: QueryProductDto) {
    return this.productService.findAll(query);
  }
}

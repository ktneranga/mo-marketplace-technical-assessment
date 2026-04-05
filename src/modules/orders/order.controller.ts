import {Controller, Post, Get, Body} from '@nestjs/common'
import {ApiOperation, ApiTags} from '@nestjs/swagger'
import {OrderService} from './order.service'
import {CreateOrderDto} from './create-order.dto'

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({summary: 'Create a new order (idempotent)'})
  @Post()
  async create(@Body() dto: CreateOrderDto) {
    return await this.orderService.create(dto);
  }

  @ApiOperation({summary: 'Get all orders'})
  @Get()
  async findAll() {
    return await this.orderService.findAll();
  }
}
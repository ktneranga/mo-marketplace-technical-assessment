import {Injectable} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Order } from './order.entity'
import { CreateOrderDto } from './create-order.dto'

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async create(dto: CreateOrderDto): Promise<Order> {
    const existingOrder = await this.orderRepository.findOne({
        where: { idempotencyKey: dto.idempotencyKey },
    });

    if(existingOrder){
        return existingOrder;
    }

    try {
        const order = this.orderRepository.create(dto);
        return await this.orderRepository.save(order);
    } catch (error: any) {
        if(error.code === '23505') {
            const existingOrder = await this.orderRepository.findOne({
                where: { idempotencyKey: dto.idempotencyKey },
            });
            return existingOrder!;
        }
        throw error;
    }
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({ order: { createdAt: 'DESC' } });
  }
}
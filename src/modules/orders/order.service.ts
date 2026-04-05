import {Injectable} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Order } from './order.entity'
import { CreateOrderDto } from './create-order.dto'
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private notificationsService: NotificationsService
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
        const saved = await this.orderRepository.save(order);

        await this.notificationsService.sendOrderNotification('user-device-token', saved.id);

        return saved;

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
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './create-order.dto';
export declare class OrderService {
    private orderRepository;
    constructor(orderRepository: Repository<Order>);
    create(dto: CreateOrderDto): Promise<Order>;
    findAll(): Promise<Order[]>;
}

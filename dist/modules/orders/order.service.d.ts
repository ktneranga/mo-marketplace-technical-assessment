import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './create-order.dto';
import { NotificationsService } from '../notifications/notifications.service';
export declare class OrderService {
    private orderRepository;
    private notificationsService;
    private readonly logger;
    constructor(orderRepository: Repository<Order>, notificationsService: NotificationsService);
    create(dto: CreateOrderDto): Promise<Order>;
    findAll(): Promise<Order[]>;
}

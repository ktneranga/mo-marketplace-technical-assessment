import { OrderService } from './order.service';
import { CreateOrderDto } from './create-order.dto';
export declare class OrdersController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(dto: CreateOrderDto): Promise<import("./order.entity").Order>;
    findAll(): Promise<import("./order.entity").Order[]>;
}

import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Order} from './order.entity';
import {OrderService} from './order.service';
import {OrdersController} from './order.controller';
import {NotificationsModule} from '../notifications/notification.module';

@Module({
    imports: [TypeOrmModule.forFeature([Order]), NotificationsModule],
    controllers: [OrdersController],
    providers: [OrderService],
})
export class OrdersModule {}
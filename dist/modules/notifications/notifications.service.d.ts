import { OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
export declare class NotificationsService implements OnModuleInit {
    private readonly configService;
    private readonly logger;
    constructor(configService: ConfigService);
    onModuleInit(): void;
    sendOrderNotification(token: string, orderId: string): Promise<void>;
}

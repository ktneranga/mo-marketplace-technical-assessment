import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as admin from "firebase-admin";

@Injectable()
export class NotificationsService implements OnModuleInit {
    private readonly logger = new Logger(NotificationsService.name);

    constructor(private readonly configService: ConfigService) {}

    onModuleInit() {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: this.configService.get<string>('FIREBASE_PROJECT_ID'),
                clientEmail: this.configService.get<string>('FIREBASE_CLIENT_EMAIL'),
                privateKey: this.configService.get<string>('FIREBASE_PRIVATE_KEY')?.replace(/\\n/g, '\n'),
            })
        });
        this.logger.log('Firebase initialized');
    }

    async sendOrderNotification(token: string, orderId: string): Promise<void> {
        const message: admin.messaging.Message = {
            token,
            notification: {
                title: 'Order confirmed',
                body: `Your order ${orderId} has been placed successfully!`,
            },
        };
        await admin.messaging().send(message);
        this.logger.log(`Notification sent for order ${orderId}`);  
    }

}
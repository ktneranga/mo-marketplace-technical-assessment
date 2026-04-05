"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var OrderService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./order.entity");
const notifications_service_1 = require("../notifications/notifications.service");
let OrderService = OrderService_1 = class OrderService {
    orderRepository;
    notificationsService;
    logger = new common_1.Logger(OrderService_1.name);
    constructor(orderRepository, notificationsService) {
        this.orderRepository = orderRepository;
        this.notificationsService = notificationsService;
    }
    async create(dto) {
        const existingOrder = await this.orderRepository.findOne({
            where: { idempotencyKey: dto.idempotencyKey },
        });
        if (existingOrder) {
            return existingOrder;
        }
        try {
            const order = this.orderRepository.create(dto);
            const saved = await this.orderRepository.save(order);
            try {
                await this.notificationsService.sendOrderNotification('user-device-token', saved.id);
            }
            catch {
                this.logger.warn('Notification failed - no valid FCM token');
            }
            return saved;
        }
        catch (error) {
            if (error.code === '23505') {
                const existingOrder = await this.orderRepository.findOne({
                    where: { idempotencyKey: dto.idempotencyKey },
                });
                return existingOrder;
            }
            throw error;
        }
    }
    async findAll() {
        return this.orderRepository.find({ order: { createdAt: 'DESC' } });
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = OrderService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        notifications_service_1.NotificationsService])
], OrderService);
//# sourceMappingURL=order.service.js.map
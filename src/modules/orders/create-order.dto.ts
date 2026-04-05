import {IsString, IsInt, Min} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CreateOrderDto {
    @ApiProperty({ example: 'unique-key-123'})
    @IsString()
    idempotencyKey!: string;

    @ApiProperty({example: 'product-uuid-123'})
    @IsString()
    productId!: string;

    @ApiProperty({example: 2})
    @IsInt()
    @Min(1)
    quantity!: number;

}
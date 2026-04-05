import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({unique: true})
  idempotencyKey!: string;

  @Column()
  productId!: string;

  @Column()
  quantity!: number;

  @Column({default: 'pending'})
  status!: string;

  @CreateDateColumn()
  createdAt!: Date;


}
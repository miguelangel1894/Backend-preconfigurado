import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
} from 'typeorm';

import { Product } from '../product/product.entity';

@Entity('store')
export class Store extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  storeName: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'varchar', length: 110, nullable: false })
  schedule: string;

  @Column({ type: 'varchar', nullable: false })
  profile: string;

  @Column({ type: 'float', nullable: false })
  stars: number;

  @Column({ type: 'varchar', nullable: false })
  deliveryHours: string;

  /* -----------Relación---------------------------- */
  @ManyToMany(
    type => Product,
    product => product.store,
  )
  @JoinTable({ name: 'store_products' })
  product: Product[];
  /* ----------------------------------------------- */

  @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
  status: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}

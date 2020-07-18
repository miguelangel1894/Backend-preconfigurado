import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinTable,
  ManyToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserDetail } from './user.detail.entity';
import { Store } from '../store/store.entity';
import { Role } from '../role/role.entity';
import { Book } from '../book/book.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', unique: true, length: 25, nullable: false })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  /* -----------Relación---------------------------- */
  @OneToOne(type => UserDetail, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'detail_id' })
  details: UserDetail;

  /* -----------Relación---------------------------- */
  @OneToOne(type => Store, {
    cascade: true,
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'store_id' })
  store: Store;

  /* ----------------------------------------------- */
  @ManyToMany(
    type => Role,
    role => role.user,
    { eager: true },
  )
  @JoinTable({ name: 'user_roles' })
  roles: Role[];

  /* ----------------------------------------------- */

  @ManyToMany(
    type => Book,
    book => book.authors,
  )
  @JoinTable({ name: 'user_books' })
  books: Book[];
  /* ----------------------------------------------- */

  @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
  status: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updateAt: Date;
}

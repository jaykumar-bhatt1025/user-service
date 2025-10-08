import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'users',
  orderBy: {
    id: 'DESC',
  },
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, default: () => 'uuid_generate_v4()', type: 'uuid' })
  uuid: string;

  @Column({ type: 'varchar' })
  first_name: string;

  @Column({ type: 'varchar' })
  last_name: string;

  @Column({ type: 'varchar', nullable: true, default: null })
  email: string;

  // @Column({ type: 'varchar' })
  // password: string;

  // @Column({ type: 'boolean', default: true })
  // is_active: boolean;

  // @Column({ type: 'varchar', length: 10, nullable: true, default: null })
  // email_otp: string;

  // @Column({ type: 'timestamp with time zone', nullable: true, default: null })
  // email_otp_expired_at: Date;

  // @Column({ type: 'timestamp with time zone', nullable: true, default: null })
  // email_verified_at: Date;

  @Column({ type: 'varchar', nullable: true, default: null })
  profile_photo: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    nullable: true,
    onUpdate: 'CURRENT_TIMESTAMP',
    default: null,
  })
  updated_at: Date;

  @DeleteDateColumn({
    type: 'timestamp with time zone',
    nullable: true,
    default: null,
  })
  deleted_at: Date;
}

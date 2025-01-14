import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("booking")
export class Booking extends BaseEntity {
  @PrimaryGeneratedColumn("uuid", { name: "booking_id" })
  booking_id!: string;

  @Column("varchar", { name: "booking_uid", unique: true, nullable: false })
  booking_uid!: string;

  @Column("varchar", { name: "customer_name", nullable: false })
  customer_name!: string;

  @Column("timestamptz", { name: "booking_date", nullable: false })
  booking_date!: Date;

  @Column("real", { name: "amount", nullable: false })
  amount!: number;

  @Column("varchar", { name: "vendor", nullable: false })
  vendor!: string;

  @Column("timestamptz", { name: "created_at", nullable: false })
  created_at!: Date;

  @Column("timestamptz", { name: "updated_at", nullable: true })
  updated_at!: Date;
}

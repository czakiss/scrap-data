import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Storage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "integer" })
  idData: number;

  @Column({ type: "decimal" })
  value: number;

  @Column({ type: "timestamp", nullable: false })
  date: Date;
}

import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Data {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  url: string;

  @Column({ type: "varchar" })
  selector: string;

  @Column({ type: "boolean" })
  isNumber: boolean;
}

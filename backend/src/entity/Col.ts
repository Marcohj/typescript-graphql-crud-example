import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { Entrypoint } from "./Entrypoint";

@ObjectType()
@Entity()
export class Col extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@Field(() => Int)
	position: number;

	@Field()
	@Column()
	column_name: string;

	@Field()
	@Column()
	project_column_name: string;

	@Field()
	@Column()
	regex: string;

  @ManyToOne(() => Entrypoint, entrypoint => entrypoint.cols)
  entrypoint: Entrypoint;

	@Column()
	entrypointId: number;
}

import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	OneToMany,
} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { Entrypoint } from "./Entrypoint";

@ObjectType()
@Entity()
export class Project extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	title: string;

	@Field(() => [Entrypoint])
	@OneToMany(() => Entrypoint, (entrypoint) => entrypoint.project, {
		lazy: true,
		onDelete: "CASCADE",
	})
	entrypoints: Entrypoint[];
}

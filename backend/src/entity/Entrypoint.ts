import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	ManyToOne,
	OneToMany,
} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { Project } from "./Project";
import { Col } from "./Col";

@ObjectType()
@Entity()
export class Entrypoint extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	title: string;

	@Field()
	@Column()
	url: string;

	@Field()
	@Column()
	hasHeaders: boolean;

	@Field({ nullable: true })
	@Column({ nullable: true })
	data: string;

	@Field(() => Project, { nullable: true })
	@ManyToOne(() => Project, (project) => project.entrypoints, {
		onDelete: "CASCADE",
	})
	project: Project;

	@Column()
	projectId: number;

	@Field(() => [Col], { nullable: true })
	@OneToMany(() => Col, (col) => col.entrypoint, { lazy: true, cascade: true })
	cols: Col[];
}

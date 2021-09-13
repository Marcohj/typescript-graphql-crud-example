import {
	Resolver,
	Mutation,
	Arg,
	Int,
	Query,
	InputType,
	Field,
} from "type-graphql";
import { Project } from "../entity/Project";

@InputType()
class ProjectInput {
	@Field()
	title: string;
}

@InputType()
class ProjectUpdateInput {
	@Field(() => String, { nullable: true })
	title?: string;
}

@Resolver()
export class ProjectResolver {
	@Mutation(() => Project)
	async createProject(@Arg("input", () => ProjectInput) input: ProjectInput) {
		const project = await Project.create(input).save();
		return project;
	}

	@Mutation(() => Boolean)
	async updateProject(
		@Arg("id", () => Int) id: number,
		@Arg("input", () => ProjectUpdateInput) input: ProjectUpdateInput
	) {
		await Project.update({ id }, input);
		return true;
	}

	@Mutation(() => Boolean)
	async deleteProject(@Arg("id", () => Int) id: number) {
		await Project.delete({ id });
		return true;
	}

	@Query(() => [Project])
	projects() {
		return Project.find();
	}
}

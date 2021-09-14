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

	@Mutation(() => Project)
	async updateProject(
		@Arg("id", () => Int) id: number,
		@Arg("input", () => ProjectUpdateInput) input: ProjectUpdateInput
	) {
		const project = await Project.update({ id }, input);
		return project;
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

	@Query(() => Project)
	async project(@Arg("id", () => Int) id: number) {
		const project = await Project.findOne({ id });
		console.log(project)
		return project;
	}
}

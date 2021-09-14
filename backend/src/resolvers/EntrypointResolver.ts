import {
	Resolver,
	Mutation,
	Arg,
	Int,
	Query,
	InputType,
	Field,
} from "type-graphql";
import { Entrypoint } from "../entity/Entrypoint";

@InputType()
class EntrypointInput {
	@Field()
	title: string;

	@Field()
	url: string;

	@Field()
	hasHeaders: boolean;

	@Field(() => Int)
	projectId: number;
}

@InputType()
class EntrypointUpdateInput {
	@Field()
	title?: string;

	@Field()
	url: string;

	@Field()
	hasHeaders: boolean;
}

@Resolver()
export class EntrypointResolver {
	@Mutation(() => Entrypoint)
	async createEntrypoint(
		@Arg("input", () => EntrypointInput) input: EntrypointInput
	) {
		console.log(input);
		const entrypoint = await Entrypoint.create(input).save();
		console.log(entrypoint);
		return entrypoint;
	}

	@Mutation(() => Entrypoint)
	async updateEntrypoint(
		@Arg("id", () => Int) id: number,
		@Arg("input", () => EntrypointUpdateInput) input: EntrypointUpdateInput
	) {
		const entrypoint = await Entrypoint.update({ id }, input);
		return entrypoint;
	}

	@Mutation(() => Entrypoint)
	async deleteEntrypoint(@Arg("id", () => Int) id: number) {
		const entrypoint = await Entrypoint.delete({ id });
		return entrypoint;
	}

	@Query(() => [Entrypoint])
	entrypoints() {
		return Entrypoint.find();
	}
}

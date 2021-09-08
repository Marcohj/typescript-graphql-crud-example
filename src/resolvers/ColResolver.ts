import {
	Resolver,
	Mutation,
	Arg,
	Int,
	Query,
	InputType,
	Field,
} from "type-graphql";
import { Col } from "../entity/Col";

@InputType()
class ColInput {
	@Field(() => Int)
	position: number;

	@Field()
	column_name: string;

	@Field()
	project_column_name: string;

  @Field(() => String, { nullable: true })
	regex?: string;

	@Field(() => Int)
	entrypointId: number;
}

@InputType()
class ColUpdateInput {
	@Field(() => Int)
	position: number;

	@Field()
	column_name: string;

	@Field()
	project_column_name: string;

  @Field(() => String, { nullable: true })
	regex?: string;
}

@Resolver()
export class ColResolver {
	@Mutation(() => Col)
	async createCol(@Arg("input", () => ColInput) input: ColInput) {
		const col = await Col.create(input).save();
		return col;
	}

	@Mutation(() => Col)
	async updateCol(
		@Arg("id", () => Int) id: number,
		@Arg("input", () => ColUpdateInput) input: ColUpdateInput
	) {
		const col = await Col.update({ id }, input);
		return col;
	}

	@Mutation(() => Col)
	async deleteCol(@Arg("id", () => Int) id: number) {
		const col = await Col.delete({ id });
		return col;
	}

	@Query(() => [Col])
	cols() {
		return Col.find();
	}
}

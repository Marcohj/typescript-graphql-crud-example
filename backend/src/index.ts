import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { ProjectResolver } from "./resolvers/ProjectResolver";
import { EntrypointResolver } from "./resolvers/EntrypointResolver";
import { ColResolver } from "./resolvers/ColResolver";

(async () => {
	const app = express();

	await createConnection();

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [ProjectResolver, EntrypointResolver, ColResolver],
		}),
		context: ({ req, res }) => ({ req, res }),
	});

	apolloServer.applyMiddleware({
		app,
		cors: {
			origin: "*", // <- allow request from all domains
			credentials: true,
		},
	});

	app.listen(4000, () => {
		console.log("express server started");
	});
})();

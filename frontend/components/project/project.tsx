import { gql, useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import React from "react";
import { useForm } from "../../hooks";
import { Form, Input } from "../form";

const PROJECT_QUERY = gql`
	query Project($id: Int!) {
		project(id: $id) {
			id
			title
			entrypoints {
				id
				title
				url
				hasHeaders
				data
			}
		}
	}
`;

const CREATE_ENTRYPOINT_MUTATION = gql`
	mutation CreateEntrypoint(
		$title: String!
		$url: String!
		$hasHeaders: Boolean!
		$projectId: Int!
	) {
		createEntrypoint(
			input: {
				title: $title
				url: $url
				hasHeaders: $hasHeaders
				projectId: $projectId
			}
		) {
			id
			title
			url
			hasHeaders
		}
	}
`;

const DELETE_ENTRYPOINT_MUTATION = gql`
	mutation DeleteProject($id: Int!) {
		deleteProject(id: $id)
	}
`;

const Project = ({ id }) => {
	const { loading, error, data, refetch } = useQuery(PROJECT_QUERY, {
		variables: {
			id,
		},
	});

	const [createEntrypoint] = useMutation(CREATE_ENTRYPOINT_MUTATION);
	const [_deleteEntrypoint] = useMutation(DELETE_ENTRYPOINT_MUTATION);

	const form = useForm({ title: "", url: "", hasHeaders: "true" }, (values) =>
		handleCreateEntrypoint(values)
	);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	const { project } = data;

	const handleCreateEntrypoint = (values: any) => {
		createEntrypoint({
			variables: {
				...values,
				hasHeaders: values.hasHeaders === "true",
				projectId: id,
			},
		}).then(() => {
			form.formClear()
			refetch();
		});
	};

	return (
		<div>
			<h2>Project: {project.title}</h2>
			<div className="mb-3" />

			<h3>Entrypoints</h3>
			<div className="grid">
				{project?.entrypoints.map((entrypoint) => (
					<div className="g-col-6" key={entrypoint.id}>
						<div className="card rounded-3 shadow-sm">
							<div className="card-body">
								<Link href={`/entrypoint/${entrypoint.id}`}>
									<a>{entrypoint.title}</a>
								</Link>
								<p>{entrypoint.url}</p>
								<p>{entrypoint.hasHeaders ? "Has headers" : "No headers"}</p>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className="mb-3" />
			<h3>Create entrypoint</h3>
			<Form onSubmit={form.formOnSubmit}>
				<div className="mb-2">
					<Input
						type="text"
						name="title"
						value={form.formValues.title}
						onChange={form.formOnChange}
					/>
				</div>
				<div className="mb-2">
					<Input
						type="text"
						name="url"
						value={form.formValues.url}
						onChange={form.formOnChange}
					/>
				</div>
				<div className="mb-2">
					<Input
						type="text"
						name="hasHeaders"
						value={form.formValues.hasHeaders}
						onChange={form.formOnChange}
					/>
				</div>
				<button className="btn btn-primary" type="submit">
					Create entrypoint
				</button>
			</Form>
		</div>
	);
};

export default Project;

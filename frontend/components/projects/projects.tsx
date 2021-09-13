import { gql, useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import React from "react";
import { useForm } from "../../hooks";
import { Form, Input } from "../form";

const PROJECTS_QUERY = gql`
	query {
		projects {
			id
			title
		}
	}
`;

const CREATE_PROJECT_MUTATION = gql`
	mutation CreateProject($title: String!) {
		createProject(input: { title: $title }) {
			id
			title
		}
	}
`;

const Projects = () => {
	const { loading, error, data, refetch } = useQuery(PROJECTS_QUERY);

	const [createProject] = useMutation(CREATE_PROJECT_MUTATION);

	const form = useForm({ title: "" }, (values) =>
		handleCreateProject(values.title)
	);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	const { projects } = data;

	const handleCreateProject = (title: string) => {
		createProject({
			variables: { title },
		}).then(() => refetch);
	};

	return (
		<div>
			<hr />
			<h2>Projects</h2>
			<div className="list-group">
				{projects?.map(({ id, title }) => (
					<Link href={`/projects/${id}`} key={id}>
						<a className="list-group-item">{title}</a>
					</Link>
				))}
			</div>
			<hr />
			<h2>Create project</h2>
			<Form onSubmit={form.formOnSubmit}>
				<Input
					name="title"
					value={form.formValues.title}
					onChange={form.formOnChange}
				/>
				<button className="btn btn-primary" type="submit">
					Create Project
				</button>
			</Form>
		</div>
	);
};

export default Projects;

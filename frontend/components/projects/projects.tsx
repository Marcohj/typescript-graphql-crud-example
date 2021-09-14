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

const DELETE_PROJECT_MUTATION = gql`
	mutation DeleteProject($id: Int!) {
		deleteProject(id: $id)
	}
`;

const Projects = () => {
	const { loading, error, data, refetch } = useQuery(PROJECTS_QUERY);

	const [createProject] = useMutation(CREATE_PROJECT_MUTATION);
	const [deleteProject] = useMutation(DELETE_PROJECT_MUTATION);

	const form = useForm({ title: "" }, (values) =>
		handleCreateProject(values.title)
	);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	const { projects } = data;

	const handleCreateProject = (title: string) => {
		createProject({
			variables: { title },
		}).then(() => {
			refetch();
			form.formClear;
		});
	};

	const handleDeleteProject = (id: string) => {
		deleteProject({
			variables: { id },
		}).then(() => {
			refetch();
			form.formClear;
		});
	};

	return (
		<div>
			<h2>Projects</h2>
			<div className="grid">
				{projects?.map(({ id, title }) => (
					<div className="g-col-6" key={id}>
						<div className="card mb-4 rounded-3 shadow-sm">
							<div className="card-body">
								<Link href={`/projects/${id}`}>
									<a>{title}</a>
								</Link>
							</div>
							<div className="card-footer">
								<button
									className="btn btn-outline-danger"
									onClick={() => handleDeleteProject(id)}
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className="mb-3" />
			<h2>Create project</h2>
			<Form onSubmit={form.formOnSubmit}>
				<div className="mb-2">
					<Input
						name="title"
						value={form.formValues.title}
						onChange={form.formOnChange}
					/>
				</div>
				<button className="btn btn-primary" type="submit">
					Create Project
				</button>
			</Form>
		</div>
	);
};

export default Projects;

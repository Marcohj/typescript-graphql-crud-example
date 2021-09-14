import React from "react";
import Project from "components/project/project";
import Layout from "components/layout";
import { useRouter } from "next/dist/client/router";

export default function ProjectPage() {
	const router = useRouter();
	const { id } = router.query;
  const projectId = parseInt(id as string)

  return (
		<Layout>
			<Project id={projectId} />
		</Layout>
	);
}

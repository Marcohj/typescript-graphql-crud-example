import React from "react";
import Layout from "../components/layout";
import Projects from "../components/projects/projects";

export default function Home() {
	return (
		<Layout home>
			<Projects />
		</Layout>
	);
}

import Link from "next/link";

export default function Layout({
	children,
	home,
}: {
	children: React.ReactNode;
	home?: boolean;
}) {
	return (
		<div className="container">
			<header>
				<h1>CSV 2 API</h1>
			</header>
			<main>{children}</main>
			{!home && (
					<Link href="/">
						<a>← Back to home</a>
					</Link>
			)}
		</div>
	);
}

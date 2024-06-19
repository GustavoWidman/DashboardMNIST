import { HeaderSegment } from "./types";
import Link from "next/link"

export default function MainNav({ segments }: Readonly<{ segments: HeaderSegment[] }>) {

  	return (
		<nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
			{segments.map((segment, index) => (
				<Link
					key={index}
					href={segment.href || "#"}
					className={`${
						segment.logo // if logo
							// logo css
							? "flex items-center gap-2 text-lg font-semibold md:text-base"
							: segment.selected // else if selected
								// selected css
								? "text-foreground transition-colors hover:text-foreground"
								// default css
								: "text-muted-foreground transition-colors hover:text-foreground"
					}`}
					style={{ whiteSpace: "nowrap" }}
				>
					{segment.node}
				</Link>
			))}
		</nav>
  	);
}
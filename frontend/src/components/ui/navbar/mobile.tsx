import {
	Menu,
	Package2,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from '@/src/components/ui/sheet';

import { Button } from '@/src/components/ui/button';
import { HeaderSegment } from "./types";
import Link from "next/link";

export default function MobileNav({ segments }: Readonly<{ segments: HeaderSegment[] }>) {
  return (
    <Sheet>
		<SheetTrigger asChild>
			<Button
			variant="outline"
			size="icon"
			className="shrink-0 md:hidden"
			>
				<Menu className="h-5 w-5" />
				<span className="sr-only">Toggle navigation menu</span>
			</Button>
		</SheetTrigger>
		<SheetContent side="left">
			<nav className="grid gap-6 text-lg font-medium">
				{segments.map((segment, index) => (
					<Link
						key={index}
						href={segment.href || "#"}
						className={`${
							segment.logo // if logo
								// logo css
								? "flex items-center gap-2 text-lg font-semibold"
								: segment.selected // else if selected
									// selected css
									? "text-foreground transition-colors hover:text-foreground"
									// default css
									: "text-muted-foreground transition-colors hover:text-foreground"
						}`}
					>
						{segment.node}
					</Link>
				))}
			</nav>
		</SheetContent>
	</Sheet>
  );
}
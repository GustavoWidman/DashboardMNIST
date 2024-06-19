import { HeaderSegment } from "./types";
import MainNav from './main';
import MobileNav from './mobile';
import { ModeToggle } from "../mode-toggle";

export default function SiteHeader({ segments, auto_selected }: Readonly<{ segments: HeaderSegment[], auto_selected?: boolean }>) {
	// if (auto_selected) {
	// 	const path = window.location.pathname;
	// 	const selected = segments.find(segment => segment.href === path);
	// 	if (selected) {
	// 		segments = segments.map(segment => {
	// 			segment.selected = segment === selected;
	// 			return segment;
	// 		});
	// 	}
	// }

	return (
		<header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
			<MainNav segments = {segments} />
			<MobileNav segments = {segments} />
			<div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
				<div className="ml-auto flex-1 sm:flex-initial">
					<ModeToggle />
				</div>
			</div>
		</header>
	);
}
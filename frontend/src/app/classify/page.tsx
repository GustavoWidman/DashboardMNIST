import { ModelForm } from "../../components/ui/model-form";

export default function Classify() {
	return (
		<div className="flex min-h-screen w-full flex-col">
			<main className="
				flex flex-1 flex-row items-center justify-center gap-4 p-4 md:gap-8 md:p-8 mb-20
			">
				<ModelForm />
			</main>
		</div>
	);
}

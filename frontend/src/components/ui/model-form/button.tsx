import { Button } from "../button";

export function ModelFormButton({ loading }: { loading: boolean }) {
  	return (
		<Button
			className="w-full transition-all duration-500"
			disabled = {loading}
			type = "submit"
		>
			Classificar
		</Button>
	)
}

import {
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/src/components/ui/form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"

import { Label } from "@/src/components/ui/label";
import { UseFormReturn } from "react-hook-form";

export function SelectModel({ form, disabled }: {
	form: UseFormReturn<{
		model: "linear" | "lenet";
		image: File[];
	}, any, undefined>,
	disabled: boolean
}) {
  	return (
		<FormField
			control={form.control}
			name="model"
			render={({ field }) => (
			<FormItem className="grid gap-2">
				<Label htmlFor="model">Modelos</Label>
				<Select onValueChange={field.onChange} defaultValue={field.value} disabled={disabled}>
					<FormControl>
						<SelectTrigger className="">
							<SelectValue placeholder="Selecione um modelo" />
						</SelectTrigger>
					</FormControl>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Modelos</SelectLabel>
							<SelectItem value="linear">Linear</SelectItem>
							<SelectItem value="lenet">LeNet-5</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
				<FormMessage />
			</FormItem>
		)}
	/>
	)
}

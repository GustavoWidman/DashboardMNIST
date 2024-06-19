import { FormControl, FormField, FormItem, FormMessage } from "@/src/components/ui/form";

import { FileUploader } from "@/src/components/ui/file-uploader";
import { Label } from "@/src/components/ui/label";
import { UseFormReturn } from "react-hook-form";

export function FileInput({ form, disabled }: {
	form: UseFormReturn<{
		model: "linear" | "lenet";
		image: File[];
	}, any, undefined>,
	disabled: boolean,
}) {
	return (
		<FormField
			control={form.control}
			name="image"
			render={({ field }) => (
				<FormItem className="grid gap-2">
					<Label htmlFor="image" >Imagem</Label>
					<FormControl>
						<FileUploader
							value={field.value}
							onValueChange={field.onChange}
							disableRemove={disabled}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
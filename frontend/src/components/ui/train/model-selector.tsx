import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/src/components/ui/select";
import { Label } from "@/src/components/ui/label";

import React, { ChangeEvent } from 'react';

export function ModelSelector({
	setModel,
}: {
	setModel: React.Dispatch<React.SetStateAction<"linear" | "lenet">>
}) {

	return (
		<>
			<Label htmlFor="model">Modelo</Label>
			<div id="model">
				<Select
					// onValueChange={field.onChange}
					onValueChange={(value: string) => {
						setModel(value as "linear" | "lenet");
					}}
					defaultValue={"linear"}
					// disabled={disabled}
				>
					{/* <FormControl> */}

					<SelectTrigger className="">
						<SelectValue placeholder="Selecione um modelo" />
					</SelectTrigger>
					{/* </FormControl> */}
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Modelos</SelectLabel>
							<SelectItem value="linear">Linear</SelectItem>
							<SelectItem value="lenet">LeNet-5</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
		</>
	);
}

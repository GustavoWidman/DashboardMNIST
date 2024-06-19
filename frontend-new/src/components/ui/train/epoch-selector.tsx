"use client";

import * as React from "react";
import { SliderProps } from "@radix-ui/react-slider";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "../hover-card";
import { Label } from "../label";
import { Slider } from "../slider";

interface EpochSelectorProps {
	value: number[];
	setValue: React.Dispatch<React.SetStateAction<number[]>>;
}

export function EpochSelector({ value, setValue, }: EpochSelectorProps) {
	return (
		<div className="grid gap-2 pt-2">
			<HoverCard openDelay={200}>
				<HoverCardTrigger asChild>
					<div className="grid gap-4">
						<div className="flex items-center justify-between">
							<Label htmlFor="epoch">Épocas</Label>
							<span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
								{value}
							</span>
						</div>
						<Slider
							id="epoch"
							max={100}
							defaultValue={value}
							step={1}
							onValueChange={setValue}
							className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
							aria-label="Épocas"
						/>
					</div>
				</HoverCardTrigger>
				<HoverCardContent
					align="start"
					className="w-[260px] text-sm"
					side="left"
				>
					Esse valor define a quantidade de épocas que a rede neural
					irá percorrer durante o treinamento. Uma época é uma
					passagem completa por todo o conjunto de dados de
					treinamento. Quanto maior o número de épocas, mais tempo o
					modelo terá para aprender os padrões.
				</HoverCardContent>
			</HoverCard>
		</div>
	);
}

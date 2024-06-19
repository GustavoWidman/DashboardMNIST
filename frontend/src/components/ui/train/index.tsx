"use client";

import { Button } from "../button";
import { Textarea } from "../textarea";
import { ModelSelector } from "./model-selector";
import { EpochSelector } from "./epoch-selector";
import { BACKEND } from "@/src/constants";
import { toast } from "sonner";
import React, { useState, useEffect, useRef } from "react";

export default function TrainComponent() {
	const [results, setResults] = useState("");
	const [model, setModel] = useState<"lenet" | "linear">("linear");
	const [epochs, setEpochs] = useState([5]);
	const textareaRef = useRef(null);

	function addResults(data: string) {
		setResults((prev) => prev + `${data}\n`);
	}

	function train() {
		setResults("");

		const websocket = new WebSocket(`${BACKEND}/${model}/train`);

		websocket.onopen = () => {
			toast.info("Treinamento iniciado", {
				description: "O treinamento foi iniciado, consulte os logs para mais informações",
			});
			websocket.send(JSON.stringify({ epochs: epochs[0] }));
		}

		websocket.onmessage = (event) => {
			addResults(JSON.parse(event.data).message);
		};
	}

	function save() {
		fetch(`${BACKEND}/${model}/save`)
			.then((response) => {
				if (!response.ok) {
					throw new Error(response.statusText);
				}

				return response.json();
			})
			.then((data) => {
				fetch(`${BACKEND}/${model}/download`)
				.then((response) => {
					if (!response.ok) {
						throw new Error(response.statusText);
					}
					return response.blob();
				})
				.then((blob) => {
					const url = window.URL.createObjectURL(blob);
					const a = document.createElement("a");
					a.href = url;
					a.download = `${model}.h5`;
					a.click();
					window.URL.revokeObjectURL(url);

					toast.success("Modelo salvo com sucesso", {
						description: "O modelo foi salvo com sucesso",
					});
				})
				.catch((error) => {
					toast.error("Erro ao baixar modelo", {
						description: error.message,
					});
				});
			})
			.catch((error) => {
				toast.error("Erro ao salvar modelo", {
					description: error.message,
				})
			});
		console.log(model)
		console.log(epochs)
	}

	// make it so that whenever setResults is called, the textarea scrolls to the bottom
	useEffect(() => {
		if (textareaRef.current) {
			(textareaRef.current as HTMLTextAreaElement).scrollTop = (textareaRef.current as HTMLTextAreaElement).scrollHeight;
		}
	}, [results]);

	return (
		<div className="container h-full p-6">
			<div className="grid h-full items-strech gap-6 md:grid-cols-[1fr_200px]">
				<div className="flex h-full flex-col space-y-4">
					<Textarea
						placeholder="Informações de treinamento"
						className="min-h-[600px] flex-1 p-4"
						disabled={true}
						value={results}
						ref={textareaRef}
					/>
					<div className="flex items-center space-x-2">
						<Button onClick={train}>Treinar</Button>
						<Button variant="secondary" onClick={save}>Salvar modelo</Button>
					</div>
				</div>
				<div>
					<div>
						<ModelSelector setModel={setModel} />
					</div>
					<div>
						<EpochSelector value={epochs} setValue={setEpochs} />
					</div>
				</div>
			</div>
		</div>
	);
}

"use client"

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/src/components/ui/card"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/src/components/ui/dialog"
import { ReactNode, useState } from "react";
import { set, useForm } from "react-hook-form"

import { BACKEND } from "../../../constants";
import { FileInput } from "./input";
import { Form } from "@/src/components/ui/form"
import Image from "next/image";
import { Label } from "../label";
import { ModelFormButton } from "./button";
import { SelectModel } from "./select";
import { toast } from "sonner";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

export function ModelForm() {
	const [loading, setLoading] = useState(false)
	const [showModal, setShowModal] = useState(false)
	const [modalContent, setModalContent] = useState<ReactNode>("")
	const [modelInput, setModelInput] = useState<string>("")

	const formSchema = z.object({
		image: z
			.array(
				z.instanceof(File, { message: 'Uma imagem deve ser selecionada' }),
				{ message: 'Uma imagem deve ser selecionada' }
			)
			.min(1, { message: 'Uma imagem deve ser selecionada' }),
		model: z.union([
			z.literal('linear', { message: 'Selecione um modelo' }),
			z.literal('lenet', { message: 'Selecione um modelo' }),
		], { message: 'Selecione um modelo' })
	})


	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})


	const successResponse = z.object({
		prediction: z.number(),
		probability: z.number(),
		input: z.string(),
		time: z.number(),
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true)
		toast.info("Classificando imagem.", {
			description: "Aguarde enquanto a imagem é classificada...",
		})

		const form_data = new FormData()
		form_data.append('file', values.image[0])
		fetch(`${BACKEND}/${values.model}/predict`, {
			method: 'POST',
			body: form_data,
		})
			.then(response => {
				setLoading(false)
				if (!response.ok) {
					throw new Error(response.statusText)
				}

				toast.success("Imagem classificada.", {
					description: "A imagem foi classificada com sucesso.",
				})

				return response.json()
			})
			.then(json => successResponse.parse(json))
			.then(data => {
				setModalContent(
					<>
						A imagem foi classificada como o número <strong>{data.prediction}</strong> com uma probabilidade de <strong>{Math.round(data.probability * 100)}%</strong>. O modelo levou <strong>{data.time.toFixed(2)}ms</strong> para classificar a imagem.
						{data.probability < 0.5 ? (
							<>
								<br></br>
								<br></br>
								<span className="text-red-500">
									A probabilidade é muito baixa, tente novamente com outra imagem ou com outro modelo.
								</span>
							</>
						) : null}
					</>
				)
				setModelInput(`data:image/png;base64,${data.input}`)

				setShowModal(true)
			})
			.catch(error => {
				toast.error("Erro ao classificar a imagem.", {
					description: error.message,
				})
		})
	}

	return (
		<Card className="w-full max-w-fit flex justify-center">
			<div className='flex flex-row justify-between'>
				<div className='flex flex-col'>
					<CardHeader>
						<CardTitle className="text-2xl">Usar modelos pré-treinados</CardTitle>
						<CardDescription>
							Insira a imagem que deseja classificar
						</CardDescription>
					</CardHeader>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<CardContent className="grid gap-4">
								<FileInput form={form} disabled={loading}/>
								<SelectModel form={form} disabled={loading} />
							</CardContent>
							<CardFooter>
								<ModelFormButton loading={loading} />
							</CardFooter>
						</form>
					</Form>
				</div>
			</div>
			<Dialog open={showModal} onOpenChange={setShowModal}>
				<DialogContent>
					<DialogHeader className='flex flex-col items-center'>
						<DialogTitle>Resposta do modelo</DialogTitle>
						<DialogDescription className='pb-5'>
							{modalContent}
						</DialogDescription>
						<Image src={modelInput} alt="Imagem transformada" width={300} height={300} about="Imagem transformada" className='rounded-md' />
						<Label>Imagem transformada</Label>
					</DialogHeader>
				</DialogContent>
			</Dialog>

		</Card>
	)
}

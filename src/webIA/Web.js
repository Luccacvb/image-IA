import React, { useRef, useEffect, useState } from 'react'

import * as tf from '@tensorflow/tfjs'
import * as mobilenet from '@tensorflow-models/mobilenet'
import * as knnClassifier from '@tensorflow-models/knn-classifier'

import { Button, Stack, Paper, Box, styled, LinearProgress } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

function Web() {
	const webcamRef = useRef(null)
	const classifierRef = useRef(knnClassifier.create())
	const [net, setNet] = useState(null)
	const [capture, setCapture] = useState('')
	const [probability, setProbability] = useState('')

	const loadModel = async () => {
		const net = await mobilenet.load()
		setNet(net)
	}

	const setupWebcam = async () => {
		if (navigator.mediaDevices.getUserMedia) {
			const stream = await navigator.mediaDevices.getUserMedia({ video: true })
			webcamRef.current.srcObject = stream
			return new Promise(resolve => {
				webcamRef.current.onloadedmetadata = () => {
					resolve()
				}
			})
		}
	}

	useEffect(() => {
		loadModel()
		setupWebcam()
	}, [])

	const addExample = async classId => {
		if (webcamRef.current && net) {
			const img = await tf.browser.fromPixels(webcamRef.current)
			const activation = net.infer(img, true)

			classifierRef.current.addExample(activation, classId)

			img.dispose()
		}
	}

	useEffect(() => {
		const predict = async () => {
			if (webcamRef.current && net && classifierRef.current.getNumClasses() > 0) {
				const img = await tf.browser.fromPixels(webcamRef.current)
				const activation = net.infer(img, 'conv_preds')
				const result = await classifierRef.current.predictClass(activation)

				const classes = ['Rosto', 'Celular', 'Garrafa']
				setCapture(`Captura: ${classes[result.label]}`)
				setProbability(` Probabilidade: ${result.confidences[result.label]}`)

				img.dispose()
			}
		}

		const interval = setInterval(() => {
			predict()
		}, 500)
		return () => clearInterval(interval)
	}, [net])

	const Item = styled(Paper)(({ theme }) => ({
		...theme.typography.body2,
		textAlign: 'center',
		color: theme.palette.text.secondary,
		height: 60,
		lineHeight: '60px',
		width: 350,
	}))

	console.log(net)
	return (
		<div className="App">
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'flex-start',
					paddingTop: '10px',
				}}
			>
				<video
					ref={webcamRef}
					autoPlay
					playsInline
					muted
					width="224"
					height="224"
					style={{
						width: '1000px',
						height: 'auto',
						maxWidth: '100%',
						marginBottom: 40,
					}}
				/>
				{net === null ? (
					<LinearProgress style={{ width: '30%' }} />
				) : (
					<Stack direction="row" spacing={2}>
						<Button
							variant="contained"
							endIcon={<SendIcon style={{ marginBottom: 2 }} />}
							onClick={() => addExample(0)}
						>
							Enviar Rosto
						</Button>
						<Button
							variant="contained"
							endIcon={<SendIcon style={{ marginBottom: 2 }} />}
							onClick={() => addExample(1)}
						>
							Enviar Celular
						</Button>
						<Button
							variant="contained"
							endIcon={<SendIcon style={{ marginBottom: 2 }} />}
							onClick={() => addExample(2)}
						>
							Enviar Garrafa
						</Button>
					</Stack>
				)}
				<br />
				{capture && (
					<Box
						sx={{
							p: 2,
							borderRadius: 2,
							bgcolor: 'primary.main',
							color: 'primary.contrastText',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: 2,
							transform: 'scale(1.1)',
							transition: 'transform 0.3s',
							'&:hover': {
								transform: 'scale(1.2)',
							},
							marginTop: 3,
						}}
					>
						<Item elevation={6} sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
							{capture}
						</Item>
						<Item elevation={6} sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
							{probability}
						</Item>
					</Box>
				)}
			</div>
		</div>
	)
}

export default Web

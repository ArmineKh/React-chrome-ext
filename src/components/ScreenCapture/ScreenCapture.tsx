import html2canvas from "html2canvas";
import s from './ScreenCapture.module.css'
import {FC, ReactElement, useEffect, useState} from "react";
import classNames from "classnames";

type ScreenCapturePropsType = {
	onStartCapture?: () => void,
	children?: ReactElement | Function
}
const ScreenCapture: FC<ScreenCapturePropsType> = ({ onStartCapture, children}) => {


	const [on, setOn] = useState(false)
	const [startX, setStartX] = useState(0)
	const [startY, setStartY] = useState(0)
	const [crossHairsTop, setCrossHairsTop] = useState(0)
	const [crossHairsLeft, setCrossHairsLeft] = useState(0)
	const [isMouseDown, setIsMouseDown] = useState(false)
	const [windowWidth, setWindowWidth] = useState(0)
	const [windowHeight, setWindowHeight] = useState(0)
	const [borderWidth, setBorderWidth] = useState<number | string>(0)
	const [cropPositionTop, setCropPositionTop] = useState(0)
	const [cropPositionLeft, setCropPositionLeft] = useState(0)
	const [cropWidth, setCropWidth] = useState(0)
	const [cropHeigth, setCropHeigth] = useState(0)

	useEffect(() => {
		handleWindowResize()
		window.addEventListener('resize', handleWindowResize)

		return(
			window.removeEventListener('resize', handleWindowResize)
		)
	}, [])
	

	const handleWindowResize = () => {
		const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		

		setWindowWidth(windowWidth)
		setWindowHeight(windowHeight)
	}

	const handStartCapture = () => setOn(true)
	
	const handleMouseDown = (e: MouseEvent): void => {
		const startX = e.clientX
		const startY = e.clientY
		setStartX(prevState => startX)
		setStartY(prevState => startY)
		setCropPositionTop(prevState => startY)
		setCropPositionLeft(prevState => startX)
		setIsMouseDown(prevState => true)
		setBorderWidth(prevState => `${windowWidth}px ${windowHeight}px`)

	}
	
	const handleMouseMove = (e: MouseEvent): void => {
		let cropPositionTop = startY
		let cropPositionLeft = startX
		const endX = e.clientX
		const endY = e.clientY
		const isStartTop = endY >= startY
		const isStartBottom = endY <= startY
		const isStartLeft = endX >= startX
		const isStartRight = endX <= startX
		const isStartTopLeft = isStartTop && isStartLeft
		const isStartTopRight = isStartTop && isStartRight
		const isStartBottomLeft = isStartBottom && isStartLeft
		const isStartBottomRight = isStartBottom && isStartRight
		let newBorderWidth = borderWidth
		let cropWidthLocal = 0
		let cropHeigthLocal = 0

		if (isMouseDown) {
			if (isStartTopLeft) {
				newBorderWidth = `${startY}px ${windowWidth - endX}px ${windowHeight - endY}px ${startX}px`
				cropWidthLocal = endX - startX
				cropHeigthLocal = endY - startY
			}

			if (isStartTopRight) {
				newBorderWidth = `${startY}px ${windowWidth - startX}px ${windowHeight - endY}px ${endX}px`
				cropWidthLocal = startX - endX
				cropHeigthLocal = endY - startY
				cropPositionLeft = endX
			}

			if (isStartBottomLeft) {
				newBorderWidth = `${endY}px ${windowWidth - endX}px ${windowHeight - startY}px ${startX}px`
				cropWidthLocal = endX - startX
				cropHeigthLocal = startY - endY
				cropPositionTop = endY
			}

			if (isStartBottomRight) {
				newBorderWidth = `${endY}px ${windowWidth - startX}px ${windowHeight - startY}px ${endX}px`
				cropWidthLocal = startX - endX
				cropHeigthLocal = startY - endY
				cropPositionLeft = endX
				cropPositionTop = endY
			}
		}
		
		setCrossHairsTop(e.clientY)
		setCrossHairsLeft(e.clientX)
		setBorderWidth(newBorderWidth)
		setCropWidth(cropWidthLocal)
		setCropHeigth(cropHeigthLocal)
		setCropPositionTop(cropPositionTop)
		setCropPositionLeft(cropPositionLeft)
	}

	const handleMouseUp = () => {
		handleClickTakeScreenShot()
		setOn(false)
		setIsMouseDown(prevstate => false)
		setBorderWidth(0)
	}

	const handleClickTakeScreenShot = () => {
		const rootElement = document.getElementById('root')
		const el1: HTMLElement = rootElement!;
		html2canvas(el1).then(canvas => {
			
			let croppedCanvas = document.createElement('canvas')
			let croppedCanvasContext = croppedCanvas.getContext('2d')

			croppedCanvas.width = cropWidth;
			croppedCanvas.height = cropHeigth;

			croppedCanvasContext?.drawImage(canvas, cropPositionLeft, cropPositionTop, cropWidth, cropHeigth, 0, 0, cropWidth, cropHeigth);
			
			let imageUrl = croppedCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
			
			/*onEndCapture(imageUrl)*/

			let aLink = document.createElement('a')
			aLink.href = imageUrl
			aLink.download = 'fileName.jpg';
			aLink.click()
			
		})
	}

	const renderChild = () => {
		onStartCapture = handStartCapture
		const props = {
			onStartCapture: handStartCapture
		}

		if (typeof children === 'function') return (children as Function)(props) 
		return (children as ReactElement)
	}

	if (!on) return renderChild()
	
	
	return (
		<div
			onMouseMove={(e) => handleMouseMove(e.nativeEvent) }
			onMouseDown={(e) => handleMouseDown(e.nativeEvent)}
			onMouseUp={handleMouseUp}
		>
			{renderChild()}
			<div
				className={classNames(s.overlay, {
					[s.highlighting]: isMouseDown,
				})}
				style={{ borderWidth }}
			/>
			<div
				className={s.crosshairs}
				style={{ left: crossHairsLeft + 'px', top: crossHairsTop + 'px' }}
			/>
		</div>
	)
}
ScreenCapture.defaultProps = {
	onStartCapture: () => null
}
export default ScreenCapture
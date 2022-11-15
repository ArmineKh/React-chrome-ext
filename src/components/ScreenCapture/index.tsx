import {FC, ReactComponentElement, ReactElement, useState} from "react";
import ScreenCapture from "./ScreenCapture";

const Index: FC = () => {

	return(
		<ScreenCapture >
			{({onStartCapture}:any) => (
				<>
					<button onClick={onStartCapture}>Capture</button>
					<br/>
					<br/>
				</>
			)}
		</ScreenCapture>
	);
}
export default Index
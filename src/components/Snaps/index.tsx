import React, {FC, ReactElement} from 'react'

// types
import { SnapsPropsType } from './Snaps.type'

// styles
import s from './Snap.module.css'
import ScreenCapture from "../ScreenCapture/ScreenCapture";

const Snaps: FC<SnapsPropsType> = ({ handleActive }) => {
  return (
        <div className={s.snaps}>
            <div className={s.snap} onClick={handleActive}>
                <img src="/images/Cursor.png" alt='Cursor'/>
                <div className={s.snapTitle}>Snap Element</div>
                <div className={s.snapSubtitle}>Click to capture</div>
            </div>
          <ScreenCapture >
            {({onStartCapture}:any) => (
            <div className={s.snap} onClick={onStartCapture}>
                <img src="/images/Crop.png" alt="Crop"/>
                <div className={s.snapTitle}>Snap Area</div>
                <div className={s.snapSubtitle}>Drag to capture</div>
            </div>
            )}
          </ScreenCapture>
        </div>
  )
}

export default Snaps

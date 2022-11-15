import React, { FC, useState } from 'react'
import classNames from 'classnames'

// styles
import s from './InstantBlock.module.css'

const InstantBlock: FC<unknown> = () => {
  const [instantChecked, setInstantChecked] = useState<boolean>(true)

  const handleChange = (): void => {
    setInstantChecked(() => !instantChecked)
  }

  return (
        <div className={s.instantBlock}>
            <div className={s.instantSnap}>
                <div className={s.instantSnapTitle}>Instant Snap</div>
                <img src="/images/Info.png" alt="Info"/>
            </div>
            <div>
                <label className={s.switch}>
                    <input type="checkbox" defaultChecked={instantChecked} onChange={handleChange}/>
                    <span className={classNames([s.slider, s.round])}></span>
                </label>
            </div>
        </div>
  )
}

export default InstantBlock

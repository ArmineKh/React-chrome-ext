import React from 'react'

// styles
import s from './Header.module.css'

const Header = (): JSX.Element => {
  return (
        <div className={s.header}>
            <div className={s.vector}>
                <img src="/images/Subtract.png" alt="Subtract"/>
                <h1 className={s.title}>Snap</h1>
            </div>
            <div className={s.avatar}><span>AA</span></div>
            <div className={s.border}></div>
            <div className={s.settings}>
                <img src="/images/GearSix.png" alt="GearSix"/>
                <h1 className={s.settingsTitle}>Settings</h1>
            </div>
        </div>
  )
}

export default Header

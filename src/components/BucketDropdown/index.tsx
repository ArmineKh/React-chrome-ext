import React, { FC, useState } from 'react'
import classNames from 'classnames'
import { menuItems } from './BucketDropdown.constants'

// styles
import s from './BucketDropdown.module.css'

const BucketDropdown: FC<unknown> = () => {
  const [open, setOpen] = React.useState(false)
  const [element, setElement] = useState('Button')

  const handleOpen = (): void => {
    setOpen(!open)
  }

  const handleChange = (value: string): void => {
    setElement(value)
  }

  return (
        <div className={s.container}>
            <div className={s.saveTitle}>Save to:</div>
            <button className={s.selected} onClick={handleOpen}>{element}</button>
            <div className={classNames(s.optionsContainer, { [s.active]: open }, s.selectBox)}>
                {open && <div>
                    {menuItems.map(({ id, value }) => {
                      return <div className={s.option} key={id}
                                    onClick={() => handleChange(value)}>{value}</div>
                    })}
                </div>}
            </div>
        </div>
  )
}

export default BucketDropdown

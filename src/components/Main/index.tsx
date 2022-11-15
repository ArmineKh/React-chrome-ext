import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import InstantBlock from '../InstantBlock'
import BucketDropdown from '../BucketDropdown'
import Snaps from '../Snaps'
import Header from '../Header'
import SnapElement from '../SnapElement'
import s from './Main.module.css'
import { DataType } from '../SnapElement/SnapElement.types'
import ScreenCapture from "../ScreenCapture";

const Main: FC<unknown> = () => {
  const [stylesObj, setStylesObj] = useState<DataType | null>(null)
  const [copySuccess] = useState<boolean>(false)
  const [active, setActive] = useState(false)
  const [toggle, setToggle] = useState(false)
  const ref = useRef<any>(null)
  const snapElem = useRef<any>(null)

  const getClassNames = useCallback((node: any): string[] => {
    return [
      node.className,
      ...Array.from(node.children).map(getClassNames)
    ].flat()
  }, [])

  const handleActive = (event: MouseEvent): void => {
    event.stopPropagation()
    snapElem.current = event.target
    setActive(!active)
  }

  /* eslint-disable */
  //@ts-ignore
  const parseCSSText = (cssText: string): DataType => {
    const cssTxt = (cssText !== '') ? cssText.replace(/\/\*(.|\s)*?\*\//g, ' ').replace(/\s+/g, ' ') : ''
    const style = {};
    const [, ruleName, rule] = cssTxt.match(/ ?(.*?) ?{([^}]*)}/) || [, , cssTxt];
    const cssToJs = (s: string): any => s.replace(/\W+\w/g, (match: string) => match.slice(-1).toUpperCase())
    const properties = rule!.split(';').map((o: string) => o.split(':').map((x: string) => (x !== '') && x.trim()))
    for (const [property, value] of properties) {
      // @ts-ignore
      style[cssToJs(property)] = value
    }
    return {cssText, ruleName, style} as DataType
  }

  const handleClick = useCallback((event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    if (event.target !== snapElem.current) {
      setToggle(true)
      ref.current = event.target
      const classNames = getClassNames(ref.current).map((name: string) => name.split(' ')).flat().map((name: string) => `.${name}`)
      const cssStyles = Array.from(document.head.getElementsByTagName('style')).filter(style => style.innerHTML.includes(classNames[0])).map(style => style.innerHTML)[0]
      setStylesObj(parseCSSText(cssStyles))
    } else {
      setToggle(false)
    }
  }, [getClassNames])

  useEffect(() => {
    if (active) {
      window.addEventListener('click', handleClick)
    } else {
      ref.current = null
      window.removeEventListener('click', handleClick)
    }
    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [active, handleClick])

  return (
        <div className={classNames(s.main, { [s.globalCursor]: active })}>
            <div className={s.wrapper}>
                <Header/>
                <div className={s.content}>
                    <Snaps handleActive={handleActive}/>
                    <BucketDropdown/>
                    <InstantBlock/>
                </div>
                <button className={s.viewDashboardButton}>View Dashboard</button>
                {(Boolean(ref.current)) && toggle &&
                    <SnapElement data={stylesObj} copySuccess={copySuccess}/>
                }
            </div>
          
          <ScreenCapture  />
        </div>
  )
}

export default Main

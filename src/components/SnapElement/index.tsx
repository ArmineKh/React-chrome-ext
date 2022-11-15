import React, { FC } from 'react'

// types
import { SnapElementPropsType } from './SnapElement.types'

// styles
import s from './SnapElement.module.css'

const SnapElement: FC<SnapElementPropsType> = ({ data, copySuccess }) => {
  return (
        <div className={s.container}>
            <div className={s.touch}>
                <img src="/images/Touch.png" alt="Touch"/>
                <div> Click the element again to save to your bucket</div>
            </div>
            <div className={s.clasNamesInfo}>
                <div className={s.classNames}>links-stacked hero-cta stacked-s</div>
                <div className={s.mainElementParent}>
                    <img src="/images/ArrowElbowDownRight.png" alt="ArrowElbowDownRight"/>
                    <div className={s.mainElement}>a.button</div>
                </div>
                <div className={s.mainElementParent}>
                    <img src="/images/ArrowElbowDownRight.png" alt="ArrowElbowDownRight"/>
                    <div className={s.classNames}>typography-hero-cta control cta-link cta-learn-more</div>
                </div>
            </div>
            <div className={s.border}></div>
            <div className={s.stylesInfo}>
                <div className={s.mainElement}>{data?.ruleName}</div>
                <div className={s.subtitle}>
                    <div className={s.subtitleAa}>Aa</div>
                    <div className={s.subtitleText}>SF Pro Text 17px</div>
                </div>

                {(data != null) && Object.entries(data.style)?.map(([key, value], index) => {
                  return (
                        <div className={s.elementStyles} key={index}>
                            <div className={s.elementStylesKey}>{key}{(value !== undefined) && <span
                                className={s.elementStylesCharacter}>:</span>}</div>
                            <div className={s.elementStylesValue}>{value}{(value !== undefined) && <span
                                className={s.elementStylesCharacter}>;</span>}</div>
                        </div>
                  )
                })}

                {
                    copySuccess && <div className={s.copyInfo}>
                        <img src="/images/CheckCircle.png" alt="CheckCircle"/>
                        <div className={s.copyInfoText}>Element has been saved !</div>
                    </div>
                }

            </div>
        </div>
  )
}

export default SnapElement

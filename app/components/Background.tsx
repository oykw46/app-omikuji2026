// 左右に揺れる青海波柄の背景
import { forwardRef } from 'react'

type BackgroundProps = {
	imageUrl: string,
	animate?: boolean,
	className?: string
}

export const Background = forwardRef<HTMLDivElement, BackgroundProps>(
  ({ imageUrl, animate = true }, ref) => {
    return (
      <div
        	ref={ref}
        	className={`absolute inset-0 bg-top bg-cover ${
        	animate ? '' : ''
        } z-[-1]`}
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
    )
  }
)

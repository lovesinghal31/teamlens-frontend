"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SparklineProps {
  data: number[]
  width?: number
  height?: number
  strokeColor?: string
  fillColor?: string
  className?: string
}

export function Sparkline({
  data,
  width = 200,
  height = 48,
  strokeColor = "var(--color-primary)",
  fillColor = "var(--color-primary)",
  className,
}: SparklineProps) {
  if (data.length < 2) return null

  const padding = 2
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1

  const points = data.map((value, index) => {
    const x = padding + (index / (data.length - 1)) * (width - padding * 2)
    const y = padding + (1 - (value - min) / range) * (height - padding * 2)
    return `${x},${y}`
  })

  const polylinePoints = points.join(" ")

  // Create fill path (area under the curve)
  const firstX = padding
  const lastX = padding + ((data.length - 1) / (data.length - 1)) * (width - padding * 2)
  const fillPath = `M ${firstX},${height} L ${points.map((p) => p).join(" L ")} L ${lastX},${height} Z`

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("overflow-visible", className)}
      preserveAspectRatio="none"
    >
      {/* Gradient fill */}
      <defs>
        <linearGradient id="sparkline-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fillColor} stopOpacity="0.2" />
          <stop offset="100%" stopColor={fillColor} stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Area fill */}
      <path d={fillPath} fill="url(#sparkline-gradient)" />

      {/* Line */}
      <polyline
        points={polylinePoints}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />

      {/* End dot */}
      {(() => {
        const lastPoint = points[points.length - 1].split(",")
        return (
          <circle
            cx={lastPoint[0]}
            cy={lastPoint[1]}
            r="3"
            fill={strokeColor}
            stroke="var(--color-card)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        )
      })()}
    </svg>
  )
}

"use client";

import React, { useEffect, useRef } from "react";

interface LetterPictureProps {
  username: string;
  style?: React.CSSProperties;
  className?: string;
  width?: number;
  height?: number;
  fontSize?: number;
}

const LetterPicture: React.FC<LetterPictureProps> = ({
  username,
  style,
  className,
  width,
  height,
  fontSize,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const drawInitials = () => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");

      if (context && canvas) {
        const initials = username.slice(0, 2).toUpperCase();

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        // Clear the canvas
        context.clearRect(0, 0, canvasWidth, canvasHeight);

        // Set background color
        context.fillStyle = "#1c73a3";
        context.fillRect(0, 0, canvasWidth, canvasHeight);

        // Set text properties
        context.font = `${fontSize || 40}px Arial`;
        context.fillStyle = "white";
        context.textAlign = "center";
        context.textBaseline = "middle";

        // Draw initials
        context.fillText(initials, canvasWidth / 2, canvasHeight / 2);
      }
    };

    drawInitials();
  }, [username]);

  return (
    <canvas
      ref={canvasRef}
      width={width || 100}
      height={height || 100}
      className={className}
      style={{
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        ...style,
      }}
    />
  );
};

export default LetterPicture;

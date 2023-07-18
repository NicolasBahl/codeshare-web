"use client";

import React, { useEffect, useRef } from "react";

interface LetterPictureProps {
  username: string;
}

const LetterPicture: React.FC<LetterPictureProps> = ({ username }) => {
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
        context.fillStyle = "#3a95cb";
        context.fillRect(0, 0, canvasWidth, canvasHeight);

        // Set text properties
        context.font = "40px Helvetica";
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
      width={100}
      height={100}
      style={{
        borderRadius: "50%",
        width: "50px",
        height: "50px",
      }}
    />
  );
};

export default LetterPicture;

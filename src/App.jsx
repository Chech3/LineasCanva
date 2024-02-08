import React, { useRef, useEffect, useState } from 'react';

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [lines, setLines] = useState([]);
  const [startPoint, setStartPoint] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 600; // ajusta el ancho del lienzo según sea necesario
    canvas.height = 400; // ajusta el alto del lienzo según sea necesario
    const context = canvas.getContext('2d');
    contextRef.current = context;
  }, []);

  const handleMouseDown = (event) => {
    if (lines.length < 4) {
      const { offsetX, offsetY } = event.nativeEvent;
      setStartPoint({ x: offsetX, y: offsetY });
    }
  };

  const handleMouseUp = (event) => {
    if (startPoint) {
      const { offsetX, offsetY } = event.nativeEvent;
      const newLine = { start: startPoint, end: { x: offsetX, y: offsetY } };
      setLines([...lines, newLine]);
      setStartPoint(null);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    lines.forEach((line) => {
      context.beginPath();
      context.moveTo(line.start.x, line.start.y);
      context.lineTo(line.end.x, line.end.y);
      context.stroke();
    });
  }, [lines]);

  const handleMouseMove = (event) => {
    if (startPoint) {
      const { offsetX, offsetY } = event.nativeEvent;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
      lines.forEach((line) => {
        context.beginPath();
        context.moveTo(line.start.x, line.start.y);
        context.lineTo(line.end.x, line.end.y);
        context.stroke();
      });
      context.beginPath();
      context.moveTo(startPoint.x, startPoint.y);
      context.lineTo(offsetX, offsetY);
      context.stroke();
    }
  };
  console.log(lines);

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{ border: '1px solid black' }}
    />
  );
};

export default DrawingCanvas;

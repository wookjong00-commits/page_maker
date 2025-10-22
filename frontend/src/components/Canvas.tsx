import React, { useState } from 'react';
import { Element } from '../types';
import DraggableElement from './DraggableElement';

interface CanvasProps {
  width: number;
  height: number;
  backgroundColor: string;
  elements: Element[];
  selectedElementId: string | null;
  onSelectElement: (id: string | null) => void;
  onUpdateElement: (id: string, updates: Partial<Element>) => void;
}

const Canvas: React.FC<CanvasProps> = ({
  width,
  height,
  backgroundColor,
  elements,
  selectedElementId,
  onSelectElement,
  onUpdateElement,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onSelectElement(null);
    }
  };

  return (
    <div
      className="canvas-container"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        overflow: 'auto',
        padding: '40px',
      }}
    >
      <div
        className="canvas"
        onClick={handleCanvasClick}
        style={{
          position: 'relative',
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor: backgroundColor,
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          cursor: 'default',
        }}
      >
        {elements.map((element) => (
          <DraggableElement
            key={element.id}
            element={element}
            isSelected={element.id === selectedElementId}
            onSelect={() => onSelectElement(element.id)}
            onUpdate={(updates) => onUpdateElement(element.id, updates)}
            isDragging={isDragging}
            setIsDragging={setIsDragging}
          />
        ))}
      </div>
    </div>
  );
};

export default Canvas;

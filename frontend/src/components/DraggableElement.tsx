import React, { useRef, useState } from 'react';
import { Element, Position, Size } from '../types';

interface DraggableElementProps {
  element: Element;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<Element>) => void;
  isDragging: boolean;
  setIsDragging: (dragging: boolean) => void;
}

const DraggableElement: React.FC<DraggableElementProps> = ({
  element,
  isSelected,
  onSelect,
  onUpdate,
  isDragging,
  setIsDragging,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState<Position | null>(null);
  const [resizeStart, setResizeStart] = useState<{ pos: Position; size: Size } | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();

    if ((e.target as HTMLElement).classList.contains('resize-handle')) {
      setIsResizing(true);
      setResizeStart({
        pos: { x: e.clientX, y: e.clientY },
        size: { ...element.size },
      });
    } else {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - element.position.x,
        y: e.clientY - element.position.y,
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing && resizeStart) {
      const deltaX = e.clientX - resizeStart.pos.x;
      const deltaY = e.clientY - resizeStart.pos.y;

      onUpdate({
        size: {
          width: Math.max(50, resizeStart.size.width + deltaX),
          height: Math.max(30, resizeStart.size.height + deltaY),
        },
      });
    } else if (isDragging && dragStart) {
      onUpdate({
        position: {
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        },
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setDragStart(null);
    setResizeStart(null);
  };

  React.useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragStart, resizeStart]);

  const renderContent = () => {
    switch (element.type) {
      case 'text':
        return (
          <div
            style={{
              fontFamily: element.style.fontFamily,
              fontSize: `${element.style.fontSize}px`,
              fontWeight: element.style.fontWeight,
              color: element.style.color,
              textAlign: element.style.textAlign,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: element.style.textAlign,
              padding: '8px',
              wordWrap: 'break-word',
            }}
          >
            {element.content || 'Text'}
          </div>
        );

      case 'image':
        return (
          <img
            src={element.src || 'https://via.placeholder.com/150'}
            alt={element.alt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        );

      case 'button':
        return (
          <button
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: element.backgroundColor,
              color: element.style.color,
              fontFamily: element.style.fontFamily,
              fontSize: `${element.style.fontSize}px`,
              fontWeight: element.style.fontWeight,
              border: 'none',
              borderRadius: `${element.borderRadius}px`,
              cursor: 'pointer',
            }}
          >
            {element.text || 'Button'}
          </button>
        );

      case 'container':
        return (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: element.backgroundColor,
              borderRadius: `${element.borderRadius}px`,
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={elementRef}
      onMouseDown={handleMouseDown}
      style={{
        position: 'absolute',
        left: `${element.position.x}px`,
        top: `${element.position.y}px`,
        width: `${element.size.width}px`,
        height: `${element.size.height}px`,
        zIndex: element.zIndex,
        cursor: isDragging ? 'grabbing' : 'grab',
        border: isSelected ? '2px solid #2196F3' : 'none',
        boxSizing: 'border-box',
      }}
    >
      {renderContent()}

      {isSelected && (
        <div
          className="resize-handle"
          style={{
            position: 'absolute',
            right: '-5px',
            bottom: '-5px',
            width: '10px',
            height: '10px',
            backgroundColor: '#2196F3',
            cursor: 'nwse-resize',
            borderRadius: '50%',
          }}
        />
      )}
    </div>
  );
};

export default DraggableElement;

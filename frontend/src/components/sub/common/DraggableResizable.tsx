// DraggableResizable.tsx
import React, { useState, useRef, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface DraggableResizableProps {
  children: React.ReactNode;
  id: string;
  onBoundsChange: (id: string, bounds: Bounds) => void;
  otherBounds: Bounds[];
  initialPosition?: Position;
  initialSize?: Size;
  minWidth?: number;
  minHeight?: number;
}

export const DraggableResizable: React.FC<DraggableResizableProps> = ({
  children,
  id,
  onBoundsChange,
  otherBounds,
  initialPosition = { x: 0, y: 0 },
  initialSize = { width: 200, height: 200 },
  minWidth = 100,
  minHeight = 100,
}) => {
  const [position, setPosition] = useState<Position>(initialPosition);
  const [size, setSize] = useState<Size>(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);
  
  const dragStart = useRef<Position>({ x: 0, y: 0 });
  const resizeStart = useRef<{ pos: Position; size: Size }>({
    pos: { x: 0, y: 0 },
    size: { width: 0, height: 0 }
  });

  const checkCollision = (bounds: Bounds): boolean => {
    return otherBounds.some(other => !(
      bounds.x + bounds.width <= other.x ||
      bounds.x >= other.x + other.width ||
      bounds.y + bounds.height <= other.y ||
      bounds.y >= other.y + other.height
    ));
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).className.includes('resize-handle')) return;
    
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  const handleResizeStart = (e: React.MouseEvent<HTMLDivElement>, handle: string) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeHandle(handle);
    resizeStart.current = {
      pos: { ...position },
      size: { ...size }
    };
    dragStart.current = {
      x: e.clientX,
      y: e.clientY
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.current.x;
      const newY = e.clientY - dragStart.current.y;
      
      const newBounds = {
        x: newX,
        y: newY,
        width: size.width,
        height: size.height
      };

      if (!checkCollision(newBounds)) {
        setPosition({ x: newX, y: newY });
      }
    } else if (isResizing && resizeHandle) {
      const deltaX = e.clientX - dragStart.current.x;
      const deltaY = e.clientY - dragStart.current.y;
      const start = resizeStart.current;
      
      let newWidth = start.size.width;
      let newHeight = start.size.height;
      let newX = start.pos.x;
      let newY = start.pos.y;

      if (resizeHandle.includes('e')) {
        newWidth = Math.max(start.size.width + deltaX, minWidth);
      }
      if (resizeHandle.includes('w')) {
        const possibleWidth = Math.max(start.size.width - deltaX, minWidth);
        if (possibleWidth !== minWidth) {
          newX = start.pos.x + deltaX;
          newWidth = possibleWidth;
        }
      }
      if (resizeHandle.includes('s')) {
        newHeight = Math.max(start.size.height + deltaY, minHeight);
      }
      if (resizeHandle.includes('n')) {
        const possibleHeight = Math.max(start.size.height - deltaY, minHeight);
        if (possibleHeight !== minHeight) {
          newY = start.pos.y + deltaY;
          newHeight = possibleHeight;
        }
      }

      const newBounds = {
        x: newX,
        y: newY,
        width: newWidth,
        height: newHeight
      };

      if (!checkCollision(newBounds)) {
        setPosition({ x: newX, y: newY });
        setSize({ width: newWidth, height: newHeight });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeHandle(null);
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing]);

  useEffect(() => {
    onBoundsChange(id, {
      x: position.x,
      y: position.y,
      width: size.width,
      height: size.height
    });
  }, [position, size, id]);

  return (
    <div
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        backgroundColor: "black",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
        borderRadius: "8px",
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        zIndex: isDragging || isResizing ? 1000 : 1
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Resize handles */}
      <div className="resize-handle n" style={{ position: 'absolute', top: '-4px', left: '50%', transform: 'translateX(-50%)', width: '8px', height: '8px', backgroundColor: '#666', cursor: 'ns-resize' }} onMouseDown={(e) => handleResizeStart(e, 'n')} />
      <div className="resize-handle s" style={{ position: 'absolute', bottom: '-4px', left: '50%', transform: 'translateX(-50%)', width: '8px', height: '8px', backgroundColor: '#666', cursor: 'ns-resize' }} onMouseDown={(e) => handleResizeStart(e, 's')} />
      <div className="resize-handle e" style={{ position: 'absolute', right: '-4px', top: '50%', transform: 'translateY(-50%)', width: '8px', height: '8px', backgroundColor: '#666', cursor: 'ew-resize' }} onMouseDown={(e) => handleResizeStart(e, 'e')} />
      <div className="resize-handle w" style={{ position: 'absolute', left: '-4px', top: '50%', transform: 'translateY(-50%)', width: '8px', height: '8px', backgroundColor: '#666', cursor: 'ew-resize' }} onMouseDown={(e) => handleResizeStart(e, 'w')} />
      <div className="resize-handle ne" style={{ position: 'absolute', top: '-4px', right: '-4px', width: '8px', height: '8px', backgroundColor: '#666', cursor: 'ne-resize' }} onMouseDown={(e) => handleResizeStart(e, 'ne')} />
      <div className="resize-handle nw" style={{ position: 'absolute', top: '-4px', left: '-4px', width: '8px', height: '8px', backgroundColor: '#666', cursor: 'nw-resize' }} onMouseDown={(e) => handleResizeStart(e, 'nw')} />
      <div className="resize-handle se" style={{ position: 'absolute', bottom: '-4px', right: '-4px', width: '8px', height: '8px', backgroundColor: '#666', cursor: 'se-resize' }} onMouseDown={(e) => handleResizeStart(e, 'se')} />
      <div className="resize-handle sw" style={{ position: 'absolute', bottom: '-4px', left: '-4px', width: '8px', height: '8px', backgroundColor: '#666', cursor: 'sw-resize' }} onMouseDown={(e) => handleResizeStart(e, 'sw')} />
      {children}
    </div>
  );
};
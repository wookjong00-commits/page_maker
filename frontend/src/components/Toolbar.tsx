import React from 'react';
import { ElementType } from '../types';

interface ToolbarProps {
  onAddElement: (type: ElementType) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onAddElement }) => {
  const tools = [
    { type: 'text' as ElementType, label: '텍스트', icon: 'T' },
    { type: 'image' as ElementType, label: '이미지', icon: '🖼️' },
    { type: 'button' as ElementType, label: '버튼', icon: '🔘' },
    { type: 'container' as ElementType, label: '컨테이너', icon: '□' },
  ];

  return (
    <div
      style={{
        width: '100%',
        padding: '16px',
        backgroundColor: '#fff',
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        gap: '12px',
      }}
    >
      <h3 style={{ margin: 0, marginRight: '20px', fontSize: '18px' }}>컴포넌트</h3>
      {tools.map((tool) => (
        <button
          key={tool.type}
          onClick={() => onAddElement(tool.type)}
          style={{
            padding: '12px 20px',
            backgroundColor: '#f5f5f5',
            border: '1px solid #ddd',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#e0e0e0';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#f5f5f5';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <span style={{ fontSize: '20px' }}>{tool.icon}</span>
          <span>{tool.label}</span>
        </button>
      ))}
    </div>
  );
};

export default Toolbar;

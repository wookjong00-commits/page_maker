import React from 'react';
import { Element, TextElement, ButtonElement, ContainerElement, ImageElement } from '../types';
import AnimationPanel from './AnimationPanel';

interface StylePanelProps {
  selectedElement: Element | null;
  onUpdateElement: (updates: Partial<Element>) => void;
}

const StylePanel: React.FC<StylePanelProps> = ({ selectedElement, onUpdateElement }) => {
  if (!selectedElement) {
    return (
      <div
        style={{
          width: '300px',
          padding: '20px',
          backgroundColor: '#fff',
          borderLeft: '1px solid #e0e0e0',
          overflowY: 'auto',
        }}
      >
        <p style={{ color: '#666', textAlign: 'center', marginTop: '40px' }}>
          요소를 선택하여 스타일을 편집하세요
        </p>
      </div>
    );
  }

  const renderPositionAndSize = () => (
    <div style={{ marginBottom: '20px' }}>
      <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>위치 & 크기</h4>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <div>
          <label style={{ fontSize: '12px', color: '#666' }}>X</label>
          <input
            type="number"
            value={selectedElement.position.x}
            onChange={(e) =>
              onUpdateElement({
                position: { ...selectedElement.position, x: Number(e.target.value) },
              })
            }
            style={inputStyle}
          />
        </div>
        <div>
          <label style={{ fontSize: '12px', color: '#666' }}>Y</label>
          <input
            type="number"
            value={selectedElement.position.y}
            onChange={(e) =>
              onUpdateElement({
                position: { ...selectedElement.position, y: Number(e.target.value) },
              })
            }
            style={inputStyle}
          />
        </div>
        <div>
          <label style={{ fontSize: '12px', color: '#666' }}>Width</label>
          <input
            type="number"
            value={selectedElement.size.width}
            onChange={(e) =>
              onUpdateElement({
                size: { ...selectedElement.size, width: Number(e.target.value) },
              })
            }
            style={inputStyle}
          />
        </div>
        <div>
          <label style={{ fontSize: '12px', color: '#666' }}>Height</label>
          <input
            type="number"
            value={selectedElement.size.height}
            onChange={(e) =>
              onUpdateElement({
                size: { ...selectedElement.size, height: Number(e.target.value) },
              })
            }
            style={inputStyle}
          />
        </div>
      </div>
    </div>
  );

  const renderTextStyles = (element: TextElement | ButtonElement) => (
    <div style={{ marginBottom: '20px' }}>
      <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>텍스트 스타일</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <label style={{ fontSize: '12px', color: '#666' }}>폰트</label>
          <select
            value={element.style.fontFamily}
            onChange={(e) =>
              onUpdateElement({
                ...element,
                style: { ...element.style, fontFamily: e.target.value },
              })
            }
            style={inputStyle}
          >
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Georgia">Georgia</option>
            <option value="Verdana">Verdana</option>
            <option value="나눔고딕">나눔고딕</option>
          </select>
        </div>
        <div>
          <label style={{ fontSize: '12px', color: '#666' }}>크기</label>
          <input
            type="number"
            value={element.style.fontSize}
            onChange={(e) =>
              onUpdateElement({
                ...element,
                style: { ...element.style, fontSize: Number(e.target.value) },
              })
            }
            style={inputStyle}
          />
        </div>
        <div>
          <label style={{ fontSize: '12px', color: '#666' }}>색상</label>
          <input
            type="color"
            value={element.style.color}
            onChange={(e) =>
              onUpdateElement({
                ...element,
                style: { ...element.style, color: e.target.value },
              })
            }
            style={{ ...inputStyle, height: '40px' }}
          />
        </div>
        <div>
          <label style={{ fontSize: '12px', color: '#666' }}>정렬</label>
          <select
            value={element.style.textAlign}
            onChange={(e) =>
              onUpdateElement({
                ...element,
                style: { ...element.style, textAlign: e.target.value as any },
              })
            }
            style={inputStyle}
          >
            <option value="left">왼쪽</option>
            <option value="center">가운데</option>
            <option value="right">오른쪽</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderSpecificStyles = () => {
    switch (selectedElement.type) {
      case 'text':
        const textElement = selectedElement as TextElement;
        return (
          <>
            {renderTextStyles(textElement)}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>내용</h4>
              <textarea
                value={textElement.content}
                onChange={(e) =>
                  onUpdateElement({
                    ...textElement,
                    content: e.target.value,
                  })
                }
                style={{
                  ...inputStyle,
                  minHeight: '100px',
                  resize: 'vertical',
                }}
              />
            </div>
          </>
        );

      case 'image':
        const imageElement = selectedElement as ImageElement;
        return (
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>이미지</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#666' }}>이미지 URL</label>
                <input
                  type="text"
                  value={imageElement.src}
                  onChange={(e) =>
                    onUpdateElement({
                      ...imageElement,
                      src: e.target.value,
                    })
                  }
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#666' }}>Alt Text</label>
                <input
                  type="text"
                  value={imageElement.alt}
                  onChange={(e) =>
                    onUpdateElement({
                      ...imageElement,
                      alt: e.target.value,
                    })
                  }
                  style={inputStyle}
                />
              </div>
            </div>
          </div>
        );

      case 'button':
        const buttonElement = selectedElement as ButtonElement;
        return (
          <>
            {renderTextStyles(buttonElement)}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>버튼 설정</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: '#666' }}>텍스트</label>
                  <input
                    type="text"
                    value={buttonElement.text}
                    onChange={(e) =>
                      onUpdateElement({
                        ...buttonElement,
                        text: e.target.value,
                      })
                    }
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#666' }}>배경색</label>
                  <input
                    type="color"
                    value={buttonElement.backgroundColor}
                    onChange={(e) =>
                      onUpdateElement({
                        ...buttonElement,
                        backgroundColor: e.target.value,
                      })
                    }
                    style={{ ...inputStyle, height: '40px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#666' }}>모서리 둥글기</label>
                  <input
                    type="number"
                    value={buttonElement.borderRadius}
                    onChange={(e) =>
                      onUpdateElement({
                        ...buttonElement,
                        borderRadius: Number(e.target.value),
                      })
                    }
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#666' }}>링크 (선택)</label>
                  <input
                    type="text"
                    value={buttonElement.link || ''}
                    onChange={(e) =>
                      onUpdateElement({
                        ...buttonElement,
                        link: e.target.value,
                      })
                    }
                    style={inputStyle}
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          </>
        );

      case 'container':
        const containerElement = selectedElement as ContainerElement;
        return (
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>컨테이너 설정</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#666' }}>배경색</label>
                <input
                  type="color"
                  value={containerElement.backgroundColor}
                  onChange={(e) =>
                    onUpdateElement({
                      ...containerElement,
                      backgroundColor: e.target.value,
                    })
                  }
                  style={{ ...inputStyle, height: '40px' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#666' }}>모서리 둥글기</label>
                <input
                  type="number"
                  value={containerElement.borderRadius}
                  onChange={(e) =>
                    onUpdateElement({
                      ...containerElement,
                      borderRadius: Number(e.target.value),
                    })
                  }
                  style={inputStyle}
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      style={{
        width: '300px',
        padding: '20px',
        backgroundColor: '#fff',
        borderLeft: '1px solid #e0e0e0',
        overflowY: 'auto',
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '18px' }}>
        스타일 편집
      </h3>
      {renderPositionAndSize()}
      {renderSpecificStyles()}
      <AnimationPanel
        selectedElement={selectedElement}
        onUpdateElement={onUpdateElement}
      />
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '14px',
  boxSizing: 'border-box',
};

export default StylePanel;

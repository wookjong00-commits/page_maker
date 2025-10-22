import React, { useState, useEffect } from 'react';
import Canvas from './components/Canvas';
import Toolbar from './components/Toolbar';
import StylePanel from './components/StylePanel';
import ApiConfig from './components/ApiConfig';
import {
  CanvasState,
  Element,
  ElementType,
  ApiConfig as ApiConfigType,
  TextElement,
  ImageElement,
  ButtonElement,
  ContainerElement,
} from './types';
import { generateCode } from './utils/api';
import './App.css';

const DEFAULT_CANVAS: CanvasState = {
  width: 1200,
  height: 800,
  backgroundColor: '#ffffff',
  elements: [],
};

function App() {
  const [canvas, setCanvas] = useState<CanvasState>(DEFAULT_CANVAS);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [apiConfig, setApiConfig] = useState<ApiConfigType | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [showApiConfig, setShowApiConfig] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const savedCanvas = localStorage.getItem('canvas');
    const savedApiConfig = localStorage.getItem('apiConfig');

    if (savedCanvas) {
      setCanvas(JSON.parse(savedCanvas));
    }
    if (savedApiConfig) {
      setApiConfig(JSON.parse(savedApiConfig));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('canvas', JSON.stringify(canvas));
  }, [canvas]);

  const generateElementId = () => {
    return `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleAddElement = (type: ElementType) => {
    const id = generateElementId();
    const baseElement = {
      id,
      position: { x: 100, y: 100 },
      size: { width: 200, height: 100 },
      zIndex: canvas.elements.length,
    };

    let newElement: Element;

    switch (type) {
      case 'text':
        newElement = {
          ...baseElement,
          type: 'text',
          content: '텍스트를 입력하세요',
          style: {
            fontFamily: 'Arial',
            fontSize: 16,
            fontWeight: 'normal',
            color: '#000000',
            textAlign: 'left',
          },
        } as TextElement;
        break;

      case 'image':
        newElement = {
          ...baseElement,
          type: 'image',
          src: 'https://via.placeholder.com/200x100',
          alt: 'Image',
        } as ImageElement;
        break;

      case 'button':
        newElement = {
          ...baseElement,
          type: 'button',
          text: '버튼',
          style: {
            fontFamily: 'Arial',
            fontSize: 16,
            fontWeight: 'bold',
            color: '#ffffff',
            textAlign: 'center',
          },
          backgroundColor: '#2196F3',
          borderRadius: 4,
        } as ButtonElement;
        break;

      case 'container':
        newElement = {
          ...baseElement,
          type: 'container',
          backgroundColor: '#f5f5f5',
          borderRadius: 8,
          children: [],
        } as ContainerElement;
        break;

      default:
        return;
    }

    setCanvas({
      ...canvas,
      elements: [...canvas.elements, newElement],
    });
    setSelectedElementId(id);
  };

  const handleUpdateElement = (id: string, updates: Partial<Element>) => {
    setCanvas({
      ...canvas,
      elements: canvas.elements.map((el) =>
        el.id === id ? { ...el, ...updates } : el
      ),
    });
  };

  const handleDeleteElement = () => {
    if (selectedElementId) {
      setCanvas({
        ...canvas,
        elements: canvas.elements.filter((el) => el.id !== selectedElementId),
      });
      setSelectedElementId(null);
    }
  };

  const handleGenerateCode = async () => {
    if (!apiConfig) {
      alert('먼저 AI API 설정을 완료해주세요');
      setShowApiConfig(true);
      return;
    }

    if (canvas.elements.length === 0) {
      alert('최소 하나 이상의 요소를 추가해주세요');
      return;
    }

    setIsGenerating(true);
    try {
      const code = await generateCode(apiConfig, canvas);
      setGeneratedCode(code);
    } catch (error: any) {
      alert(`코드 생성 실패: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveApiConfig = (config: ApiConfigType) => {
    setApiConfig(config);
    localStorage.setItem('apiConfig', JSON.stringify(config));
    setShowApiConfig(false);
    alert('API 설정이 저장되었습니다');
  };

  const handleExportCode = () => {
    if (!generatedCode) return;

    const blob = new Blob([generatedCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-page.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const selectedElement = canvas.elements.find((el) => el.id === selectedElementId) || null;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Page Maker - No-Code Website Builder</h1>
        <div className="header-actions">
          <button
            onClick={() => setShowApiConfig(!showApiConfig)}
            className="btn btn-secondary"
          >
            {apiConfig ? 'AI API 설정 변경' : 'AI API 설정'}
          </button>
          {selectedElementId && (
            <button onClick={handleDeleteElement} className="btn btn-danger">
              선택 삭제
            </button>
          )}
          <button
            onClick={handleGenerateCode}
            disabled={isGenerating}
            className="btn btn-primary"
          >
            {isGenerating ? '생성 중...' : 'AI로 코드 생성'}
          </button>
          {generatedCode && (
            <>
              <button onClick={handleExportCode} className="btn btn-success">
                HTML 다운로드
              </button>
              <button
                onClick={() => {
                  const win = window.open();
                  if (win) {
                    win.document.write(generatedCode);
                    win.document.close();
                  }
                }}
                className="btn btn-info"
              >
                미리보기
              </button>
            </>
          )}
        </div>
      </header>

      {showApiConfig && (
        <div className="api-config-container">
          <ApiConfig config={apiConfig} onSave={handleSaveApiConfig} />
        </div>
      )}

      <Toolbar onAddElement={handleAddElement} />

      <div className="app-content">
        <Canvas
          width={canvas.width}
          height={canvas.height}
          backgroundColor={canvas.backgroundColor}
          elements={canvas.elements}
          selectedElementId={selectedElementId}
          onSelectElement={setSelectedElementId}
          onUpdateElement={handleUpdateElement}
        />
        <StylePanel
          selectedElement={selectedElement}
          onUpdateElement={(updates) => {
            if (selectedElementId) {
              handleUpdateElement(selectedElementId, updates);
            }
          }}
        />
      </div>
    </div>
  );
}

export default App;

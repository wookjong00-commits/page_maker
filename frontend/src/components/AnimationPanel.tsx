import React from 'react';
import { Element, Animation } from '../types';

interface AnimationPanelProps {
  selectedElement: Element | null;
  onUpdateElement: (updates: Partial<Element>) => void;
}

const AnimationPanel: React.FC<AnimationPanelProps> = ({
  selectedElement,
  onUpdateElement,
}) => {
  if (!selectedElement) {
    return null;
  }

  const animation = selectedElement.animation || {
    type: 'none',
    duration: 1000,
    delay: 0,
    easing: 'ease',
  };

  const handleAnimationChange = (updates: Partial<Animation>) => {
    onUpdateElement({
      animation: { ...animation, ...updates },
    });
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>
        애니메이션 효과
      </h4>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <label style={{ fontSize: '12px', color: '#666' }}>애니메이션 타입</label>
          <select
            value={animation.type}
            onChange={(e) =>
              handleAnimationChange({ type: e.target.value as Animation['type'] })
            }
            style={inputStyle}
          >
            <option value="none">없음</option>
            <option value="fade">페이드</option>
            <option value="slide">슬라이드</option>
            <option value="scale">스케일</option>
            <option value="rotate">회전</option>
          </select>
        </div>

        {animation.type !== 'none' && (
          <>
            <div>
              <label style={{ fontSize: '12px', color: '#666' }}>
                지속시간 (ms)
              </label>
              <input
                type="number"
                value={animation.duration}
                onChange={(e) =>
                  handleAnimationChange({ duration: Number(e.target.value) })
                }
                min="0"
                step="100"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', color: '#666' }}>
                지연시간 (ms)
              </label>
              <input
                type="number"
                value={animation.delay}
                onChange={(e) =>
                  handleAnimationChange({ delay: Number(e.target.value) })
                }
                min="0"
                step="100"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', color: '#666' }}>
                이징 함수
              </label>
              <select
                value={animation.easing}
                onChange={(e) =>
                  handleAnimationChange({ easing: e.target.value })
                }
                style={inputStyle}
              >
                <option value="ease">ease</option>
                <option value="ease-in">ease-in</option>
                <option value="ease-out">ease-out</option>
                <option value="ease-in-out">ease-in-out</option>
                <option value="linear">linear</option>
              </select>
            </div>

            <div
              style={{
                padding: '12px',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px',
                fontSize: '12px',
                color: '#666',
              }}
            >
              <strong>미리보기:</strong> 애니메이션은 생성된 HTML에서 페이지 로드 시 실행됩니다.
            </div>
          </>
        )}
      </div>
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

export default AnimationPanel;

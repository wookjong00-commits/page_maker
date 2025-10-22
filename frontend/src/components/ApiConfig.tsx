import React, { useState, useEffect } from 'react';
import { ApiConfig as ApiConfigType } from '../types';

interface ApiConfigProps {
  config: ApiConfigType | null;
  onSave: (config: ApiConfigType) => void;
}

const ApiConfig: React.FC<ApiConfigProps> = ({ config, onSave }) => {
  const [provider, setProvider] = useState<'claude' | 'chatgpt' | 'gemini'>(
    config?.provider || 'claude'
  );
  const [apiKey, setApiKey] = useState(config?.apiKey || '');
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    if (config) {
      setProvider(config.provider);
      setApiKey(config.apiKey);
    }
  }, [config]);

  const handleSave = () => {
    if (!apiKey.trim()) {
      alert('API 키를 입력하세요');
      return;
    }
    onSave({ provider, apiKey: apiKey.trim() });
  };

  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '20px',
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: '16px', fontSize: '18px' }}>AI API 설정</h3>

      <div style={{ marginBottom: '16px' }}>
        <label
          style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          AI 제공자
        </label>
        <select
          value={provider}
          onChange={(e) => setProvider(e.target.value as any)}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
          }}
        >
          <option value="claude">Claude (Anthropic)</option>
          <option value="chatgpt">ChatGPT (OpenAI)</option>
          <option value="gemini">Gemini (Google)</option>
        </select>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label
          style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          API 키
        </label>
        <div style={{ position: 'relative' }}>
          <input
            type={showKey ? 'text' : 'password'}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="API 키를 입력하세요"
            style={{
              width: '100%',
              padding: '10px',
              paddingRight: '80px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              boxSizing: 'border-box',
            }}
          />
          <button
            onClick={() => setShowKey(!showKey)}
            style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              padding: '4px 12px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '12px',
              color: '#666',
            }}
          >
            {showKey ? '숨기기' : '보기'}
          </button>
        </div>
        <p style={{ fontSize: '12px', color: '#666', marginTop: '8px', marginBottom: 0 }}>
          {provider === 'claude' && 'Claude API 키는 Anthropic Console에서 발급받을 수 있습니다.'}
          {provider === 'chatgpt' && 'OpenAI API 키는 OpenAI Platform에서 발급받을 수 있습니다.'}
          {provider === 'gemini' && 'Gemini API 키는 Google AI Studio에서 발급받을 수 있습니다.'}
        </p>
      </div>

      <button
        onClick={handleSave}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#2196F3',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#1976D2';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#2196F3';
        }}
      >
        저장
      </button>
    </div>
  );
};

export default ApiConfig;

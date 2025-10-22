import { ApiConfig, CanvasState } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function generateCode(
  config: ApiConfig,
  designData: CanvasState
): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/api/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      provider: config.provider,
      apiKey: config.apiKey,
      designData: {
        canvas: {
          width: designData.width,
          height: designData.height,
          backgroundColor: designData.backgroundColor,
        },
        elements: designData.elements,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to generate code');
  }

  const data = await response.json();
  return data.code;
}

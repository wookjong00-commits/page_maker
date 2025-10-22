import { Router, Request, Response } from 'express';
import { generateWithClaude } from '../services/claude';
import { generateWithChatGPT } from '../services/chatgpt';
import { generateWithGemini } from '../services/gemini';

const router = Router();

interface GenerateRequest {
  provider: 'claude' | 'chatgpt' | 'gemini';
  apiKey: string;
  designData: any;
}

router.post('/', async (req: Request, res: Response) => {
  try {
    const { provider, apiKey, designData }: GenerateRequest = req.body;

    if (!provider || !apiKey || !designData) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const prompt = buildPrompt(designData);
    let code: string;

    switch (provider) {
      case 'claude':
        code = await generateWithClaude(apiKey, prompt);
        break;
      case 'chatgpt':
        code = await generateWithChatGPT(apiKey, prompt);
        break;
      case 'gemini':
        code = await generateWithGemini(apiKey, prompt);
        break;
      default:
        return res.status(400).json({ error: 'Invalid provider' });
    }

    res.json({ code });
  } catch (error: any) {
    console.error('Generation error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate code' });
  }
});

function buildPrompt(designData: any): string {
  const { elements, canvas } = designData;

  let prompt = `Create a complete, production-ready HTML page based on the following design specifications.

Canvas size: ${canvas.width}px x ${canvas.height}px

Elements:
${JSON.stringify(elements, null, 2)}

Requirements:
1. Generate a complete HTML file with embedded CSS
2. Use modern, semantic HTML5
3. Make it responsive and mobile-friendly
4. Include all inline styles to match the exact positions, sizes, fonts, and colors specified
5. Add smooth animations and transitions where appropriate
6. Ensure cross-browser compatibility
7. Use flexbox or grid for layout where beneficial
8. Make sure text is readable and accessible
9. Include meta tags for SEO

Please provide ONLY the HTML code, without any explanations or markdown code blocks.`;

  return prompt;
}

export default router;

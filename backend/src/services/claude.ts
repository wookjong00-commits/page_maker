import Anthropic from '@anthropic-ai/sdk';

export async function generateWithClaude(apiKey: string, prompt: string): Promise<string> {
  const client = new Anthropic({
    apiKey: apiKey,
  });

  const message = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const textContent = message.content.find((block) => block.type === 'text');
  if (textContent && textContent.type === 'text') {
    return textContent.text;
  }

  throw new Error('No text content in response');
}

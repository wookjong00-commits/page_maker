import OpenAI from 'openai';

export async function generateWithChatGPT(apiKey: string, prompt: string): Promise<string> {
  const client = new OpenAI({
    apiKey: apiKey,
  });

  const response = await client.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    max_tokens: 4096,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error('No content in response');
  }

  return content;
}

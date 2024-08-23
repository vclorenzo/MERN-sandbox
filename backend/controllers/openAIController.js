const OpenAI = require('openai');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateText = async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const chatCompletion = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    res.json({
      text: chatCompletion.choices[0].message.content,
    });
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    res.status(500).json({
      error: 'Failed to generate text',
    });
  }
};

module.exports = {
  generateText,
};

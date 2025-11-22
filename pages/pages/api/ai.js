import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // your secret key
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { task, prompt } = req.body;

  try {
    let result;

    if (task === "solve" || task === "grammar" || task === "chat") {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful AI assistant." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7
      });
      result = response.choices[0].message.content;

    } else if (task === "image") {
      const image = await openai.images.generate({
        model: "gpt-image-1",
        prompt,
        size: "1024x1024"
      });
      result = image.data[0].url;
    } else {
      result = "Unknown task!";
    }

    res.status(200).json({ result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "Something went wrong!" });
  }
}

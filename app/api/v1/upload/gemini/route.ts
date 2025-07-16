import { NextRequest, NextResponse } from "next/server";

interface ImagePart {
  inlineData: {
    data: string;
    mimeType: string;
  };
}

interface AnalysisResult {
  image_index: number;
  anomaly_score: number;
  reasoning: string;
}

interface GeminiResponse {
  candidates?: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

export async function POST(request: NextRequest) {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "Gemini API key not found in environment variables." },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const imageFiles = formData.getAll("images") as File[];

    if (!imageFiles || imageFiles.length === 0) {
      return NextResponse.json(
        { error: "No images were uploaded." },
        { status: 400 }
      );
    }
    if (imageFiles.length > 5) {
      return NextResponse.json(
        { error: "You can upload a maximum of 5 images." },
        { status: 400 }
      );
    }

    const imageParts: ImagePart[] = await Promise.all(
      imageFiles.map(async (file) => {
        const buffer = await file.arrayBuffer();
        return {
          inlineData: {
            data: Buffer.from(buffer).toString("base64"),
            mimeType: file.type,
          },
        };
      })
    );

    const prompt = `
You are an expert agricultural analyst specializing in satellite imagery. Your task is to analyze the following satellite images of crop fields. For each image provided, you must identify and score any anomalies.

Anomalies can include, but are not limited to:
- Crop disease (e.g., discoloration, unusual patterns)
- Pest infestation
- Flood or water damage
- Fire damage
- Drought stress (e.g., browning, lack of vegetation)
- Nutrient deficiencies

Please provide your analysis as a single JSON array. Each object in the array should correspond to one of the input images, maintaining the original order.

Each JSON object MUST have the following structure:
{
  "image_index": <The 0-based index of the image>,
  "anomaly_score": <An integer score from 1 to 10, where 1 represents a perfectly healthy field and 10 represents a field with severe and widespread anomalies>,
  "reasoning": "<A concise explanation for the score. Detail the specific anomalies observed. If no anomalies are found, state that the field appears healthy and give a score of 1.>"
}

Do not include any text, explanations, or markdown formatting outside of the final JSON array.
    `;

    const payload = {
      contents: [
        {
          parts: [{ text: prompt }, ...imageParts],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
      },
    };

    const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

    const response = await fetch(geminiApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            "This is Gemini API error. Please check the API key. Sometimes the server is overloaded. Maybe try again in some time.",
        },
        { status: 500 }
      );
    }

    const data: GeminiResponse = await response.json();

    const candidate = data.candidates?.[0];
    if (!candidate?.content?.parts?.[0]) {
      return NextResponse.json(
        { error: "Invalid response structure from Gemini API." },
        { status: 500 }
      );
    }

    const analysisResultText = candidate.content.parts[0].text;
    const analysisResult: AnalysisResult[] = JSON.parse(analysisResultText);

    return NextResponse.json(analysisResult);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

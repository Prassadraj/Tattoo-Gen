"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [design, setDesign] = useState("");
  const [text, setText] = useState("");

  const data = async () => {
    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CODE}`,
          "HTTP-Referer": "http://localhost:3000", // Optional. Site URL for rankings on openrouter.ai.
          "X-Title": "vanakam", // Optional. Site title for rankings on openrouter.ai.
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-image-preview",
          messages: [
            {
              role: "user",
              content: `Create a highly detailed black-and-gray tattoo design based on this idea: ${text}. 
              Focus on ultra-clean, high-detail linework, clear silhouette, balanced composition, and minimal background. 
              Make it vector-ready line art, with smooth shading and crisp outlines. 
              High quality, ultra-detailed, professional tattoo artwork suitable for stencil and inking.
              `,
            },
          ],
          modalities: ["image", "text"],
          max_tokens: 800,
        }),
      });
      const result = await res.json();
      const url = result.choices[0].message.images[0].image_url.url;
      setDesign(url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="h-screen w-screen flex gap-5 flex-col justify-center items-center bg-gray-400">
        <div className="flex gap-4">
          <input
            type="text"
            value={text}
            className="px-2 w-[50rem]"
            onInput={(e) => setText(e.target.value)}
          />
          <div className="text-lg border p-2 rounded-md" onClick={data}>
            Click
          </div>
        </div>
        {design && (
          <Image
            src={design || "/placeholder.png"} // keep a default image in /public
            alt="Product image"
            width={500}
            height={500}
            className="bg-contain aspect-square h-[400px]"
          />
        )}
      </div>
    </>
  );
}

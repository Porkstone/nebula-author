"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { api } from "./_generated/api";

export const chatWithDocument = action({
  args: {
    documentId: v.id("documents"),
    message: v.string(),
    pdfFileId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    // Get the document content
    const document = await ctx.runQuery(api.documents.get, { id: args.documentId });
    if (!document) {
      throw new Error("Document not found");
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not set");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
      const contentParts = [
        {
          text: args.message,
        },
        {
          inlineData: {
            mimeType: "text/markdown",
            data: Buffer.from(document.content).toString('base64'),
          },
        },
      ];

      // Add PDF file if provided
      if (args.pdfFileId) {
        const pdfBlob = await ctx.storage.get(args.pdfFileId);
        if (pdfBlob) {
          const pdfBuffer = await pdfBlob.arrayBuffer();
          contentParts.push({
            inlineData: {
              mimeType: "application/pdf",
              data: Buffer.from(pdfBuffer).toString('base64'),
            },
          });
        }
      }

      const result = await model.generateContent(contentParts);

      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      throw new Error("Failed to get response from AI");
    }
  },
});



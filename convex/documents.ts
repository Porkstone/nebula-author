import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }
    
    return await ctx.db
      .query("documents")
      .withIndex("by_author", (q) => q.eq("authorId", userId))
      .order("desc")
      .collect();
  },
});

export const get = query({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }
    
    const document = await ctx.db.get(args.id);
    if (!document || document.authorId !== userId) {
      return null;
    }
    
    return document;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    content: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in to create documents");
    }
    
    return await ctx.db.insert("documents", {
      title: args.title,
      content: args.content || "# New Document\n\nStart writing your markdown here...",
      authorId: userId,
      lastModified: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("documents"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in to update documents");
    }
    
    const document = await ctx.db.get(args.id);
    if (!document || document.authorId !== userId) {
      throw new Error("Document not found or access denied");
    }
    
    const updates: any = { lastModified: Date.now() };
    if (args.title !== undefined) updates.title = args.title;
    if (args.content !== undefined) updates.content = args.content;
    
    await ctx.db.patch(args.id, updates);
  },
});

export const remove = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in to delete documents");
    }
    
    const document = await ctx.db.get(args.id);
    if (!document || document.authorId !== userId) {
      throw new Error("Document not found or access denied");
    }
    
    await ctx.db.delete(args.id);
  },
});

export const generatePdfUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in to upload files");
    }
    
    return await ctx.storage.generateUploadUrl();
  },
});

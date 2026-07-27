import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  documents: defineTable({
    title: v.string(),
    content: v.string(),
    authorId: v.id("users"),
    lastModified: v.number(),
  })
    .index("by_author", ["authorId"])
    .index("by_last_modified", ["lastModified"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});

import { pgTable, serial, text, timestamp, jsonb, varchar, boolean } from "drizzle-orm/pg-core";

// Bespoke / custom order intake submitted from the Custom Orders page.
export const customOrders = pgTable("custom_orders", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 160 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  phone: varchar("phone", { length: 40 }),
  garmentType: varchar("garment_type", { length: 80 }).notNull(),
  fabricPreference: varchar("fabric_preference", { length: 120 }),
  measurements: jsonb("measurements").$type<Record<string, string>>(),
  notes: text("notes"),
  status: varchar("status", { length: 30 }).notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// Newsletter / VIP list signups captured from footer + gallery CTA.
export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 200 }).notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// Contact / store inquiry submissions from the Store Locations page.
export const storeInquiries = pgTable("store_inquiries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  message: text("message").notNull(),
  storeCity: varchar("store_city", { length: 120 }),
  resolved: boolean("resolved").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

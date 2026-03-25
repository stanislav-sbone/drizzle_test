CREATE TYPE "public"."product_category" AS ENUM('Смартфоны', 'Ноутбуки', 'Комплектующие для ПК', 'Бытовые приборы', 'Смарт-часы');--> statement-breakpoint
CREATE TABLE "users_cart" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"items" jsonb DEFAULT '[]'::jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users_favorites" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"items" integer[] DEFAULT '{}' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" text NOT NULL,
	"first_name" varchar(30),
	"last_name" varchar(30),
	"phone" varchar(20),
	"address" text,
	"is_profile_completed" boolean DEFAULT false NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" integer PRIMARY KEY NOT NULL,
	"title" varchar(50) NOT NULL,
	"brand" varchar(20) NOT NULL,
	"description" text NOT NULL,
	"price" integer NOT NULL,
	"category" "product_category" NOT NULL,
	"images" text[] DEFAULT '{}'::text[] NOT NULL,
	"rating" numeric(2, 1) NOT NULL,
	"in_stock" boolean NOT NULL,
	"is_new" boolean NOT NULL,
	"discount" numeric(3, 2),
	"specs" jsonb
);
--> statement-breakpoint
ALTER TABLE "users_cart" ADD CONSTRAINT "users_cart_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_favorites" ADD CONSTRAINT "users_favorites_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
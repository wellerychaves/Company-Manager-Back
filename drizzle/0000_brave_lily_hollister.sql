CREATE TABLE "companies" (
	"id" varchar PRIMARY KEY NOT NULL,
	"userId" varchar NOT NULL,
	"companyName" varchar NOT NULL,
	"companyEmail" varchar NOT NULL,
	"contactPhone" varchar NOT NULL,
	"address" varchar NOT NULL,
	"description" text,
	"status" boolean DEFAULT false,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY NOT NULL,
	"firstName" varchar NOT NULL,
	"secondName" varchar NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"isAdmin" boolean DEFAULT false,
	"companies" text[] DEFAULT ARRAY[]::text[],
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);

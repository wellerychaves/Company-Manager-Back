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
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "companies_companyEmail_unique" UNIQUE("companyEmail"),
	CONSTRAINT "companies_contactPhone_unique" UNIQUE("contactPhone")
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" varchar PRIMARY KEY NOT NULL,
	"companyId" varchar NOT NULL,
	"productName" varchar NOT NULL,
	"quantity" integer NOT NULL,
	"price" integer NOT NULL,
	"description" text,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sales" (
	"id" varchar PRIMARY KEY NOT NULL,
	"companyId" varchar NOT NULL,
	"productId" varchar NOT NULL,
	"costumerId" varchar NOT NULL,
	"saleDate" timestamp DEFAULT now() NOT NULL,
	"unitPrice" integer NOT NULL,
	"totalPrice" integer NOT NULL,
	"paymentMethod" varchar NOT NULL,
	"saleStatus" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY NOT NULL,
	"firstName" varchar NOT NULL,
	"secondName" varchar NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"isAdmin" boolean DEFAULT false,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);

CREATE TABLE "planilha_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"pdv" varchar(255),
	"produto" varchar(255) NOT NULL,
	"produtos" varchar(1000),
	"funcionario" varchar(255) NOT NULL,
	"data" timestamp NOT NULL,
	"controle" varchar(255),
	"erro" varchar(500),
	"valor_desconto" numeric NOT NULL,
	"observacao" varchar(1000),
	"criado_em" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE `accounts_table` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`img` varchar(255),
	`name` varchar(255) NOT NULL,
	`alias` varchar(255) NOT NULL,
	`bio` varchar(2048),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `accounts_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `academics_table` ADD `major` varchar(255) NOT NULL;
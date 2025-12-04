CREATE TABLE `academics_table` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`level` varchar(255) NOT NULL,
	`degree` varchar(255) NOT NULL,
	`school` varchar(255) NOT NULL,
	`address` varchar(255) NOT NULL,
	`academic_year` varchar(255) NOT NULL,
	`current` boolean NOT NULL DEFAULT false,
	`user_id` bigint unsigned NOT NULL,
	CONSTRAINT `academics_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `blogs_table` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	`published` boolean NOT NULL DEFAULT false,
	`user_id` bigint unsigned NOT NULL,
	CONSTRAINT `blogs_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `experiences_table` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` varchar(1024) NOT NULL,
	`current` boolean NOT NULL DEFAULT false,
	`user_id` bigint unsigned NOT NULL,
	CONSTRAINT `experiences_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users_table` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`img` varchar(255),
	`name` varchar(255) NOT NULL,
	`bio` varchar(10),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_table_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_table_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `projects_table` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`img` varchar(255),
	`title` varchar(255) NOT NULL,
	`description` varchar(1024) NOT NULL,
	`link` varchar(255),
	`github` varchar(255),
	`user_id` bigint unsigned NOT NULL,
	CONSTRAINT `projects_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `academics_table` ADD CONSTRAINT `academics_table_user_id_users_table_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users_table`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `blogs_table` ADD CONSTRAINT `blogs_table_user_id_users_table_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users_table`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `experiences_table` ADD CONSTRAINT `experiences_table_user_id_users_table_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users_table`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `projects_table` ADD CONSTRAINT `projects_table_user_id_users_table_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users_table`(`id`) ON DELETE cascade ON UPDATE no action;
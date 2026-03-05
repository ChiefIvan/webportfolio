ALTER TABLE `academics_table` ADD `itemId` int NOT NULL;--> statement-breakpoint
ALTER TABLE `academics_table` ADD CONSTRAINT `academics_table_itemId_unique` UNIQUE(`itemId`);
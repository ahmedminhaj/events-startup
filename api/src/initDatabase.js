import db from "./database_client.js";

const initDatabase = async () => {
  const existsEvent = await db.schema.hasTable(
    "events"
  );

  if (!existsEvent) {
    await db.schema.createTable(
      "events",
      (table) => {
        table.increments("id").primary();

        table.string("title").notNullable();

        table.text("description");

        table.string("category");

        table.string("country");

        table.string("city");

        table.string("venue");

        table.string("date");

        table.string("image");

        table.integer("price").defaultTo(0);
      }
    );

    console.log("Events table created");

    await db("events").insert([
      {
        title: "Copenhagen Jazz Festival",

        description:
          "International jazz performances.",

        category: "Music",

        country: "Denmark",

        city: "Copenhagen",

        venue: "DR Koncerthuset",

        date: "2026-06-14",

        image:
          "https://images.unsplash.com/photo-1501386761578-eac5c94b800a",

        price: 399,
      },

      {
        title: "Aarhus Tech Meetup",

        description:
          "Developer networking event.",

        category: "Technology",

        country: "Denmark",

        city: "Aarhus",

        venue: "DOKK1",

        date: "2026-07-03",

        image:
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87",

        price: 149,
      },
    ]);

    console.log("Seed data inserted");
  }

  const usersExists =
  await db.schema.hasTable("users");

  if (!usersExists) {
    await db.schema.createTable(
      "users",
      (table) => {
        table.increments("id").primary();

        table
          .string("name")
          .notNullable();

        table
          .string("email")
          .notNullable()
          .unique();

        table
          .string("password")
          .notNullable();

        table.timestamps(true, true);
      }
    );

    console.log("Users table created");
  }

  const cartTableExists =
  await db.schema.hasTable(
    "cart_items"
  );

  if (!cartTableExists) {
    await db.schema.createTable(
      "cart_items",
      (table) => {
        table
          .increments("id")
          .primary();

        table
          .integer("user_id")
          .notNullable()
          .references("id")
          .inTable("users")
          .onDelete("CASCADE");

        table
          .integer("event_id")
          .notNullable()
          .references("id")
          .inTable("events")
          .onDelete("CASCADE");

        table.timestamps(
          true,
          true
        );
      }
    );

    console.log(
      "Cart items table created"
    );
  }
};

export default initDatabase;
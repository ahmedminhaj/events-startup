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

    // console.log("Events table created");

    await db("events").insert([
      {
        title: "Copenhagen AI Summit",
        description:
          "Denmark's leading artificial intelligence conference bringing together researchers, engineers, and founders shaping the future of AI in the Nordics. Keynotes, technical deep-dives, and a startup showcase across two packed days.",
        category: "Conference",
        country: "Denmark",
        city: "Copenhagen",
        venue: "DR Koncerthuset",
        date: "2026-06-14",
        image: "/images/event_1.jpg",
        price: 399,
      },
      {
        title: "Aarhus Developer Meetup",
        description:
          "A monthly gathering for software engineers and tech enthusiasts in Aarhus. Lightning talks on web development, cloud infrastructure, and open source, followed by networking and drinks.",
        category: "Meetup",
        country: "Denmark",
        city: "Aarhus",
        venue: "DOKK1",
        date: "2026-07-03",
        image: "/images/event_2.jpg",
        price: 149,
      },
      {
        title: "Nordic Cloud & DevOps Conference",
        description:
          "A deep dive into cloud-native architecture, CI/CD pipelines, and platform engineering. Hands-on workshops and expert talks from engineering leads at top Nordic tech companies.",
        category: "Conference",
        country: "Denmark",
        city: "Roskilde",
        venue: "Roskilde Festival Grounds",
        date: "2026-06-27",
        image: "/images/event_3.jpg",
        price: 549,
      },
      {
        title: "Full-Stack Web Workshop",
        description:
          "A full-day hands-on workshop covering modern full-stack development with React, Node.js, and PostgreSQL. Ideal for developers looking to level up their end-to-end skills with real project experience.",
        category: "Workshop",
        country: "Denmark",
        city: "Copenhagen",
        venue: "Refshaleøen",
        date: "2026-08-22",
        image: "/images/event_4.jpg",
        price: 189,
      },
      {
        title: "UX & Product Design Intensive",
        description:
          "A week-long workshop series on user research, interaction design, and design systems. Covering Figma, prototyping, and usability testing with mentorship from senior product designers at Danish tech firms.",
        category: "Workshop",
        country: "Denmark",
        city: "Copenhagen",
        venue: "Designmuseum Danmark",
        date: "2026-09-07",
        image: "/images/event_5.jpg",
        price: 0,
      },
      {
        title: "Open Source Odense Meetup",
        description:
          "A community-run meetup celebrating open source culture and collaboration. Project demos, contributor talks, and a beginner-friendly track for those looking to make their first open source contribution.",
        category: "Meetup",
        country: "Denmark",
        city: "Odense",
        venue: "Odense City Museum",
        date: "2026-10-02",
        image: "/images/event_6.jpg",
        price: 79,
      },
      {
        title: "Aalborg Startup & Tech Mixer",
        description:
          "Northern Denmark's biggest informal tech gathering, bringing together founders, developers, and investors for an evening of pitches, demos, and networking. Free to attend — just bring your ideas.",
        category: "Meetup",
        country: "Denmark",
        city: "Aalborg",
        venue: "Aalborg City Centre",
        date: "2026-05-28",
        image: "/images/event_7.jpg",
        price: 0,
      },
      {
        title: "Cybersecurity & Ethical Hacking Workshop",
        description:
          "A hands-on workshop covering penetration testing, threat modelling, and secure coding practices. Participants work through real-world scenarios in a sandboxed environment guided by certified security engineers.",
        category: "Workshop",
        country: "Denmark",
        city: "Copenhagen",
        venue: "City Hall Square",
        date: "2026-05-17",
        image: "/images/event_8.jpg",
        price: 299,
      },
      {
        title: "Bornholm Remote Work Retreat",
        description:
          "A two-day retreat for digital nomads and remote tech workers on the island of Bornholm. Collaborative co-working sessions, async workflow workshops, and evening talks on building sustainable remote careers.",
        category: "Workshop",
        country: "Denmark",
        city: "Rønne",
        venue: "Bornholm Art Museum",
        date: "2026-07-18",
        image: "/images/event_9.jpg",
        price: 129,
      },
      {
        title: "Aarhus Machine Learning Conference",
        description:
          "A two-day conference focused on applied machine learning, data engineering, and MLOps. Featuring talks from academic researchers and industry practitioners, plus hands-on labs using real datasets.",
        category: "Conference",
        country: "Denmark",
        city: "Aarhus",
        venue: "Various venues, Aarhus city",
        date: "2026-07-11",
        image: "/images/event_10.jpg",
        price: 229,
      },
      {
        title: "Copenhagen Indie Hackers Meetup",
        description:
          "A community evening for solo founders and small teams building profitable internet businesses. Share your metrics, get feedback on your product, and connect with other indie hackers in the Copenhagen tech scene.",
        category: "Meetup",
        country: "Denmark",
        city: "Copenhagen",
        venue: "Empire Bio & Cinemateket",
        date: "2026-09-25",
        image: "/images/event_1.jpg",
        price: 120,
      },
      {
        title: "React & TypeScript Masterclass",
        description:
          "An intensive one-day masterclass on building scalable React applications with TypeScript. Covers advanced patterns, performance optimisation, testing strategies, and component library architecture.",
        category: "Workshop",
        country: "Denmark",
        city: "Hillerød",
        venue: "Frederiksborg Castle Gardens",
        date: "2026-08-08",
        image: "/images/event_2.jpg",
        price: 349,
      },
    ]);
    // console.log("event data inserted");
  }

  const usersExists =
  await db.schema.hasTable("users");

  if (!usersExists) {
    await db.schema.createTable(
      "users",
      (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("email").notNullable().unique();
        table.string("password").notNullable();
        table.timestamps(true, true);
      }
    );

    // console.log("Users table created");
  }

  const cartTableExists =
  await db.schema.hasTable(
    "cart_items"
  );

  if (!cartTableExists) {
    await db.schema.createTable(
      "cart_items",
      (table) => {
        table.increments("id").primary();
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

    // console.log(
    //   "Cart items table created"
    // );
  }

  const bookingsExists = await db.schema.hasTable("bookings");
 
  if (!bookingsExists) {
    await db.schema.createTable("bookings", (table) => {
      table.increments("id").primary();
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
      table.timestamps(true, true);
    });
 
    // console.log("Bookings table created");
  }
};

export default initDatabase;
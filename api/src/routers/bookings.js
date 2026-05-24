import express from "express";
import jwt from "jsonwebtoken";
import db from "../database_client.js";

const router = express.Router();

const getUserFromRequest = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  const token = authHeader.split(" ")[1];
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
};

/* ─── to get user's booked events ─── */
router.get("/", async (req, res) => {
  try {
    const user = getUserFromRequest(req);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const bookings = await db("bookings")
      .join("events", "bookings.event_id", "=", "events.id")
      .where("bookings.user_id", user.id)
      .orderBy("bookings.created_at", "desc")
      .select(
        "bookings.id as booking_id",
        "bookings.created_at as booked_at",
        "events.id",
        "events.title",
        "events.date",
        "events.city",
        "events.venue",
        "events.image",
        "events.category",
        "events.price"
      );

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

/* ─── to book all current cart items ─── */
router.post("/", async (req, res) => {
  try {
    const user = getUserFromRequest(req);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    // Fetch the user's cart items
    const cartItems = await db("cart_items")
      .where({ user_id: user.id })
      .select("event_id");

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Check for already-booked events to avoid duplicates
    const eventIds = cartItems.map((item) => item.event_id);

    const alreadyBooked = await db("bookings")
      .where({ user_id: user.id })
      .whereIn("event_id", eventIds)
      .select("event_id");

    const alreadyBookedIds = new Set(
      alreadyBooked.map((b) => b.event_id)
    );

    const toInsert = eventIds
      .filter((id) => !alreadyBookedIds.has(id))
      .map((event_id) => ({ user_id: user.id, event_id }));

    if (toInsert.length > 0) {
      await db("bookings").insert(toInsert);
    }

    // Clear the cart after booking
    await db("cart_items").where({ user_id: user.id }).delete();

    res.status(201).json({
      message: "Booking confirmed",
      booked: toInsert.length,
      skipped: alreadyBookedIds.size,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to confirm booking" });
  }
});

export default router;
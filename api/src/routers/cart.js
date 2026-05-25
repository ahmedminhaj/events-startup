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

router.get("/", async (req, res) => {
  try {
    const user = getUserFromRequest(req);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const cartItems = await db("cart_items")
      .join("events", "cart_items.event_id", "=", "events.id")
      .where("cart_items.user_id", user.id)
      .select(
        "events.id",
        "events.title",
        "events.date",
        "events.city",
        "events.image",
        "events.price"
      );

    res.json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch cart" });
  }
});

router.post("/", async (req, res) => {
  try {
    const user = getUserFromRequest(req);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { eventId } = req.body;
    if (!eventId) return res.status(400).json({ message: "Event ID required" });

    const event = await db("events").where({ id: eventId }).first();
    if (!event) return res.status(404).json({ message: "Event not found" });

    const existing = await db("cart_items")
      .where({ user_id: user.id, event_id: eventId })
      .first();
    if (existing) return res.status(409).json({ message: "Event already in cart" });

    await db("cart_items").insert({ user_id: user.id, event_id: eventId });

    res.status(201).json({ message: "Added to cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add item" });
  }
});

router.delete("/:eventId", async (req, res) => {
  try {
    const user = getUserFromRequest(req);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { eventId } = req.params;

    await db("cart_items")
      .where({ user_id: user.id, event_id: eventId })
      .delete();

    res.json({ message: "Item removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to remove item" });
  }
});

export default router;
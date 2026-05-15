import express from "express";

import connection from "../database_client.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const events = await connection("events")
      .where({
        country: "Denmark",
      })
      .orderBy("date", "asc");

    res.json(events);
  } catch (error) {
    res.status(500).json({
      message: `Failed to fetch events: ${error.message}`,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const event = await connection("events")
      .where({
        id: req.params.id,
      })
      .first();

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({
      message: `Failed to fetch event: ${error.message}`,
    });
  }
});

export default router;
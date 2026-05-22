import express from "express";

import db from "../database_client.js";

const router =
  express.Router();

/*
  GET CART ITEMS
*/

router.get(
  "/",
  async (req, res) => {
    try {
      const cartItems =
        await db(
          "cart_items"
        )
          .join(
            "events",
            "cart_items.event_id",
            "=",
            "events.id"
          )
          .where(
            "cart_items.user_id",
            req.user.id
          )
          .select(
            "events.id",
            "events.title",
            "events.date",
            "events.location",
            "events.image",
            "events.price"
          );

      res.json(cartItems);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to fetch cart",
      });
    }
  }
);

/*
  ADD TO CART
*/

router.post(
  "/",
  async (req, res) => {
    try {
      const { eventId } =
        req.body;

      if (!eventId) {
        return res
          .status(400)
          .json({
            message:
              "Event ID required",
          });
      }

      /*
        Check event exists
      */

      const event =
        await db("events")
          .where({
            id: eventId,
          })
          .first();

      if (!event) {
        return res
          .status(404)
          .json({
            message:
              "Event not found",
          });
      }

      /*
        Prevent duplicates
      */

      const existing =
        await db(
          "cart_items"
        )
          .where({
            user_id:
              req.user.id,

            event_id: eventId,
          })
          .first();

      if (existing) {
        return res
          .status(409)
          .json({
            message:
              "Event already in cart",
          });
      }

      await db(
        "cart_items"
      ).insert({
        user_id:
          req.user.id,

        event_id: eventId,
      });

      res.status(201).json({
        message:
          "Added to cart",
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to add item",
      });
    }
  }
);

/*
  REMOVE ITEM
*/

router.delete(
  "/:eventId",
  async (req, res) => {
    try {
      const { eventId } =
        req.params;

      await db("cart_items")
        .where({
          user_id:
            req.user.id,

          event_id: eventId,
        })
        .delete();

      res.json({
        message:
          "Item removed",
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to remove item",
      });
    }
  }
);

export default router;
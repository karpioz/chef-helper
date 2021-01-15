// This file contains all routes involved authentication

import express from "express";
const router = express.Router();

router.get("/signup", (req, res) => {
  res.json({
    data: "you hit signup endpoint",
  });
});

export default router;

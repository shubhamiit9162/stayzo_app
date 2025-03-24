const express = require("express");
const router = express.Router();

// ✅ Dummy Payment Route
router.post("/", (req, res) => {
  const { amount } = req.body;
  if (!amount) return res.status(400).json({ message: "Amount is required" });

  res.json({ message: "Payment successful", amount });
});

module.exports = router;

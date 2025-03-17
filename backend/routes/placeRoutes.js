const express = require("express");
const {
  getAllPlaces,
  getPlaceById,
  addPlace,
  updatePlace,
  deletePlace,
} = require("../controllers/placeController");

const router = express.Router();

router.get("/", getAllPlaces);
router.get("/:id", getPlaceById);
router.post("/", addPlace);
router.put("/:id", updatePlace);
router.delete("/:id", deletePlace);

module.exports = router;

const express = require("express");
const User = require("../classes/User.class");
const knex = require("../plugins/knex");
const { body, param } = require("express-validator");
const router = express.Router();

// Define your routes here

const user = new User(knex);

router.get("/", async (req, res) => {
  try {
    const result = await user.getAll();
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await user.getById(id);
    if (!result) {
      return res.status(404).json({ success: false, error: "Data not found" });
    }
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

router.put("/:id",[body("name").exists().isString(), body("email").exists().isEmail()], async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const result = await user.update(id, { name, email });
    if (!result) {
      return res.status(404).json({ success: false, error: "Data not found" });
    }
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await user.delete(id);
    if (!result) {
      return res.status(404).json({ success: false, error: "Data not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Data deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;

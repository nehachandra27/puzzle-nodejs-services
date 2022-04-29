module.exports = app => {
    const winners = require("../controllers/winners.controller.js");
    var router = require("express").Router();
    // Create a new detail
    router.post("/", winners.create);
    // Retrieve all detail
    router.get("/", winners.findAll);
    // Retrieve all published detail
    router.get("/published", winners.findAllPublished);
    // Retrieve a single detail with id
    router.get("/:id", winners.findOne);
    // Update a detail with id
    router.put("/:id", winners.update);
    // Delete a detail with id
    router.delete("/:id", winners.delete);
    // Create a new detail
    router.delete("/", winners.deleteAll);
    app.use('/api/winners', router);
  };
const db = require("../models");
const Winners = db.winners;
// Create and Save a new detail
exports.create = (req, res) => {
    console.log("---------aaaaaaaaaaaa-------->")
    // Validate request
    if (!req.body.name) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    // Create 
    console.log("---------ddddddddddddd-------->",req.body)
    const winners = new Winners({
      name: req.body.name,
      email: req.body.email,
      cellno: req.body.cellno
    });
    // Save detail in the database
    

    db.mongoose
    .connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Connected to the database!");
      winners
      .save(winners)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Detail."
        });
      });
    })
    .catch(err => {
      console.log("Cannot connect to the database!", err);
      process.exit();
    });


  }
// Retrieve all details from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    Winners.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving details."
        });
      });
  };
// Find a single detail with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Winners.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found detail with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Detail with id=" + id });
      });
  };
// Update a detail by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
    const id = req.params.id;
    Winners.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update detail with id=${id}. Maybe Detail was not found!`
          });
        } else res.send({ message: "Detail was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating detail with id=" + id
        });
      });
  }
// Delete detail with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Winners.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete detail with id=${id}. Maybe Tutorial was not found!`
          });
        } else {
          res.send({
            message: "Detail was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete detail with id=" + id
        });
      });
  };
// Delete all detail from the database.
exports.deleteAll = (req, res) => {
    Winners.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} details were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all details."
        });
      });
  };
// Find all published details
exports.findAllPublished = (req, res) => {
  
};
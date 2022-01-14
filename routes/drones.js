const express = require("express");
const async = require("hbs/lib/async");
const router = express.Router();
const droneModel = require("../models/Drone.model");
// require the Drone model here

router.get("/drones", (req, res, next) => {
  // Iteration #2: List the drones
  // ... your code here
  droneModel
    .find()
    .then((dbResponse) => {
      console.log("Database response:", dbResponse);
      res.render("drones/list.hbs", {
        drones: dbResponse,
      });
    })
    .catch((e) => console.error(e));
});

router.get("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  res.render("drones/create-form.hbs");
});

router.post("/drones/create", async (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  try {
    await droneModel.create(req.body);
    res.redirect("/drones");
  } catch (err) {
    next(err);
  }
});

router.get("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  droneModel
    .findById(req.params.id)
    .then((drones) =>
      res.render("drones/update-form.hbs", { droneToEdit: drones })
    )
    .catch(next);
});

router.post("/drones/:id/edit", async (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  try {
    await droneModel.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/drones");
  } catch (err) {
    next(err);
  }
});

router.post("/drones/:id/delete", (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
  const { Id } = req.params;

  droneModel
  .findByIdAndDelete(Id)
    .then(() => res.redirect("/drones"))
    .catch((err) => next(err));
});

module.exports = router;

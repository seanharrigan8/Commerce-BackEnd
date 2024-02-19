const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

//find all tags with associated data

router.get("/", (req, res) => {
  Tag.findAll()
    .then((tagData) => {
      res.json(tagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//find SINGLE tag by id value
router.get("/:id", (req, res) => {
  Tag.findByPk(req.params.id, {
    include: [{ model: Product, as: "products" }],
  })
    .then((tagData) => {
      if (!tagData) {
        res.status(404).json({ message: "No tag found with this id" });
        return;
      }
      res.status(200).json(tagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//create a new tag

router.post("/", (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((tagData) => res.json(tagData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//update existing tag by id value
router.put("/:id", (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((tagData) => {
      if (!tagData) {
        res.status(404).json({ message: "No tag found with this id" });
        return;
      }
      res.json(tagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//delete existing tag using id value
router.delete("/:id", (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((tagData) => {
      if (!tagData) {
        res.status(404).json({ message: "No tag found with this id" });
        return;
      }
      res.json(tagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

const router = require("express").Router();
const { Category, Product } = require("../../models");

//find all categories//

router.get("/", (req, res) => {
  Category.findAll()
    .then((categoryData) => {
      res.json(categoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//find category by id value//

router.get("/:id", (req, res) => {
  Category.findByPk(req.params.id, {
    include: [{ model: Product, as: "products" }],
  })

    .then((categoryData) => {
      if (!categoryData) {
        res.status(404).json({ message: "No category found with this id" });
        return;
      }
      res.status(200).json(categoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

///create a new category//
router.post("/", (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  })
    .then((categoryData) => res.json(categoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//update a category by its `id` value//
router.put("/:id", (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((categoryData) => {
      if (!categoryData[0]) {
        res.status(404).json({ message: "No category found with this id" });
        return;
      }
      res.json(categoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//delete category by id//
router.delete("/:id", (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((categoryData) => {
      if (!categoryData) {
        res.status(404).json({ message: "No category found with this id" });
        return;
      }
      res.json(categoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

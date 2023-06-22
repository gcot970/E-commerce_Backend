const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({ include: Product });
    res.json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});


router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findOne({
      where: { id: req.params.id },
      include: Product,
    });
    res.json(category);
  } catch (error) {
    res.status(500).json(error);
  }
});


router.post('/', async (req, res) => {
  // create a new category
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
});


router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    await Category.update(req.body, { where: { id: req.params.id } });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json(error);
  }
});


router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    await Category.destroy({ where: { id: req.params.id } });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json(error);
  }
});


module.exports = router;

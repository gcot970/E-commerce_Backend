const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint


router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({ include: Product });
    res.json(tags);
  } catch (error) {
    res.status(500).json(error);
  }
});


router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findOne({
      where: { id: req.params.id },
      include: Product,
    });
    res.json(tag);
  } catch (error) {
    res.status(500).json(error);
  }
});


router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tag = await Tag.create(req.body);
    res.status(201).json(tag);
  } catch (error) {
    res.status(500).json(error);
  }
});


router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    await Tag.update({ tag_name: req.body.tag_name }, { where: { id: req.params.id } });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json(error);
  }
});


router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    await Tag.destroy({ where: { id: req.params.id } });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json(error);
  }
});


module.exports = router;

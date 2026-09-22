
const express = require('express');
const router = express.Router();

const categories = [
    { id: 1, name: "Electronics", type: "physical" },
    { id: 2, name: "Software", type: "digital" }
];

router.get("/", (req, res) => {
    let result = categories;
    if (req.query.type) {
        result = categories.filter(c => c.type === req.query.type);
    }

    res.status(200).json({
        success: true,
        data: result,
        meta: { timestamp: new Date().toISOString(), count: result.length }
    });
});

router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const category = categories.find(category => category.id === id);

    if (!category) {
        return res.status(404).json({
            success: false,
            error: { code: "NOT_FOUND", message: "Category not found" }
        });
    }

    const response = {
        success: true,
        data: [category],
        meta: { timestamp: new Date().toISOString(), count: 1 }
    };
    res.status(200).json(response);
});

router.post('/', (req, res) => {
    const { name, type } = req.body;

    if (!name || !type) {
        return res.status(400).json({
            success: false,
            error: { code: "BAD_REQUEST", message: "Missing required fields" }
        });
    }

    const newCategory = {
        id: categories.length + 1,
        name,
        type
    };
    categories.push(newCategory);
    // console.log(newCategory);

    res.status(201).json({
        success: true,
        data: [newCategory],
        meta: { timestamp: new Date().toISOString(), count: 1 }
    });
});

router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    let categoryIndex = categories.findIndex(cat => cat.id === id);

    if (categoryIndex === -1) {
        return res.status(404).json({
            success: false,
            error: { code: "NOT_FOUND", message: "Category not found" }
        });
    }

    categories.splice(categoryIndex, 1);
    res.status(204).send();
});

module.exports = router;
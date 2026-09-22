
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


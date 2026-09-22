const express = require('express');
const router = express.Router();
let categories = [
{ id: 1, name: "Electronics", type: "physical" },
{ id: 2, name: "Software", type: "digital" }
];
const sendResponse = (res, status, data) => {
res.status(status).json({
success: true,
data: data,
meta: { timestamp: new Date().toISOString(), count: Array.isArray(data) ? data.length : 1 }
});
};

router.get('/:id', (req, res) => {
const user = users.find(u => u.id === parseInt(req.params.id));
if (!user) {
return res.status(404).json({
success: false,
error: { code: "NOT_FOUND", message: "User not found." }
});
}
res.status(200).json({
success: true,
data: user,
meta: { timestamp: new Date().toISOString(), count: 1 }
});
});
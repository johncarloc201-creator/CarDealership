const Purchase = require("./models/buy");

app.post("/buycar", async (req, res) => {
    try {
        const purchase = new Purchase(req.body);
        await purchase.save();
        res.json({ success: true, message: "Purchase saved!", data: purchase });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

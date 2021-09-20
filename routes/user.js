const express = require("express");
const router = express.Router();
const User = require("../models/User");



router.get("/", (req, res)=>{
    res.send("We are on user page");
});


router.post("/new", async (req, res) => {
    const user = await User.create(req.body);
    res.status(200).json({
        success: true,
        user
    });
    
    
});



module.exports = router;
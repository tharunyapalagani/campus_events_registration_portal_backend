const express = require("express");
const router=express.Router();

const{
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent,
}=require("../controllers/eventController");
router.post("/",createEvent);
router.get("/",getEvents);
router.get("/:id",getEventById);
router.put("/",updateEvent);
router.delete("/",deleteEvent);

module.exports=router;
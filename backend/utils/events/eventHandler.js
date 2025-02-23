const EventEmitter = require('events');
const eventHandler = new EventEmitter();

// on product deleted, delete the associated image
const handleDestroy = require("../cloudinary/handleDestroy")

eventHandler.on("productDeleted", async (event) => {
    console.log("why tho")
    try {
        await handleDestroy(event.image_id, event.resource_type);
    } catch (error) {
        console.log(error);
    }
})

module.exports = eventHandler
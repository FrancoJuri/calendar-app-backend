const { response, request } = require('express');
const Event = require('../models/Event');


const getEvents = async (req, res = response) => {

    const events = await Event.find({ user: req.uid });

    res.json({
        ok: true,
        events,
    })
}

const createEvent = async (req, res = response) => {

    const event = new Event(req.body);

    try {

        event.user = req.uid;

        const eventSaved = await event.save();

        res.json({
            ok: true,
            event: eventSaved,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error al crear un evento, intentalo de nuevo más tarde.',
        })
    }
}

const updateEvent = async (req = request, res = response) => {

    const eventId = req.params.id;

    try {

        const event = await Event.findById(eventId);

        if(!event) {
            return res.status(404).json({
                ok: false,
                msg: 'No hay ningun evento con ese ID',
            })
        }

        if(event.user.toString() !== req.uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permisos para actualizar este evento',
            })
        }

        const newEvent = {
            ...req.body,
            user: req.uid,
        }

        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

        res.json({
            ok: true,
            event: updatedEvent,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error al actualizar el evento o el ID indicado no existe.',
        })
    }

}

const deleteEvent = async (req, res = response) => {

    const eventId = req.params.id;

    try {

        const event = await Event.findById(eventId);

        if(!event) {
            return res.status(404).json({
                ok: false,
                msg: 'No hay ningun evento con ese ID',
            })
        }

        if(event.user.toString() !== req.uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permisos para eliminar este evento',
            })
        }

        await Event.findByIdAndDelete(eventId);

        res.json({
            ok: true,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error al eliminar el evento o el ID indicado no existe.',
        })
    }

}





module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}
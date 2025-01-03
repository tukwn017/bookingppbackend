import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const bookingSchema = new mongoose.Schema({
    date: String,
    time: String,
    guests: Number,
    name: String,
    contact: String,
});

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { date, time, guests, name, contact } = req.body;

        const existingBooking = await Booking.findOne({ date, time });
        if (existingBooking) {
            return res.status(400).json({ message: 'Slot already booked' });
        }

        const newBooking = new Booking({ date, time, guests, name, contact });
        await newBooking.save();
        return res.json(newBooking);
    }
    res.status(405).json({ message: 'Method not allowed' });
}

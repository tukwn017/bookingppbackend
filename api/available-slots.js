import mongoose from 'mongoose';

//'mongodb+srv://tinkukr45679:MongoMongo@projectdb.1iexv.mongodb.net/?retryWrites=true&w=majority&appName=ProjectDB'
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
        const { date, time } = req.body;
        const existingBookings = await Booking.find({ date, time });
        if (existingBookings.length >= 5) {
            return res.json({ slots: [] });
        }
        return res.json({ slots: ['12:00 PM', '1:00 PM', '2:00 PM'] });
    }
    res.status(405).json({ message: 'Method not allowed' });
}

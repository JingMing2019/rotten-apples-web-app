import mongoose from 'mongoose'

export const bookSchema = new mongoose.Schema(
  {
    google_id: { type: String, require: false},
    title: { type: String, required: true },
    subtitle: { type: String, required: false },
    authors: [{ type: String, required: true }],
    image_url: { type: String, required: false },
    rating: { type: Number, required: true, default: 0 },
    liked: {type: Array, default: []},
    stats: {
      numReviews: {
        type: Number,
        required: true,
        default: 0,
      },
      likes: {
        type: Number,
        default: 0,
      },
    },
    description : {type: String, required: true},
    published_date: {type: String, required: true},
    page: {type: Number, required: false},
  },
  {
    timestamps: true,
  }
)

const Book = mongoose.model('Book', bookSchema);

export default Book;
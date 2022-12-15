import User from "../models/userModel.js"

// export const findUserByLikedBooksBookId = (bid) => User.aggregate([
//     {
//         $lookup: {
//             from: "books",
//             localField: "likedBooks",
//             foreignField: "_id",
//             as:
//         }
//     }
// ])

export const findUserById = (uid) => User.findById(uid)

export const findUsersByIdArray = (uidArray) => User.find({
    '_id': {
        $in: [uidArray]
    }
})

export const findUsersByLikedBooksId = (bid) => User.find({
    'likedBooks': {
        $elemMatch: {
            'book': bid
        }
    }
})


export const findUsersByOwnedBooksId = (bid) => User.find({
    'ownedBooks': {
        $elemMatch: {
            'book': bid
        }
    }
})

// find users who have `bid` in their likedBooks OR ownedBooks field
export const findUsersByLikedAndOwnedBooksId = (bid) => User.find(
    {
        $or:
            [
                {'likedBooks': {
                    $elemMatch: {'book': bid}}
                },
                {'ownedBooks': {
                    $elemMatch: {'book': bid}}
                },
            ]
})
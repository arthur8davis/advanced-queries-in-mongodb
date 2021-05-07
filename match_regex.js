db.reports.aggregate([
    {
        $match: {
            _id: ObjectId("60246f462af1d12b34ceab77")
        }
    },
    {
        $unwind: "$items"
    },
    {
        $match: {
            "items.key": {
                $regex: "^[a-zA-Z0-9]+.$"
            }
        }
    },
    {
        $project: {
            _id: 1,
            // _id: "$items._id",
            key: "$items.key",
            size: "$items.size",
            pages: "$items.pages",
            name: "$items.name",
            idItemFormat: "$items.idItemFormat",
        }
    },
//     {
//         $group: { 
//             _id: "$_id",
//             "size": {"$sum": "$size"},
// 			"pages": {"$sum": "$pages"},
//         }
//     }
])
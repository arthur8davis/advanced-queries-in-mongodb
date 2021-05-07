db.assets.aggregate([
    { 
        "$facet": {
            data: [
                {
                    $group:{
                        "_id": "$state",
                        "count": {$sum: 1}
                    }
                },
                { $addFields: { array: [{ k: "$_id", v: "$count"}] }},
                { $replaceRoot: { newRoot: { $arrayToObject: "$array" }}},
                {
                    $group:{
                        "_id": null,
                        "result": {$mergeObjects: {
                            Bueno: "$Bueno",
                            Regular: "$Regular",
                            Malo: "$Malo"
                        }},
                    }
                },
                {
                    $project: {
                        Bueno: "$result.Bueno",
                        Regular: "$result.Regular",
                        Malo: "$result.Malo",
                    }
                }
            ]
        }
    },
    { 
        "$project": {
            "Bueno": { "$ifNull": [{ "$arrayElemAt": ["$data.Bueno", 0] }, 0 ]},
            "Malo": { "$ifNull": [{ "$arrayElemAt": ["$data.Malo", 0] }, 0 ]},
            "Regular": { "$ifNull": [{ "$arrayElemAt": ["$data.Regular", 0] }, 0 ]},
        }
    }
])
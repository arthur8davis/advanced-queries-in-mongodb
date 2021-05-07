db.projects.aggregate([
    {
        $facet:{
            executed:[
                { "$unwind": {"path":"$annualExecutions", "preserveNullAndEmptyArrays": true}},
                { "$project": {"annualExecutions": 1} },
                { "$match": {"annualExecutions.year": 2020} },
                { "$project": { "months": [ "$annualExecutions.before", "$annualExecutions.jan", "$annualExecutions.feb", "$annualExecutions.oct", "$annualExecutions.nov"] } },
                {
                    $project: {
                        "MM": {
                            $sum: {
                                $reduce: {
                                    input: "$months.MM",
                                    initialValue: [],
                                    in: { $concatArrays: ["$$value", "$$this"] }
                                }
                            },
                        },
                        "PN": {
                            $sum: {
                                $reduce: {
                                    input: "$months.PN",
                                    initialValue: [],
                                    in: { $concatArrays: ["$$value", "$$this"] }
                                }
                            },
                        },
                        "DD": {
                            $sum: {
                                $reduce: {
                                    input: "$months.DD",
                                    initialValue: [],
                                    in: { $concatArrays: ["$$value", "$$this"] }
                                }
                            },
                        },
                        "CDFis": {"$sum": "$months.CDFis"},
                    }
                },
                {
                    $project: {
                        "GDE": {
                            $add: [
                                "$CDFis",
                                "$MM",
                                "$PN",
                                "$DD",
                            ]
                        },
                    }
                }
            ],
            schedule:[
                { "$unwind": {"path":"$annualSchedules", "preserveNullAndEmptyArrays": true}},
                { "$project": {"annualSchedules": 1} },
                { "$match": {"annualSchedules.year": 2020} },
                { "$project": { "months": [ "$annualSchedules.before", "$annualSchedules.jan", "$annualSchedules.feb", "$annualSchedules.oct", "$annualSchedules.nov"] } },
                {
                    $project: {
                        "MM": {
                            $sum: {
                                $reduce: {
                                    input: "$months.MM",
                                    initialValue: [],
                                    in: { $concatArrays: ["$$value", "$$this"] }
                                }
                            },
                        },
                        "PN": {
                            $sum: {
                                $reduce: {
                                    input: "$months.PN",
                                    initialValue: [],
                                    in: { $concatArrays: ["$$value", "$$this"] }
                                }
                            },
                        },
                        "DD": {
                            $sum: {
                                $reduce: {
                                    input: "$months.DD",
                                    initialValue: [],
                                    in: { $concatArrays: ["$$value", "$$this"] }
                                }
                            },
                        },
                        "CD": {"$sum": "$months.CD"},
                    }
                },
                {
                    $project: {
                        "GDS": {
                            $add: [
                                "$CD",
                                "$MM",
                                "$PN",
                                "$DD",
                            ]
                        },
                    }
                }
            ],
        }
    },

    {
        $project: {
            "array": {
                $concatArrays: ["$executed", "$schedule"]
            }
        },
    },
    {
        $unwind: "$array"
    },
    {
        $group:{
            _id: "$array._id",
            "ex": {
                $sum: "$array.GDE"
            },
            "sh": {
                $sum: "$array.GDS"
            },
        }
    },
    {
        $addFields: {
            "flag": {$multiply:[ "$sh", 0.85]},
        }
    },
    {
        $project: {
            "value": {
                $switch: {
                    branches: [
                        { case: {$gte: ["$ex","$flag"]}, then: "PL" },
                    ],
                    default: "AT"
                }
            }
        }
    }
])
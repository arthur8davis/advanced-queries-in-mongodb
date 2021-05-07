db.projects.aggregate([
    {
			"$match": {
				"_id": ObjectId("5f9ad4588683e45ae4677a3c"),
			},
		},
    { "$unwind": {"path":"$annualExecutions", "preserveNullAndEmptyArrays": true}},
    { "$project": {"annualExecutions": 1} },
    { "$match": {"annualExecutions.year": 2020} },
    { "$project": { 
            "months": [ "$annualExecutions.before", "$annualExecutions.jan", "$annualExecutions.feb", "$annualExecutions.mar", "$annualExecutions.apr", "$annualExecutions.may", "$annualExecutions.jun", "$annualExecutions.jul", "$annualExecutions.aug", "$annualExecutions.sep", "$annualExecutions.oct", "$annualExecutions.nov", "$annualExecutions.dec"],
            "annualExecutions": 1
        }
    },
    {
        $project: {
            "CDFis": {"$sum": "$months.CDFis"},
            "roundFis": {"$sum": "$months.roundFis"},
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
            "CDFin": {"$sum": "$months.CDFin"},
            "GG": {"$sum": "$months.GG"},
            "GS": {"$sum": "$months.GS"},
            "GET": {"$sum": "$months.GET"},
            "GLT": {"$sum": "$months.GLT"},
            "OG": {"$sum": "$months.OG"},
            "roundFin": {"$sum": "$months.roundFin"},
            "annualExecutions": 1
        }
    },
    {
        $project: {
            "_id": 0,
            "annualExecutions.AFin": {
                $add: [
                    "$CDFin",
                    "$GG",
                    "$GS",
                    "$GET",
                    "$GLT",
                    "$OG",
                    "$roundFin",
                ]
            },
            "annualExecutions.AFis": {
                $add: [
                    "$CDFis",
                    "$roundFis",
                    "$MM",
                    "$PN",
                    "$DD",
                ]
            },
            "annualExecutions.before": 1,
            "annualExecutions.jan": 1,
            "annualExecutions.feb": 1,
            "annualExecutions.mar": 1,
            "annualExecutions.apr": 1,
            "annualExecutions.may": 1,
            "annualExecutions.jun": 1,
            "annualExecutions.jul": 1,
            "annualExecutions.aug": 1,
            "annualExecutions.sep": 1,
            "annualExecutions.oct": 1,
            "annualExecutions.nov": 1,
            "annualExecutions.dec": 1,
        }
    }
    // {
    //     $project: {
    //         "AFin": {
    //             $add: [
    //                 "$CDFin",
    //                 "$GG",
    //                 "$GS",
    //                 "$GET",
    //                 "$GLT",
    //                 "$OG",
    //                 "$roundFin",
    //             ]
    //         },
    //         "AFis": {
    //             $add: [
    //                 "$CDFis",
    //                 "$roundFis",
    //                 "$MM",
    //                 "$PN",
    //                 "$DD",
    //             ]
    //         },
    //     }
    // },
    // {
    //     $addFields: {
    //         "annualExecutions.AFin": {
    //             $add: [
    //                 "$CDFin",
    //                 "$GG",
    //                 "$GS",
    //                 "$GET",
    //                 "$GLT",
    //                 "$OG",
    //                 "$roundFin",
    //             ]
    //         },
    //         "annualExecutions.AFis": {
    //             $add: [
    //                 "$CDFis",
    //                 "$roundFis",
    //                 "$MM",
    //                 "$PN",
    //                 "$DD",
    //             ]
    //         },
    //     }
    // }
])
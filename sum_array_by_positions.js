db.projects.aggregate([
    {
		"$match": {
			"_id": ObjectId("5f9ae6658683e45ae4677cc3"),
// 			code: "2362390"
		},
	},
	{
		"$unwind": "$annualExecutions",
	},
	{
		"$project": {"annualExecutions": 1},
	},
	{
		"$match": {"annualExecutions.year": 2018},
	},
// 	{
// 		"$project": {
// 		    "before": "$annualExecutions.before",
// 		    "jan": "$annualExecutions.jan",
// 		    "feb": "$annualExecutions.feb",
// 		    "oct": "$annualExecutions.oct",
// 		    "nov": "$annualExecutions.nov",
// 		},
// 	},
	{
	    "$project": {
            "months": [ "$annualExecutions.jan", "$annualExecutions.feb"],
        }
	},
	{
        "$addFields": {
            "MM": {
                "$reduce": {
                    "input": "$months.MM",
                    "initialValue": [],
                    "in": {
                        "$map": {
                            "input": {
                                "$zip": {
                                    "inputs": ["$$this", "$$value"],
                                    "useLongestLength": true,
                                }
                            },
                            "in": { "$sum": "$$this"}
                        }
                    }
                }
            },
            "PN": {
                "$reduce": {
                    "input": "$months.PN",
                    "initialValue": [],
                    "in": {
                        "$map": {
                            "input": {
                                "$zip": {
                                    "inputs": ["$$this", "$$value"],
                                    "useLongestLength": true,
                                }
                            },
                            "in": { "$sum": "$$this"}
                        }
                    }
                }
            },
            "DD": {
                "$reduce": {
                    "input": "$months.DD",
                    "initialValue": [],
                    "in": {
                        "$map": {
                            "input": {
                                "$zip": {
                                    "inputs": ["$$this", "$$value"],
                                    "useLongestLength": true,
                                }
                            },
                            "in": { "$sum": "$$this"}
                        }
                    }
                }
            }
        }
    },
	{
	    "$project": {
            "CDFin": {"$sum": "$months.CDFin"},
            "GG": {"$sum": "$months.GG"},
            "MM": 1,
            "PN": 1,
            "DD": 1,
        }
	},
])
db.projects.aggregate([
     {
		"$match": {
// 			"_id": ObjectId("5f9ae6658683e45ae4677cc3"),
			code: "2362390"
		},
	},
	{
		"$unwind": "$annualExecutions",
	},
	{
		"$project": {"annualExecutions": 1},
	},
	{
		"$match": {"annualExecutions.year": 2020},
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
            "months": [ "$annualExecutions.before", "$annualExecutions.jan", "$annualExecutions.feb", "$annualExecutions.oct", "$annualExecutions.nov"],
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
            "GS": {"$sum": "$months.GS"},
            "GE": {"$sum": "$months.GE"},
            "OG": {"$sum": "$months.OG"},
            "GLT": {"$sum": "$months.GLT"},
            "GET": {"$sum": "$months.GET"},
            "MM": {$sum: "$MM"},
            "PN": {$sum: "$PN"},
            "DD": {$sum: "$DD"},
        }
	},
	{
	    $project: {
	        "GD": {
	            $add: [
   	                "$CDFin",
	                "$MM",
	                "$PN",
	                "$DD",
	               // "$CDFin",
	               // "$CDFin",
	               // "$CDFin",
	               // "$CDFin",
	           ]
	        },
	        "GI": {
	            $add: [
	                "$GG",
	                "$GS",
	                "$GE",
	                "$OG",
	                "$GLT",
	                "$GET",
	           ]
	        }
	   }
	},
	{
	    $project: {
	        "value":{
	            $switch: {
	              branches: [
	                 { 
	                     case: {
    	                     $gt: [{
    	                         $divide: ["$GD", "$GI"]
    	                     }, 1]
	                     }, 
	                    then: "PL"
	                 },
	                 { 
	                     case: {
	                        $and: [
	                            {
	                                $gte: [
	                                    {
	                                        $divide: ["$GD", "$GI"]
	                                    },
	                                    
	                                , 0.85]
	                            },
	                            {
	                                $lte: [
	                                    {
	                                        $divide: ["$GD", "$GI"]
	                                    },
	                                    
	                                , 1]
	                            }
	                        ]
	                    },
	                    then: "AT" 
	                 },
	              ],
	              default: "PL"
	            }
	        }
	    }
	}
])
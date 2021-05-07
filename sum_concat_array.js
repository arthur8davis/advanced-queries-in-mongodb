db.projects.aggregate([
//     {
// 		"$match": {
// 			"_id": ObjectId("5f9ad4588683e45ae4677a3c"),
// 		},
// 	},
     {
         $facet:{
            executed:[
            	{
            		"$unwind": {"path":"$annualExecutions", "preserveNullAndEmptyArrays": true},
            	},
            	{
            		"$project": {"annualExecutions": 1},
            	},
            	{
            		"$match": {"annualExecutions.year": 2020},
            	},
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
                        "CDFis": {"$sum": "$months.CDFis"},
                        "MM": {$sum: "$MM"},
                        "PN": {$sum: "$PN"},
                        "DD": {$sum: "$DD"},
                    }
            	},
            	{
            	    $project: {
            	        "GD": {
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
            	{
            		"$unwind": "$annualSchedules",
            	},
            	{
            		"$project": {"annualSchedules": 1},
            	},
            	{
            		"$match": {"annualSchedules.year": 2020},
            	},
            	{
            	    "$project": {
                        "months": [ "$annualSchedules.before", "$annualSchedules.jan", "$annualSchedules.mar", "$annualSchedules.oct", "$annualSchedules.nov"],
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
                        "CD": {"$sum": "$months.CD"},
                        "MM": {$sum: "$MM"},
                        "PN": {$sum: "$PN"},
                        "DD": {$sum: "$DD"},
                    }
            	},
            	{
            	    $project: {
            	        "GD": {
            	            $add: [
              	                "$CD",
            	                "$MM",
            	                "$PN",
            	                "$DD",
            	           ]
            	        },
            	   }
            	}
            ]
         }
     },
     {$unwind: "$executed"},
     {$unwind: "$schedule"},
     {
		"$match": {
		    $expr: {
		        "$eq": ["$executed._id", "$schedule._id"],
		    }
		},
	},
     {
         $project:{
             _id: "$executed._id",
            "executed": "$executed.GD",
            "schedule": "$schedule.GD",
            "flag": {$multiply:["$schedule.GD", 0.85]},
         }
     },
     {
        $project: {
            "value": {
                $switch: {
                    branches: [
                        { case: {$gte: ["$executed","$flag"]}, then: "PL" },
                    ],
                    default: "AT"
                }
            }
        }
    }
])
db.projects.aggregate([
    {
			"$match": {
				"_id": ObjectId("5f9ae6658683e45ae4677cc3"),
			},
		},
		{
			"$unwind": "$annualExecutions",
		},
		{
			"$match": {"annualExecutions.year": 2018},
		},
		{
		    $project: {
		        "CDFin": { $add: ["$annualExecutions.before.CDFin", "$annualExecutions.jan.CDFin", "$annualExecutions.feb.CDFin", "$annualExecutions.mar.CDFin", "$annualExecutions.apr.CDFin", "$annualExecutions.may.CDFin", "$annualExecutions.jun.CDFin", "$annualExecutions.jul.CDFin", "$annualExecutions.aug.CDFin", "$annualExecutions.sep.CDFin", "$annualExecutions.oct.CDFin", "$annualExecutions.nov.CDFin", "$annualExecutions.dec.CDFin"]},
                "GG": { $add: ["$annualExecutions.before.GG", "$annualExecutions.jan.GG", "$annualExecutions.feb.GG", "$annualExecutions.mar.GG", "$annualExecutions.apr.GG", "$annualExecutions.may.GG", "$annualExecutions.jun.GG", "$annualExecutions.jul.GG", "$annualExecutions.aug.GG", "$annualExecutions.sep.GG", "$annualExecutions.oct.GG", "$annualExecutions.nov.GG", "$annualExecutions.dec.GG"]},
                "GS": { $add: ["$annualExecutions.before.GS", "$annualExecutions.jan.GS", "$annualExecutions.feb.GS", "$annualExecutions.mar.GS", "$annualExecutions.apr.GS", "$annualExecutions.may.GS", "$annualExecutions.jun.GS", "$annualExecutions.jul.GS", "$annualExecutions.aug.GS", "$annualExecutions.sep.GS", "$annualExecutions.oct.GS", "$annualExecutions.nov.GS", "$annualExecutions.dec.GS"]},
                "GE": { $add: ["$annualExecutions.before.GE", "$annualExecutions.jan.GE", "$annualExecutions.feb.GE", "$annualExecutions.mar.GE", "$annualExecutions.apr.GE", "$annualExecutions.may.GE", "$annualExecutions.jun.GE", "$annualExecutions.jul.GE", "$annualExecutions.aug.GE", "$annualExecutions.sep.GE", "$annualExecutions.oct.GE", "$annualExecutions.nov.GE", "$annualExecutions.dec.GE"]},
                "GET": { $add: ["$annualExecutions.before.GET", "$annualExecutions.jan.GET", "$annualExecutions.feb.GET", "$annualExecutions.mar.GET", "$annualExecutions.apr.GET", "$annualExecutions.may.GET", "$annualExecutions.jun.GET", "$annualExecutions.jul.GET", "$annualExecutions.aug.GET", "$annualExecutions.sep.GET", "$annualExecutions.oct.GET", "$annualExecutions.nov.GET", "$annualExecutions.dec.GET"]},
                "GLT": { $add: ["$annualExecutions.before.GLT", "$annualExecutions.jan.GLT", "$annualExecutions.feb.GLT", "$annualExecutions.mar.GLT", "$annualExecutions.apr.GLT", "$annualExecutions.may.GLT", "$annualExecutions.jun.GLT", "$annualExecutions.jul.GLT", "$annualExecutions.aug.GLT", "$annualExecutions.sep.GLT", "$annualExecutions.oct.GLT", "$annualExecutions.nov.GLT", "$annualExecutions.dec.GLT"]},
                "OG": { $add: ["$annualExecutions.before.OG", "$annualExecutions.jan.OG", "$annualExecutions.feb.OG", "$annualExecutions.mar.OG", "$annualExecutions.apr.OG", "$annualExecutions.may.OG", "$annualExecutions.jun.OG", "$annualExecutions.jul.OG", "$annualExecutions.aug.OG", "$annualExecutions.sep.OG", "$annualExecutions.oct.OG", "$annualExecutions.nov.OG", "$annualExecutions.dec.OG"]},
                "roundFin": { $add: ["$annualExecutions.before.roundFin", "$annualExecutions.jan.roundFin", "$annualExecutions.feb.roundFin", "$annualExecutions.mar.roundFin", "$annualExecutions.apr.roundFin", "$annualExecutions.may.roundFin", "$annualExecutions.jun.roundFin", "$annualExecutions.jul.roundFin", "$annualExecutions.aug.roundFin", "$annualExecutions.sep.roundFin", "$annualExecutions.oct.roundFin", "$annualExecutions.nov.roundFin", "$annualExecutions.dec.roundFin"]},
                "CDFis": { $add: [ "$annualExecutions.before.CDFis","$annualExecutions.jan.CDFis","$annualExecutions.feb.CDFis","$annualExecutions.mar.CDFis","$annualExecutions.apr.CDFis","$annualExecutions.may.CDFis","$annualExecutions.jun.CDFis","$annualExecutions.jul.CDFis","$annualExecutions.aug.CDFis","$annualExecutions.sep.CDFis","$annualExecutions.oct.CDFis","$annualExecutions.nov.CDFis","$annualExecutions.dec.CDFis"]},
                "MM": [
                    {
                        $unwind: {"path": "$annualExecutions.before.MM", "includeArrayIndex": "index"},
                    },
                    {
                        
                    }
                    ],
                "MMa": { $add: ["$annualExecutions.before.MM", "$annualExecutions.jan.MM", "$annualExecutions.feb.MM", "$annualExecutions.mar.MM", "$annualExecutions.apr.MM", "$annualExecutions.may.MM", "$annualExecutions.jun.MM", "$annualExecutions.jul.MM", "$annualExecutions.aug.MM", "$annualExecutions.sep.MM", "$annualExecutions.oct.MM", "$annualExecutions.nov.MM", "$annualExecutions.dec.MM"]},
                "PN": { $add: [{$sum: "$annualExecutions.before.PN"}, {$sum: "$annualExecutions.jan.PN"}, {$sum: "$annualExecutions.feb.PN"}, {$sum: "$annualExecutions.mar.PN"}, {$sum: "$annualExecutions.apr.PN"}, {$sum: "$annualExecutions.may.PN"}, {$sum: "$annualExecutions.jun.PN"}, {$sum: "$annualExecutions.jul.PN"}, {$sum: "$annualExecutions.aug.PN"}, {$sum: "$annualExecutions.sep.PN"}, {$sum: "$annualExecutions.oct.PN"}, {$sum: "$annualExecutions.nov.PN"}, {$sum: "$annualExecutions.dec.PN"}]},
                "DD": { $add: [{$sum: "$annualExecutions.before.DD"}, {$sum: "$annualExecutions.jan.DD"}, {$sum: "$annualExecutions.feb.DD"}, {$sum: "$annualExecutions.mar.DD"}, {$sum: "$annualExecutions.apr.DD"}, {$sum: "$annualExecutions.may.DD"}, {$sum: "$annualExecutions.jun.DD"}, {$sum: "$annualExecutions.jul.DD"}, {$sum: "$annualExecutions.aug.DD"}, {$sum: "$annualExecutions.sep.DD"}, {$sum: "$annualExecutions.oct.DD"}, {$sum: "$annualExecutions.nov.DD"}, {$sum: "$annualExecutions.dec.DD"}]},
                "roundFis": { $add: ["$annualExecutions.before.roundFis","$annualExecutions.jan.roundFis","$annualExecutions.feb.roundFis","$annualExecutions.mar.roundFis","$annualExecutions.apr.roundFis","$annualExecutions.may.roundFis","$annualExecutions.jun.roundFis","$annualExecutions.jul.roundFis","$annualExecutions.aug.roundFis","$annualExecutions.sep.roundFis","$annualExecutions.oct.roundFis","$annualExecutions.nov.roundFis","$annualExecutions.dec.roundFis"]},
		},
// 		{
                    // "$reduce": {
                    //     "input": "$annualExecutions.before.MM",
                    //     "initialValue": [],
                    //     "in": {
                    //         "$map": {
                    //             "input": {
                    //                 "$zip": {
                    //                     "inputs": ["$$this", "$$value"],
                    //                     "useLongestLength": true,
                    //                 }
                    //             },
                    //             "in": { "$sum": "$$this"}
                    //         }
                    //     }
                    // }
                },
    // {
    //     $match: {_id: ObjectId("5f9ae6658683e45ae4677cc3")}
    // },
    // {
    //     $unwind: "$annualExecutions"
    // },
    // {
    //     $match: {"annualExecutions.year": 2018}
    // },
    // {
    //     $project: {
    //         "annualExecutions":       "$annualExecutions",
    //     }
    // }
//     {
// 		$project: {
// 			"_id": 0,
// 			"CDE": {"$sum": "$extensionBudgets.CD"},
// 			"GGE": {"$sum": "$extensionBudgets.GG"},
// 			"GSE": {"$sum": "$extensionBudgets.GS"},
// 			"ETE": {"$sum": "$extensionBudgets.ET"},
// 			"GEE": {"$sum": "$extensionBudgets.GE"},
// 			"GLE": {"$sum": "$extensionBudgets.GL"},
// 			"OGE": {"$sum": "$extensionBudgets.OG"},
// 			"roundE": {"$sum": "$extensionBudgets.round"},
// 			"totalE": {"$sum": "$extensionBudgets.total"},
// 			"CDF": "$fileBudget.CD",
// 			"GGF": "$fileBudget.GG",
// 			"GSF": "$fileBudget.GS",
// 			"ETF": "$fileBudget.ET",
// 			"GEF": "$fileBudget.GE",
// 			"GLF": "$fileBudget.GL",
// 			"OGF": "$fileBudget.OG",
// 			"roundF": "$fileBudget.round",
// 			"totalF": "$fileBudget.total",
// 		},
// 	},
// 	{
// 		$project: {
// 			"CD": {"$sum": ["$CDE", "$CDF"]},
// 			"GG": {"$sum": ["$GGE", "$GGF"]},
// 			"GS": {"$sum": ["$GSE", "$GSF"]},
// 			"ET": {"$sum": ["$ETE", "$ETF"]},
// 			"GE": {"$sum": ["$GEE", "$GEF"]},
// 			"GL": {"$sum": ["$GLE", "$GLF"]},
// 			"OG": {"$sum": ["$OGE", "$OGF"]},
// 			"round": {"$sum": ["$roundE", "$roundF"]},
// 			"total": {"$sum": ["$totalE", "$totalF"]},
// 		},
// 	},
// }
])
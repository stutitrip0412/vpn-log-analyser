import LogEntry from "../models/logEntry.model.js";
import { calculateDistance } from "../utils/harversine.js";


export const getTrafficAnalytics = async () => {
  return await LogEntry.aggregate([
    {
      $match: {
        action: "CONNECT",
      },
    },

    {
      $group: {
        _id: {
          hour: {
            $hour: "$timestamp",
          },
        },

        connections: {
          $sum: 1,
        },
      },
    },

    {
      $sort: {
        "_id.hour": 1,
      },
    },
  ]);
};

export const getCountryAnalytics = async () => {
  return await LogEntry.aggregate([
    {
      $group: {
        _id: "$country",

        totalConnections: {
          $sum: 1,
        },
      },
    },

    {
      $sort: {
        totalConnections: -1,
      },
    },
  ]);
};



export const getImpossibleTravel = async () => {

    const logs = await LogEntry.find({

        action:"CONNECT",

        status:"SUCCESS"

    })
    .sort({

        username:1,

        timestamp:1

    });

    const alerts=[];

    const previousLogin={};

    const MAX_SPEED=900;

    for(const log of logs){

        if(!previousLogin[log.username]){

            previousLogin[log.username]=log;

            continue;
        }

        const previous=previousLogin[log.username];

        if(

            previous.latitude==null ||

            previous.longitude==null ||

            log.latitude==null ||

            log.longitude==null

        ){

            previousLogin[log.username]=log;

            continue;

        }

        const distance=

        calculateDistance(

            previous.latitude,

            previous.longitude,

            log.latitude,

            log.longitude

        );

        const hours=

        Math.abs(

            new Date(log.timestamp)-

            new Date(previous.timestamp)

        )/3600000;

        if(hours===0){

            previousLogin[log.username]=log;

            continue;

        }

        const speed=

        distance/hours;

        if(speed>MAX_SPEED){

            alerts.push({

                username:log.username,

                previousCountry:previous.country,

                currentCountry:log.country,

                previousIP:previous.sourceIp,

                currentIP:log.sourceIp,

                distanceKm:

                Number(distance.toFixed(2)),

                timeHours:

                Number(hours.toFixed(2)),

                requiredSpeed:

                Number(speed.toFixed(2)),

                severity:"CRITICAL"

            });

        }

        previousLogin[log.username]=log;

    }

    return alerts;

};

export const getBruteForceDetection = async () => {

    const FAILED_THRESHOLD = 20;

    const WINDOW_MINUTES = 5;

    const logs = await LogEntry.find({

        status: "FAILED"

    }).sort({

        sourceIp: 1,

        timestamp: 1

    });

    const alerts = [];

    const groupedLogs = {};

    // --------------------------
    // Group by Source IP
    // --------------------------

    for (const log of logs) {

        if (!groupedLogs[log.sourceIp]) {

            groupedLogs[log.sourceIp] = [];

        }

        groupedLogs[log.sourceIp].push(log);

    }

    // --------------------------
    // Sliding Window
    // --------------------------

    for (const ip in groupedLogs) {

        const entries = groupedLogs[ip];

        let start = 0;

        for (let end = 0; end < entries.length; end++) {

            while (

                new Date(entries[end].timestamp) -

                new Date(entries[start].timestamp)

                >

                WINDOW_MINUTES * 60000

            ) {

                start++;

            }

            const attempts = end - start + 1;

            if (attempts >= FAILED_THRESHOLD) {

                alerts.push({

                    sourceIp: ip,

                    attempts,

                    firstAttempt:
                        entries[start].timestamp,

                    lastAttempt:
                        entries[end].timestamp,

                    usernames:

                        [...new Set(

                            entries
                                .slice(start, end + 1)
                                .map(e => e.username)

                        )],

                    severity: "CRITICAL"

                });

                break;

            }

        }

    }

    return alerts;

};

export const getDashboardSummary = async () => {
    const [
        totalLogs,
        totalUsers,
        activeSessions,
        failedLogins,
        countries,
        impossibleTravel,
        simultaneousLogins,
        bruteForce
    ] = await Promise.all([

        // Total Logs
        LogEntry.countDocuments(),

        // Unique Users
        LogEntry.distinct("username"),

        // Active Sessions (CONNECT without DISCONNECT)
        LogEntry.countDocuments({
            action: "CONNECT",
            status: "SUCCESS"
        }),

        // Failed Logins
        LogEntry.countDocuments({
            status: "FAILED"
        }),

        // Unique Countries
        LogEntry.distinct("country"),

        // Existing Analytics
        getImpossibleTravel(),

        getSimultaneousLogins(),

        getBruteForceDetection()
    ]);

    return {

        totalLogs,

        totalUsers: totalUsers.length,

        activeSessions,

        failedLogins,

        countries: countries.length,

        impossibleTravel: impossibleTravel.length,

        simultaneousLogins: simultaneousLogins.length,

        bruteForceAttacks: bruteForce.length

    };
};
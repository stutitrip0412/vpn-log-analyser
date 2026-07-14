import * as analytics from "../services/analytics.service.js";

export const trafficAnalytics = async (req, res) => {
  const data = await analytics.getTrafficAnalytics();

  res.json(data);
};

export const countryAnalytics = async (req, res) => {
  const data = await analytics.getCountryAnalytics();

  res.json(data);
};


export const impossibleTravel = async (req, res) => {

    try{

        const alerts =
        await analytics.getImpossibleTravel();

        res.status(200).json({

            success:true,

            totalAlerts: alerts.length,

            alerts

        });

    }

    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

export const simultaneousLogins = async (
    req,
    res
) => {

    try {

        const alerts =
            await analytics.getSimultaneousLogins();

        res.status(200).json({

            success: true,

            totalAlerts: alerts.length,

            alerts

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

export const bruteForceDetection = async (
    req,
    res
) => {

    try {

        const alerts =
            await analytics.getBruteForceDetection();

        res.status(200).json({

            success: true,

            totalAlerts: alerts.length,

            alerts

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


export const dashboardSummary = async (req, res) => {

    try {

        const summary =
            await analytics.getDashboardSummary();

        res.status(200).json({

            success: true,

            dashboard: summary

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
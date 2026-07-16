import DashboardLayout from "../layouts/DashboardLayout";
import LiveMap from "../components/map/LiveMap";
import DashboardHero from "../components/dashboard/DashboardHero";
import DashboardStats from "../components/dashboard/DashboardStats";
import UploadCard from "../components/upload/UploadCard";
import ThreatPanel from "../components/upload/ThreatPanel";
import ConnectionChart from "../components/charts/ConnectionChart";
import CountryChart from "../components/charts/CountryChart";
import LoginStatusChart from "../components/charts/LoginStatusChart";


const Dashboard = () => {

    return (
             <DashboardLayout>

    <DashboardHero />

    <DashboardStats />

    <div className="grid lg:grid-cols-2 gap-8 mt-10">

        <UploadCard />

        <ThreatPanel />

        <div className="mt-8">

    <LiveMap />

</div>

<div className="grid xl:grid-cols-3 gap-8 mt-8">

    <div className="xl:col-span-2">

        <ConnectionChart />

    </div>

    <CountryChart />

</div>

<div className="grid lg:grid-cols-3 gap-8 mt-8">

    <div className="lg:col-span-2">

        {/* Recent Cases will come here */}

    </div>

    <LoginStatusChart />

</div>

    </div>

</DashboardLayout>

    );

};

export default Dashboard;
import React, { useState } from 'react';
import ModuleSection from '../components/ModuleSection';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Users, Package, Truck, Car, ClipboardCheck, Shield, FileText,
  Route, CheckCircle, MapPin, Hash, MousePointer, Navigation,
  AlertTriangle, FileBarChart, Settings, User, DollarSign
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { consoledata } = location.state || {};

  const masterIconCollection = consoledata.filter((rec: { entityType: string; }) => rec.entityType === 'master');
  const transIconCollection = consoledata.filter((rec: { entityType: string; }) => rec.entityType === 'transaction');

  const mappedBusiness = transIconCollection.map((item: { menuText: string; appJS: any; }) => ({
    icon: Users,
    title: item.menuText.replace(/<br\s*\/?>/gi, ' ').trim(),
    onClick: () => navigate('/journeyPlan')
  }));

  const mappedMasters = masterIconCollection.map((item: { menuText: string; appJS: any; }) => ({
    icon: Users,
    title: item.menuText.replace(/<br\s*\/?>/gi, ' ').trim(),
    onClick: () => navigate('/journeyPlan')
  }));

  // Pagination logic
  const PAGE_SIZE = 12;
  const [businessPage, setBusinessPage] = useState(0);
  const [mastersPage, setMastersPage] = useState(0);

  const paginatedBusiness = mappedBusiness.slice(businessPage * PAGE_SIZE, (businessPage + 1) * PAGE_SIZE);
  const paginatedMasters = mappedMasters.slice(mastersPage * PAGE_SIZE, (mastersPage + 1) * PAGE_SIZE);

  return (
    <main className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, Cuetransadmin!</h1>
        <p className="text-blue-100">Manage your transport operations efficiently with our comprehensive system.</p>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ModuleSection
          title="Business Processes"
          modules={paginatedBusiness}
          className="xl:col-span-1"
          showPagination={mappedBusiness.length > PAGE_SIZE}
          totalPages={Math.ceil(mappedBusiness.length / PAGE_SIZE)}
          currentPage={businessPage}
          onPageChange={setBusinessPage}
        />

        <ModuleSection
          title="Masters"
          modules={paginatedMasters}
          className="xl:col-span-1"
          showPagination={mappedMasters.length > PAGE_SIZE}
          totalPages={Math.ceil(mappedMasters.length / PAGE_SIZE)}
          currentPage={mastersPage}
          onPageChange={setMastersPage}
        />
      </div>
    </main>
  );
};

export default Dashboard;

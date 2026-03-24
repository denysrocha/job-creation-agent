import { NavLink } from 'react-router';
import { Home, FileText, LayoutDashboard, Plus, BarChart2, MessageSquare, ListChecks, Users } from 'lucide-react';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  exact?: boolean;
}

function NavItem({ to, icon, label, exact }: NavItemProps) {
  return (
    <NavLink
      to={to}
      end={exact}
      title={label}
      className={({ isActive }) =>
        `w-10 h-10 flex items-center justify-center rounded transition-colors relative group ${
          isActive
            ? 'bg-white/20 text-white'
            : 'text-white/60 hover:bg-white/10 hover:text-white'
        }`
      }
    >
      {icon}
      {/* Tooltip */}
      <span className="absolute left-full ml-3 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
        {label}
      </span>
    </NavLink>
  );
}

export function Sidebar() {
  return (
    <div className="w-16 bg-[#1a1a1a] flex flex-col items-center py-4 gap-2 shrink-0">
      {/* Hamburger / Logo */}
      <button
        title="Menu"
        className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded mb-2"
      >
        <div className="flex flex-col gap-1">
          <div className="w-5 h-0.5 bg-white"></div>
          <div className="w-5 h-0.5 bg-white"></div>
          <div className="w-5 h-0.5 bg-white"></div>
        </div>
      </button>

      {/* Navigation items */}
      <div className="flex-1 flex flex-col gap-1 items-center">
        <NavItem
          to="/"
          exact
          icon={<Plus className="w-5 h-5" />}
          label="Criar vaga"
        />

        <NavItem
          to="/requisitions"
          icon={<ListChecks className="w-5 h-5" />}
          label="Requisições"
        />

        <NavItem
          to="/jobs"
          icon={<FileText className="w-5 h-5" />}
          label="Vagas"
        />

        <NavItem
          to="/candidates"
          icon={<Users className="w-5 h-5" />}
          label="Candidatos"
        />

        <NavItem
          to="/home"
          icon={<Home className="w-5 h-5" />}
          label="Início"
        />

        <NavItem
          to="/reports"
          icon={<BarChart2 className="w-5 h-5" />}
          label="Relatórios"
        />

        <NavItem
          to="/messages"
          icon={<MessageSquare className="w-5 h-5" />}
          label="Mensagens"
        />

        <NavItem
          to="/dashboard"
          icon={<LayoutDashboard className="w-5 h-5" />}
          label="Dashboard"
        />
      </div>

      {/* Bottom section */}
      <div className="flex flex-col gap-1 items-center">
        <button
          title="Configurações"
          className="w-10 h-10 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white rounded transition-colors"
        >
          <Users className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
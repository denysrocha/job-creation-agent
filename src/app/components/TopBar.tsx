import { Button } from "./ui/button";
import { Bell } from "lucide-react";

export function TopBar() {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <h1 className="text-lg text-gray-800">Criando uma vaga nova</h1>
      
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          className="border-gray-300 text-gray-700 hover:bg-gray-50"
          data-tour="traditional-mode-button"
        >
          Modo tradicional
        </Button>
        
        <div className="relative">
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-purple-600 text-white">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-purple-800 rounded-full text-[10px] flex items-center justify-center text-white">1</span>
          </button>
        </div>
        
        <div className="w-10 h-10 rounded-full bg-orange-400 flex items-center justify-center overflow-hidden">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="9" r="3" fill="white"/>
            <path d="M17 21C17 17.134 14.866 14 12 14C9.13401 14 7 17.134 7 21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
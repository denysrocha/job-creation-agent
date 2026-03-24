import { motion } from 'motion/react';
import { X } from 'lucide-react';

interface RightFormPanelProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function RightFormPanel({ title, onClose, children }: RightFormPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: 400 }}
      exit={{ opacity: 0, width: 0 }}
      transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
      className="bg-white border-l border-gray-200 flex flex-col overflow-hidden h-full flex-shrink-0"
      style={{ minWidth: 0 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 flex-shrink-0">
        <h2 className="text-sm text-gray-800" style={{ fontWeight: 600 }}>
          {title}
        </h2>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-md flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {children}
      </div>
    </motion.div>
  );
}

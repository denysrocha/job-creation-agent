import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { JobData } from "../types/job";

interface DebugPanelProps {
  jobData: JobData;
  missingFields: string[];
}

export function DebugPanel({ jobData, missingFields }: DebugPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 left-4 z-50 w-12 h-12 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 flex items-center justify-center font-mono text-sm"
      >
        🐛
      </button>

      {/* Painel de debug */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="fixed left-16 bottom-4 z-50 w-96 bg-black text-green-400 rounded-lg shadow-2xl p-4 font-mono text-xs max-h-[80vh] overflow-y-auto"
          >
            <h3 className="text-white text-sm font-bold mb-3 border-b border-green-800 pb-2">
              🐛 Debug Panel
            </h3>

            <div className="space-y-4">
              {/* Missing Fields */}
              <div>
                <h4 className="text-yellow-400 font-bold mb-1">Missing Fields ({missingFields.length}):</h4>
                <div className="bg-gray-900 p-2 rounded">
                  {missingFields.length === 0 ? (
                    <span className="text-green-500">✓ Nenhum campo faltando</span>
                  ) : (
                    <ul className="list-disc list-inside">
                      {missingFields.map(field => (
                        <li key={field} className="text-red-400">{field}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Job Data */}
              <div>
                <h4 className="text-yellow-400 font-bold mb-1">Job Data:</h4>
                <div className="bg-gray-900 p-2 rounded overflow-x-auto">
                  <pre className="whitespace-pre-wrap break-words">
                    {JSON.stringify(jobData, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

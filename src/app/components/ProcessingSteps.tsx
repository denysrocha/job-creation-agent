import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DataSourceBadge } from "./DataSourceBadge";
import { DataSource } from "../types/job";

interface ProcessingStepsProps {
  onComplete?: () => void;
  title?: string;
  duration?: number; // ms per step; defaults to 5000
  onStepChange?: (step: string) => void;
  customSteps?: string[];
}

const steps = [
  "Lendo descrição da vaga",
  "Extraindo título",
  "Extraindo informações básicas da vaga",
  "Extraindo descrição",
  "Observando vagas semelhantes",
  "Sugerindo faixa salarial",
  "Sugerindo etapas",
  "Sugerindo divulgação",
  "Sugerindo email de inscrição",
  "Criando formulário personalizado",
  "Criando critérios de análise de currículo",
  "Configurando o agente na triagem",
  "Sugerindo automações de reprovação",
];

function AnimatedDots() {
  return (
    <span className="inline-flex gap-[2px] ml-[2px]">
      <motion.span
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
      >
        .
      </motion.span>
      <motion.span
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
      >
        .
      </motion.span>
      <motion.span
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
      >
        .
      </motion.span>
    </span>
  );
}

export function ProcessingSteps({ 
  onComplete,
  title = "Analisando a descrição da vaga...",
  duration,
  onStepChange,
  customSteps,
}: ProcessingStepsProps) {
  const resolvedDuration = duration ?? 5000;
  const [currentStep, setCurrentStep] = useState(0);
  const activeSteps = customSteps && customSteps.length > 0 ? customSteps : steps;
  const onCompleteRef = useRef(onComplete);
  const onStepChangeRef = useRef(onStepChange);
  const hasCompletedRef = useRef(false);
  // Track current step in a ref to avoid stale closures and avoid calling
  // parent setState inside a child setState updater (which causes the warning).
  const currentStepRef = useRef(0);

  // Keep refs up-to-date without causing effect re-runs
  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);
  useEffect(() => { onStepChangeRef.current = onStepChange; }, [onStepChange]);

  useEffect(() => {
    // Notifica sobre o step inicial
    if (onStepChangeRef.current && currentStep < activeSteps.length) {
      onStepChangeRef.current(activeSteps[currentStep]);
    }
  }, [currentStep, activeSteps]);

  useEffect(() => {
    hasCompletedRef.current = false;
    currentStepRef.current = 0;
    setCurrentStep(0);

    const interval = setInterval(() => {
      const nextStep = currentStepRef.current + 1;

      // Se chegou na última etapa, chama onComplete UMA ÚNICA VEZ
      if (nextStep >= activeSteps.length) {
        clearInterval(interval);
        if (!hasCompletedRef.current) {
          hasCompletedRef.current = true;
          setTimeout(() => {
            onCompleteRef.current?.();
          }, resolvedDuration);
        }
        return;
      }

      // Atualiza o ref e o state separadamente — nunca chama setState do pai
      // dentro de um updater function, para evitar o warning do React.
      currentStepRef.current = nextStep;
      setCurrentStep(nextStep);

      // Notifica sobre o próximo step (fora do updater!)
      if (onStepChangeRef.current) {
        onStepChangeRef.current(activeSteps[nextStep]);
      }
    }, resolvedDuration);

    return () => clearInterval(interval);
  }, [resolvedDuration, activeSteps]);

  return (
    <div className="p-[0px]">
      {/* Título que esmaeçe */}
      <motion.div
        className="text-gray-900 mb-1"
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {title}
      </motion.div>
      
      {/* Texto de apoio com pontinhos */}
      <AnimatePresence mode="wait">
        {currentStep < activeSteps.length && (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-gray-500 text-sm"
          >
            {activeSteps[currentStep]}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ProcessingSummaryProps {
  steps: string[];
  isExpanded: boolean;
  onToggle: () => void;
}

export function ProcessingSummary({ steps, isExpanded, onToggle }: ProcessingSummaryProps) {
  return (
    <div className="mt-2">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 text-gray-900 hover:text-gray-700 transition-colors group"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="text-green-600 flex-shrink-0"
        >
          <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M6 10L9 13L14 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>
          Processamento concluído ({steps.length} etapas)
        </span>
        
        <motion.svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="text-gray-400 group-hover:text-gray-600"
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-visible"
          >
            <div className="mt-3 ml-7 space-y-2 overflow-visible">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="text-green-500 flex-shrink-0"
                  >
                    <path
                      d="M2 6L5 9L10 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{step}</span>
                  {(step.startsWith('Sugerindo') || step.startsWith('Criando') || step.startsWith('Configurando')) && (
                    <DataSourceBadge source="inferred" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
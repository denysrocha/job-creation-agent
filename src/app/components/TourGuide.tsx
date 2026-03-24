import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

interface TourStep {
  id: string;
  title: string;
  description: string;
  target?: string;
  position?: 'center' | 'left' | 'right' | 'top' | 'bottom';
  spotlight?: boolean;
}

interface TourGuideProps {
  onComplete: () => void;
}

const steps: TourStep[] = [
  {
    id: 'welcome',
    title: 'Bem-vindo à nova criação de vagas!',
    description: 'Apresentamos o **Agente InHire** para a criação de vagas. Use conversa natural e deixe que ele crie tudo para você. 🚀',
    position: 'center',
    spotlight: false,
  },
  {
    id: 'chat',
    title: 'Converse com o Agente',
    description: 'Aqui no **chat**, você conversa com o Agente InHire. Ele extrai automaticamente todas as informações necessárias!',
    target: 'chat-area',
    position: 'right',
    spotlight: true,
  },
  {
    id: 'info-panel',
    title: 'Acompanhe o progresso',
    description: 'Neste painel você visualiza em **tempo real** todas as informações coletadas.',
    target: 'info-panel',
    position: 'left',
    spotlight: true,
  },
  {
    id: 'traditional-mode',
    title: '🔄 Prefere o modo tradicional?',
    description: 'Sem problemas! A qualquer momento você pode clicar neste botão **"Modo tradicional"** para voltar ao formulário clássico de criação de vagas. Você pode escolher a experiência que preferir!',
    target: 'traditional-mode-button',
    position: 'bottom',
    spotlight: true,
  },
];

export function TourGuide({ onComplete }: TourGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    // Cleanup: if this component unmounts (e.g. route change) before the timer fires,
    // clear it — preventing any deferred state update on an unmounted component.
    return () => clearTimeout(timer);
  }, []);

  // Safety cleanup: hide overlay immediately on unmount so no fixed elements linger.
  useEffect(() => {
    return () => {
      setIsVisible(false);
    };
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    setTimeout(() => {
      localStorage.setItem('inhire-tour-completed', 'true');
      onComplete();
    }, 300);
  };

  const currentStepData = steps[currentStep];

  const getSpotlightPosition = () => {
    if (!currentStepData.target) return null;

    const element = document.querySelector(`[data-tour="${currentStepData.target}"]`);
    if (!element) return null;

    const rect = element.getBoundingClientRect();
    return {
      top: rect.top - 8,
      left: rect.left - 8,
      width: rect.width + 16,
      height: rect.height + 16,
    };
  };

  const getTooltipPosition = () => {
    // Se for central, retorna posição centralizada com valores absolutos
    if (currentStepData.position === 'center') {
      const TOOLTIP_WIDTH = 380;
      const TOOLTIP_HEIGHT_ESTIMATE = 260;
      return {
        top: `${Math.max(16, (window.innerHeight - TOOLTIP_HEIGHT_ESTIMATE) / 2)}px`,
        left: `${Math.max(16, (window.innerWidth - TOOLTIP_WIDTH) / 2)}px`,
        transform: 'none',
      };
    }

    const element = document.querySelector(`[data-tour="${currentStepData.target}"]`);
    if (!element) {
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      };
    }

    const rect = element.getBoundingClientRect();
    const TOOLTIP_WIDTH = 380;
    const TOOLTIP_HEIGHT_ESTIMATE = 260;
    const GAP = 16;
    const PADDING = 16;

    // Calculate ideal top-left corner of tooltip based on position preference
    let idealTop = 0;
    let idealLeft = 0;

    switch (currentStepData.position) {
      case 'right':
        idealLeft = rect.right + GAP;
        idealTop = rect.top + rect.height / 2 - TOOLTIP_HEIGHT_ESTIMATE / 2;
        break;

      case 'left':
        idealLeft = rect.left - GAP - TOOLTIP_WIDTH;
        idealTop = rect.top + rect.height / 2 - TOOLTIP_HEIGHT_ESTIMATE / 2;
        break;

      case 'top':
        idealLeft = rect.left + rect.width / 2 - TOOLTIP_WIDTH / 2;
        idealTop = rect.top - GAP - TOOLTIP_HEIGHT_ESTIMATE;
        break;

      case 'bottom': {
        idealLeft = rect.left + rect.width / 2 - TOOLTIP_WIDTH / 2;
        idealTop = rect.bottom + GAP;

        // If no space below, try above
        if (idealTop + TOOLTIP_HEIGHT_ESTIMATE > window.innerHeight - PADDING) {
          idealTop = rect.top - GAP - TOOLTIP_HEIGHT_ESTIMATE;
        }
        // If no space above either, try left of element
        if (idealTop < PADDING) {
          idealLeft = rect.left - GAP - TOOLTIP_WIDTH;
          idealTop = rect.top + rect.height / 2 - TOOLTIP_HEIGHT_ESTIMATE / 2;
        }
        // If no space to the left, try right
        if (idealLeft < PADDING) {
          idealLeft = rect.right + GAP;
          idealTop = rect.top + rect.height / 2 - TOOLTIP_HEIGHT_ESTIMATE / 2;
        }
        break;
      }

      default:
        idealLeft = window.innerWidth / 2 - TOOLTIP_WIDTH / 2;
        idealTop = window.innerHeight / 2 - TOOLTIP_HEIGHT_ESTIMATE / 2;
    }

    // Clamp within viewport to guarantee full visibility
    const clampedLeft = Math.max(PADDING, Math.min(idealLeft, window.innerWidth - TOOLTIP_WIDTH - PADDING));
    const clampedTop = Math.max(PADDING, Math.min(idealTop, window.innerHeight - TOOLTIP_HEIGHT_ESTIMATE - PADDING));

    return {
      top: `${clampedTop}px`,
      left: `${clampedLeft}px`,
      transform: 'none',
    };
  };

  const spotlightPos = getSpotlightPosition();
  const tooltipPos = getTooltipPosition();

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay/Spotlight */}
          {currentStepData.spotlight && spotlightPos ? (
            <motion.div
              key={`spotlight-${currentStep}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed pointer-events-none"
              style={{
                top: spotlightPos.top,
                left: spotlightPos.left,
                width: spotlightPos.width,
                height: spotlightPos.height,
                boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.6), 0 0 20px 4px rgba(168, 85, 247, 0.4)',
                borderRadius: '12px',
                zIndex: 9999,
              }}
            />
          ) : (
            <motion.div
              key={`overlay-${currentStep}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 pointer-events-none"
              style={{ zIndex: 9998 }}
            />
          )}

          {/* Tooltip */}
          <motion.div
            key={`tooltip-${currentStep}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bg-white rounded-xl shadow-2xl w-[380px] max-w-[calc(100vw-40px)] max-h-[calc(100vh-32px)] overflow-y-auto"
            style={{
              ...tooltipPos,
              zIndex: 10000,
            }}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  {currentStep === 0 && <Sparkles className="w-5 h-5 text-purple-600" />}
                  <h3 className="text-lg font-semibold text-gray-900">
                    {currentStepData.title}
                  </h3>
                </div>
                <button
                  onClick={handleComplete}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {currentStepData.description.split('**').map((part, index) => 
                  index % 2 === 1 ? <strong key={index} className="text-gray-900">{part}</strong> : part
                )}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                {/* Progress dots */}
                <div className="flex gap-1.5">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all ${
                        index === currentStep 
                          ? 'w-8 bg-purple-600' 
                          : 'w-2 bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex gap-2">
                  {currentStep === 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleComplete}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Pular tour
                    </Button>
                  )}
                  
                  {currentStep > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePrevious}
                      className="gap-1"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Anterior
                    </Button>
                  )}
                  
                  <Button
                    size="sm"
                    onClick={handleNext}
                    className="bg-purple-600 hover:bg-purple-700 text-white gap-1"
                  >
                    {currentStep === steps.length - 1 ? (
                      'Começar'
                    ) : (
                      <>
                        Próximo
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
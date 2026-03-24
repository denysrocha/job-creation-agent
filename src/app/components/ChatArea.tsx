import { ChatMessage as ChatMessageType } from "../types/job";
import { ChatMessage } from "./ChatMessage";
import { Textarea } from "./ui/textarea";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mic, Send, Square, X } from "lucide-react";
import { RobotPresence, RobotState } from "./RobotPresence";

interface ChatAreaProps {
  messages: ChatMessageType[];
  onOptionClick?: (value: string) => void;
  onSendMessage?: (message: string) => void;
  onSendAudio?: (duration: string) => void;
  isTyping?: boolean;
  inputPlaceholder?: string;
  isDraftView?: boolean;
  onToggleProcessing?: (messageId: string) => void;
  onStepChange?: (step: string) => void;
  robotState?: RobotState;
  onOpenRecursos?: () => void;
}

// Static waveform bars for preview UI
const WAVEFORM_BARS = [3,7,13,20,28,34,24,18,30,40,34,22,14,8,20,32,40,26,14,10,22,34,38,28,18,24,36,30,18,12,8,14,24,34,26,20,14,10,6,4];

function WaveformBars({ color = 'rgba(255,255,255,0.75)', height = 28 }: { color?: string; height?: number }) {
  return (
    <div className="flex items-center gap-[2px]" style={{ height }}>
      {WAVEFORM_BARS.map((h, i) => (
        <div
          key={i}
          style={{
            width: 2,
            height: `${(h / 42) * height}px`,
            backgroundColor: color,
            borderRadius: 1,
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
}

function RecordingWaveform() {
  return (
    <div className="flex items-center gap-[3px]" style={{ height: 24 }}>
      {WAVEFORM_BARS.slice(0, 24).map((_, i) => (
        <motion.div
          key={i}
          style={{ width: 2, borderRadius: 1, backgroundColor: '#dc2626', flexShrink: 0 }}
          animate={{ height: [`${4 + (i % 5) * 4}px`, `${10 + (i % 7) * 4}px`, `${4 + (i % 5) * 4}px`] }}
          transition={{ duration: 0.6 + (i % 4) * 0.15, repeat: Infinity, ease: 'easeInOut', delay: i * 0.04 }}
        />
      ))}
    </div>
  );
}

export function ChatArea({
  messages, onOptionClick, onSendMessage, onSendAudio, isTyping,
  inputPlaceholder, isDraftView, onToggleProcessing, onStepChange,
  robotState, onOpenRecursos,
}: ChatAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");

  // Audio recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [audioPreview, setAudioPreview] = useState<{ duration: string } | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const recordingSecondsRef = useRef(0);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      recordingSecondsRef.current = 0;
      setRecordingSeconds(0);

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        setAudioPreview({ duration: formatDuration(recordingSecondsRef.current) });
        stream.getTracks().forEach(t => t.stop());
        if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
      };

      mediaRecorder.start();
      setIsRecording(true);

      recordingTimerRef.current = setInterval(() => {
        recordingSecondsRef.current++;
        setRecordingSeconds(recordingSecondsRef.current);
      }, 1000);
    } catch {
      // Mic not available — simulate recording for prototype
      recordingSecondsRef.current = 0;
      setRecordingSeconds(0);
      setIsRecording(true);

      recordingTimerRef.current = setInterval(() => {
        recordingSecondsRef.current++;
        setRecordingSeconds(recordingSecondsRef.current);
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    } else {
      // Simulated recording
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
      setAudioPreview({ duration: formatDuration(recordingSecondsRef.current || 8) });
    }
    setIsRecording(false);
  };

  const cancelAudio = () => setAudioPreview(null);

  const sendAudio = () => {
    if (audioPreview && onSendAudio) {
      onSendAudio(audioPreview.duration);
      setAudioPreview(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const value = inputValue.trim();
      if (value && onSendMessage) {
        onSendMessage(value);
        setInputValue('');
      }
    }
  };

  const handleSend = () => {
    const value = inputValue.trim();
    if (value && onSendMessage) {
      onSendMessage(value);
      setInputValue('');
    }
  };

  const hasText = inputValue.trim().length > 0;

  // Is any message currently in processing state?
  const hasActiveProcessing = messages.some(m => (m as any).isProcessing);

  return (
    <motion.div
      initial={false}
      animate={{
        width: isDraftView ? '30%' : 'auto',
        flex: isDraftView ? '0 0 30%' : '1 1 0%',
      }}
      transition={{ duration: 0.4, delay: isDraftView ? 0.3 : 0 }}
      className={`flex flex-col bg-white ${isDraftView ? 'border-r border-gray-200' : ''}`}
      data-tour="chat-area"
    >
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto overflow-x-visible">
        <div className={`mx-auto px-6 py-8 min-h-full flex flex-col ${isDraftView ? 'max-w-none' : 'max-w-4xl'} overflow-visible`}>
          {messages.map((message, index) => (
            <div key={message.id} ref={index === messages.length - 1 ? lastMessageRef : null}>
              <ChatMessage
                message={message}
                onOptionClick={onOptionClick}
                onToggleProcessing={onToggleProcessing}
                onStepChange={onStepChange}
                showRobot={!!(message as any).isProcessing}
                robotState={robotState}
                onOpenRecursos={onOpenRecursos}
              />
            </div>
          ))}

          {/* Typing indicator with robot inline — only when not already processing */}
          {isTyping && !hasActiveProcessing && (
            <div className="flex items-center gap-3 mb-6 mt-2">
              <RobotPresence state="typing" size={40} />
            </div>
          )}

          {/* Idle robot — shown only when no typing and no active processing */}
          {!isTyping && !hasActiveProcessing && (
            <div className="mt-2 mb-4">
              <RobotPresence
                state={robotState || 'idle'}
                size={40}
              />
            </div>
          )}
        </div>
      </div>

      {/* Input area */}
      <div className="p-4 bg-white">
        <div className={`mx-auto ${isDraftView ? 'max-w-none' : 'max-w-4xl'}`}>

          {/* ── Audio preview ── */}
          <AnimatePresence>
            {audioPreview && !isRecording && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="mb-3 flex items-center gap-3 bg-gray-900 text-white rounded-2xl px-4 py-3"
              >
                {/* Waveform */}
                <div className="flex-1">
                  <WaveformBars />
                </div>
                <span className="text-xs text-white/60 tabular-nums flex-shrink-0">{audioPreview.duration}</span>

                {/* Cancel */}
                <button
                  onClick={cancelAudio}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors flex-shrink-0"
                  title="Cancelar"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Send audio */}
                <button
                  onClick={sendAudio}
                  className="w-8 h-8 rounded-full bg-purple-500 hover:bg-purple-400 flex items-center justify-center transition-colors flex-shrink-0"
                  title="Enviar áudio"
                >
                  <Send className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Recording indicator ── */}
          <AnimatePresence>
            {isRecording && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="mb-3 flex items-center gap-3 bg-red-50 border border-red-200 rounded-2xl px-4 py-3"
              >
                <motion.div
                  className="w-3 h-3 rounded-full bg-red-500 flex-shrink-0"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <div className="flex-1">
                  <RecordingWaveform />
                </div>
                <span className="text-sm text-red-600 tabular-nums flex-shrink-0">
                  {formatDuration(recordingSeconds)}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Textarea + button row ── */}
          {!audioPreview && (
            <div className="flex items-end gap-3">
              <Textarea
                placeholder={inputPlaceholder || "Descreva a vaga ou responda às perguntas..."}
                className="flex-1 min-h-[52px] max-h-[200px] resize-none px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                onKeyDown={handleKeyDown}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isRecording}
              />

              {/* Dynamic button: mic (empty) ↔ send (has text) ↔ stop (recording) */}
              <button
                className={`p-3 rounded-lg transition-colors flex-shrink-0 mb-1 ${
                  isRecording
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : hasText
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
                onClick={() => {
                  if (isRecording) {
                    stopRecording();
                  } else if (hasText) {
                    handleSend();
                  } else {
                    startRecording();
                  }
                }}
                title={isRecording ? 'Parar gravação' : hasText ? 'Enviar' : 'Gravar áudio'}
              >
                {isRecording ? (
                  <Square className="w-4 h-4" fill="currentColor" />
                ) : hasText ? (
                  <Send className="w-4 h-4" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
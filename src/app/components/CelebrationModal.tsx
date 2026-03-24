import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import Robot1 from "../../imports/Robot";
import RobotEmotions1 from "../../imports/RobotEmotions";

// ── Confetti ──────────────────────────────────────────────────────────────────

const CONFETTI_COLORS = [
  '#8b5cf6', '#ec4899', '#f59e0b', '#10b981',
  '#a78bfa', '#f472b6', '#fbbf24', '#34d399',
];
const CONFETTI_SHAPES = ['■', '●', '▲', '✦', '★', '◆'];
const CONFETTI_COUNT = 60;

interface ConfettiPieceData {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  shape: string;
  color: string;
  drift: number;
  rotation: number;
  repeatDelay: number;
}

function generateConfetti(count: number): ConfettiPieceData[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 1.4,
    duration: 2.6 + Math.random() * 2,
    size: 11 + Math.random() * 15,
    shape: CONFETTI_SHAPES[Math.floor(Math.random() * CONFETTI_SHAPES.length)],
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    drift: (Math.random() - 0.5) * 130,
    rotation: 100 + Math.random() * 340,
    repeatDelay: Math.random() * 0.8,
  }));
}

function ConfettiFall({ pieces }: { pieces: ConfettiPieceData[] }) {
  return (
    <>
      {pieces.map(piece => (
        <motion.div
          key={piece.id}
          className="absolute pointer-events-none select-none"
          style={{
            left: `${piece.x}%`,
            top: 0,
            color: piece.color,
            fontSize: piece.size,
            lineHeight: 1,
            zIndex: 1,
          }}
          initial={{ y: -32, x: 0, rotate: 0, opacity: 1 }}
          animate={{
            y: 650,
            x: piece.drift,
            rotate: piece.rotation,
            opacity: [1, 1, 1, 0],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: 'linear',
            opacity: { times: [0, 0.65, 0.85, 1] },
            repeat: Infinity,
            repeatDelay: piece.repeatDelay,
          }}
        >
          {piece.shape}
        </motion.div>
      ))}
    </>
  );
}

// ── Hand SVG ──────────────────────────────────────────────────────────────────

function RobotHand() {
  // Palette
  const fill = '#E4DAF5';       // light lavender body
  const joint = '#C4B5E5';      // darker lavender for joint rings
  const stroke = '#9B87C8';     // purple stroke
  const highlight = 'rgba(255,255,255,0.28)';

  return (
    <svg width="60" height="80" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* ──────── INDEX FINGER (left) ──────── */}
      {/* Fingertip — pill shape */}
      <rect x="5" y="10" width="13" height="15" rx="6.5" fill={fill} stroke={stroke} strokeWidth="1.4"/>
      {/* Highlight on tip */}
      <ellipse cx="10" cy="14" rx="3.5" ry="4" fill={highlight}/>
      {/* Joint ring 1 */}
      <rect x="4" y="24" width="15" height="5" rx="2.5" fill={joint} stroke={stroke} strokeWidth="1.4"/>
      {/* Mid phalanx */}
      <rect x="5" y="28" width="13" height="13" rx="2.5" fill={fill} stroke={stroke} strokeWidth="1.4"/>
      {/* Joint ring 2 */}
      <rect x="4" y="40" width="15" height="5" rx="2.5" fill={joint} stroke={stroke} strokeWidth="1.4"/>
      {/* Base phalanx */}
      <rect x="5" y="44" width="13" height="10" rx="2.5" fill={fill} stroke={stroke} strokeWidth="1.4"/>

      {/* ──────── MIDDLE FINGER (center, tallest) ──────── */}
      <rect x="22" y="3" width="15" height="17" rx="7.5" fill={fill} stroke={stroke} strokeWidth="1.4"/>
      <ellipse cx="28.5" cy="7.5" rx="4" ry="4.5" fill={highlight}/>
      <rect x="21" y="19" width="17" height="5" rx="2.5" fill={joint} stroke={stroke} strokeWidth="1.4"/>
      <rect x="22" y="23" width="15" height="15" rx="2.5" fill={fill} stroke={stroke} strokeWidth="1.4"/>
      <rect x="21" y="37" width="17" height="5" rx="2.5" fill={joint} stroke={stroke} strokeWidth="1.4"/>
      <rect x="22" y="41" width="15" height="13" rx="2.5" fill={fill} stroke={stroke} strokeWidth="1.4"/>

      {/* ──────── RING FINGER (right) ──────── */}
      <rect x="41" y="10" width="13" height="15" rx="6.5" fill={fill} stroke={stroke} strokeWidth="1.4"/>
      <ellipse cx="47" cy="14" rx="3.5" ry="4" fill={highlight}/>
      <rect x="40" y="24" width="15" height="5" rx="2.5" fill={joint} stroke={stroke} strokeWidth="1.4"/>
      <rect x="41" y="28" width="13" height="13" rx="2.5" fill={fill} stroke={stroke} strokeWidth="1.4"/>
      <rect x="40" y="40" width="15" height="5" rx="2.5" fill={joint} stroke={stroke} strokeWidth="1.4"/>
      <rect x="41" y="44" width="13" height="10" rx="2.5" fill={fill} stroke={stroke} strokeWidth="1.4"/>

      {/* ──────── PALM ──────── */}
      <rect x="2" y="52" width="56" height="26" rx="13" fill={fill} stroke={stroke} strokeWidth="1.4"/>
      {/* Palm top highlight strip */}
      <rect x="8" y="53.5" width="44" height="5" rx="2.5" fill={highlight}/>
      {/* Knuckle line */}
      <line x1="7" y1="66" x2="52" y2="66" stroke={stroke} strokeWidth="0.8" strokeDasharray="5 4" opacity="0.25"/>
      {/* Knuckle dots */}
      <circle cx="12" cy="57.5" r="2.5" fill={stroke} opacity="0.35"/>
      <circle cx="29.5" cy="57.5" r="2.5" fill={stroke} opacity="0.35"/>
      <circle cx="47" cy="57.5" r="2.5" fill={stroke} opacity="0.35"/>

      {/* ──────── THUMB (left side, angled) ──────── */}
      {/* Thumb body */}
      <path
        d="M6 62 Q0 60 0 53 Q0 46 4 44 Q8 43 10 47 L10 62 Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {/* Thumb knuckle line */}
      <path d="M1 54 Q5 53 10 54" stroke={stroke} strokeWidth="0.9" strokeLinecap="round" opacity="0.4"/>
      {/* Thumb highlight */}
      <ellipse cx="4.5" cy="48" rx="2" ry="3.5" fill={highlight} transform="rotate(-8 4.5 48)"/>
    </svg>
  );
}

// ── Main Modal ────────────────────────────────────────────────────────────────

interface CelebrationModalProps {
  onComplete: () => void;
}

export function CelebrationModal({ onComplete }: CelebrationModalProps) {
  const [tapped, setTapped] = useState(false);
  const confettiPieces = useMemo(() => generateConfetti(CONFETTI_COUNT), []);

  const handleRobotTap = () => {
    if (tapped) return;
    setTapped(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.57)' }}
    >
      <motion.div
        initial={{ scale: 0.82, opacity: 0, y: 28 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 16 }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        className="relative bg-white flex flex-col items-center overflow-hidden"
        style={{
          width: 390,
          maxWidth: '92vw',
          padding: '52px 36px 44px',
          borderRadius: 24,
        }}
      >
        {/* Confetti layer */}
        <AnimatePresence>
          {tapped && (
            <motion.div
              key="confetti"
              className="absolute inset-0 overflow-hidden pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ zIndex: 1 }}
            >
              <ConfettiFall pieces={confettiPieces} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Robot container — clickable */}
        <button
          onClick={handleRobotTap}
          disabled={tapped}
          className="relative focus:outline-none mb-7"
          style={{ cursor: tapped ? 'default' : 'pointer', zIndex: 2 }}
          aria-label="Tocar no robô"
        >
          {/* Robot body */}
          <motion.div
            style={{ width: 150, height: 150 }}
            animate={
              !tapped
                ? { y: [0, -9, 0], scale: 1 }
                : { scale: [1, 0.85, 1.18, 1], y: 0 }
            }
            transition={
              !tapped
                ? { y: { duration: 2.1, repeat: Infinity, ease: 'easeInOut' } }
                : { duration: 0.52, ease: [0.34, 1.56, 0.64, 1] }
            }
          >
            {tapped ? <RobotEmotions1 /> : <Robot1 />}
          </motion.div>

          {/* Hand — disappears on tap */}
          <AnimatePresence>
            {!tapped && (
              <motion.div
                className="absolute -top-6 -right-10"
                initial={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.6, y: -12 }}
                transition={{ duration: 0.22 }}
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                >
                  <RobotHand />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {/* Text area */}
        <AnimatePresence mode="wait">
          {!tapped ? (
            <motion.div
              key="pre-tap"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="text-center"
              style={{ zIndex: 2 }}
            >
              <motion.p
                className="text-[22px] mb-2"
                animate={{ scale: [1, 1.07, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                Toca aqui! 🤚
              </motion.p>
              <p className="text-gray-500 text-[15px]">
                A gente forma uma bela dupla, ein?!
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="post-tap"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.4 }}
              className="text-center"
              style={{ position: 'relative', zIndex: 2 }}
            >
              <p className="text-[22px] mb-2">Rascunho criado! 🎉</p>
              <p className="text-gray-500 text-[15px] mb-7">
                Revise os detalhes e publique quando estiver pronto.
              </p>
              <button
                onClick={onComplete}
                className="inline-flex items-center gap-2 px-7 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors text-[15px]"
              >
                Ver rascunho
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
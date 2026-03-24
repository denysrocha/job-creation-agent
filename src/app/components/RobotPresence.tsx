import { motion } from "motion/react";
import Robot1 from "../../imports/Robot";

export type RobotState = 'idle' | 'typing' | 'looking-right';

interface RobotPresenceProps {
  state?: RobotState;
  size?: number;
}

export function RobotPresence({ state = 'idle', size = 40 }: RobotPresenceProps) {
  const isTyping = state === 'typing';
  const isLooking = state === 'looking-right';

  return (
    <div className="flex items-center gap-3">
      <motion.div
        style={{ width: size, height: size, flexShrink: 0 }}
        animate={
          isLooking
            ? { y: 0, rotate: 8, x: 5 }
            : isTyping
            ? { y: 0, rotate: 0, x: 0 }
            : { y: [0, -6, 0], rotate: 0, x: 0 }
        }
        transition={
          isLooking || isTyping
            ? { duration: 0.3, ease: 'easeOut' }
            : {
                y: {
                  duration: 2.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
                rotate: { duration: 0.3 },
                x: { duration: 0.3 },
              }
        }
      >
        <Robot1 />
      </motion.div>

      {isTyping && (
        <div className="flex gap-[5px] items-center py-1">
          {[0, 150, 300].map((delay, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

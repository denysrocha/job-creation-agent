import clsx from "clsx";
import svgPaths from "./svg-xgvu61k4ei";
import { imgRectangle18413, imgRectangle18415 } from "./svg-moj7o";
type RobotEmotionsBackgroundImageProps = {
  additionalClassNames?: string;
};

function RobotEmotionsBackgroundImage({ additionalClassNames = "" }: RobotEmotionsBackgroundImageProps) {
  return (
    <div className={clsx("flex-none h-[4px] w-[12px]", additionalClassNames)}>
      <div className="bg-white relative rounded-[14.159px] shadow-[0px_0px_23.009px_5.31px_rgba(181,67,255,0.78)] size-full">
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_7.08px_0px_rgba(255,0,255,0.25)]" />
      </div>
    </div>
  );
}
type RobotEmotionsProps = {
  className?: string;
  property1?: "happy1" | "sad1" | "sad2" | "happy2";
};

function RobotEmotions({ className, property1 = "sad1" }: RobotEmotionsProps) {
  const isHappy1OrHappy2 = ["happy1", "happy2"].includes(property1);
  const isSad1OrSad2 = ["sad1", "sad2"].includes(property1);
  const isSad2 = property1 === "sad2";
  const isSad2OrHappy2 = ["sad2", "happy2"].includes(property1);
  return (
    <div className={className || "relative size-[122px]"}>
      <div className={`-translate-x-1/2 absolute bottom-[7.38%] top-[90.16%] ${property1 === "happy2" ? "left-[calc(50%-2px)] w-[12px]" : property1 === "happy1" ? "left-1/2 w-[20px]" : isSad2 ? "left-1/2 w-[12px]" : "left-[calc(50%-2px)] w-[20px]"}`}>
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox={isSad2OrHappy2 ? "0 0 12 3" : "0 0 20 3"}>
          <ellipse cx={isSad2OrHappy2 ? "6" : "10"} cy="1.5" fill={isSad2OrHappy2 ? "var(--fill-0, #E6E6E6)" : "var(--fill-0, #CCCCCC)"} id="Ellipse 18" rx={isSad2OrHappy2 ? "6" : "10"} ry="1.5" />
        </svg>
      </div>
      <div className={`absolute ${isSad2OrHappy2 ? "inset-[8.2%_13.93%_16.39%_10.66%]" : "inset-[11.48%_13.93%_13.11%_10.66%]"}`} data-name="IA_mascote">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 92 92">
          <g filter="url(#filter0_iii_239_247)" id="Ellipse 19">
            <circle cx="46" cy="46" fill="var(--fill-0, #F6F0F0)" r="46" />
            <circle cx="46" cy="46" fill="url(#paint0_linear_239_247)" fillOpacity="0.72" r="46" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="139.788" id="filter0_iii_239_247" width="136.248" x="0" y="-33.6283">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feMorphology in="SourceAlpha" operator="erode" radius="37.1681" result="effect1_innerShadow_239_247" />
              <feOffset dy="-33.6283" />
              <feGaussianBlur stdDeviation="45.7522" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.489835 0 0 0 0 0.468924 0 0 0 0 0.608333 0 0 0 1 0" />
              <feBlend in2="shape" mode="normal" result="effect1_innerShadow_239_247" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feMorphology in="SourceAlpha" operator="erode" radius="28.3186" result="effect2_innerShadow_239_247" />
              <feOffset dx="44.2478" />
              <feGaussianBlur stdDeviation="31.8584" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
              <feBlend in2="effect1_innerShadow_239_247" mode="normal" result="effect2_innerShadow_239_247" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="15.9292" dy="14.1593" />
              <feGaussianBlur stdDeviation="22.5664" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.686275 0 0 0 0 0.67451 0 0 0 0 0.752941 0 0 0 1 0" />
              <feBlend in2="effect2_innerShadow_239_247" mode="normal" result="effect3_innerShadow_239_247" />
            </filter>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_239_247" x1="18.0472" x2="51.8348" y1="8.27729" y2="59.0265">
              <stop offset="0.144449" stopColor="white" />
              <stop offset="1" stopColor="#B3AFC4" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 mix-blend-soft-light">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 92 92">
            <g id="Ellipse 20" style={{ mixBlendMode: "soft-light" }}>
              <circle cx="46" cy="46" fill={isHappy1OrHappy2 ? "var(--fill-0, #FF2428)" : "var(--fill-0, #89878A)"} fillOpacity="0.47" r="46" />
            </g>
          </svg>
        </div>
        <div className="absolute border-[rgba(255,255,255,0.9)] border-b-[3.54px] border-l-[1.77px] border-r-[2.655px] border-solid border-t-[1.77px] inset-[16.52%_6.19%_25.96%_11.8%] rounded-[141.593px]" style={isHappy1OrHappy2 ? { backgroundImage: "linear-gradient(-63.8982deg, rgb(58, 2, 123) 7.6828%, rgb(107, 17, 196) 37.361%, rgb(223, 37, 255) 70.677%, rgb(255, 89, 37) 106.61%), linear-gradient(90deg, rgb(217, 217, 217) 0%, rgb(217, 217, 217) 100%)" } : { backgroundImage: "linear-gradient(90deg, rgb(164, 164, 164) 0%, rgb(164, 164, 164) 100%), linear-gradient(90deg, rgb(217, 217, 217) 0%, rgb(217, 217, 217) 100%)" }}>
          <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-7.08px_14.867px_0px_rgba(0,0,0,0.56)]" />
        </div>
        <div className="absolute bg-[#0d1015] inset-[21.83%_11.5%_31.27%_17.11%] rounded-[109.735px]">
          <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_28.319px_7.08px_black,inset_0px_0px_17.699px_17.699px_rgba(190,0,89,0.38)]" />
        </div>
        <div className="absolute contents inset-[21.83%_11.5%_31.27%_17.11%]" data-name="Mask group">
          <div className="absolute flex inset-[-2.36%_43.43%_41.07%_-23.3%] items-center justify-center">
            <div className="flex-none h-[43.15px] rotate-[-12.55deg] w-[65.676px]">
              <div className="bg-[#9af] blur-[14.159px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[37.18px_22.254px] mask-size-[65.676px_43.15px] opacity-10 rounded-[109.735px] size-full" style={{ maskImage: `url('${imgRectangle18413}')` }} />
            </div>
          </div>
        </div>
        <div className="absolute contents inset-[21.83%_11.5%_31.27%_17.11%]" data-name="Mask group">
          <div className={`absolute ${isHappy1OrHappy2 ? "inset-[43.58%_23.91%_40.22%_30.43%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-12.26px_-20.014px] mask-size-[65.676px_43.15px]" : "flex inset-[-37.55%_3.42%_41.07%_-29.15%] items-center justify-center"}`} style={isHappy1OrHappy2 ? { maskImage: `url('${imgRectangle18415}')` } : undefined}>
            <div className={isHappy1OrHappy2 ? "absolute inset-[-257.44%_-91.35%]" : "flex-none h-[67.925px] rotate-[-12.55deg] w-[103.383px]"}>
              {isSad1OrSad2 && <div className="bg-[#9af] blur-[14.159px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[42.563px_54.63px] mask-size-[65.676px_43.15px] opacity-8 rounded-[109.735px] size-full" style={{ maskImage: `url('${imgRectangle18415}')` }} />}
              {isHappy1OrHappy2 && (
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 118.734 91.6375">
                  <g id="Frame 48097130">
                    <g filter="url(#filter0_di_239_416)" id="heart">
                      <path clipRule="evenodd" d={svgPaths.p31abe9f0} fill="url(#paint0_linear_239_416)" fillRule="evenodd" />
                    </g>
                    <g filter="url(#filter1_di_239_416)" id="heart_2">
                      <path clipRule="evenodd" d={svgPaths.p28094b80} fill="url(#paint1_linear_239_416)" fillRule="evenodd" />
                    </g>
                  </g>
                  <defs>
                    <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="91.6375" id="filter0_di_239_416" width="94.3471" x="1.11759e-08" y="2.23517e-08">
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                      <feMorphology in="SourceAlpha" operator="dilate" radius="7.19383" result="effect1_dropShadow_239_416" />
                      <feOffset />
                      <feGaussianBlur stdDeviation="15.5866" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.262745 0 0 0 0 0.275033 0 0 0 0.78 0" />
                      <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_239_416" />
                      <feBlend in="SourceGraphic" in2="effect1_dropShadow_239_416" mode="normal" result="shape" />
                      <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                      <feOffset />
                      <feGaussianBlur stdDeviation="4.79589" />
                      <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
                      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0 0 0 0 0 0.0166667 0 0 0 0.25 0" />
                      <feBlend in2="shape" mode="normal" result="effect2_innerShadow_239_416" />
                    </filter>
                    <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="91.6375" id="filter1_di_239_416" width="94.3471" x="24.3871" y="2.63181e-06">
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                      <feMorphology in="SourceAlpha" operator="dilate" radius="7.19383" result="effect1_dropShadow_239_416" />
                      <feOffset />
                      <feGaussianBlur stdDeviation="15.5866" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.262745 0 0 0 0 0.275033 0 0 0 0.78 0" />
                      <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_239_416" />
                      <feBlend in="SourceGraphic" in2="effect1_dropShadow_239_416" mode="normal" result="shape" />
                      <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                      <feOffset />
                      <feGaussianBlur stdDeviation="4.79589" />
                      <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
                      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0 0 0 0 0 0.0166667 0 0 0 0.25 0" />
                      <feBlend in2="shape" mode="normal" result="effect2_innerShadow_239_416" />
                    </filter>
                    <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_239_416" x1="47.1736" x2="47.1736" y1="38.3671" y2="53.2703">
                      <stop stopColor="#EF5658" />
                      <stop offset="1" stopColor="#893132" />
                    </linearGradient>
                    <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_239_416" x1="71.5607" x2="71.5607" y1="38.3671" y2="53.2703">
                      <stop stopColor="#EF5658" />
                      <stop offset="1" stopColor="#893132" />
                    </linearGradient>
                  </defs>
                </svg>
              )}
            </div>
          </div>
          {isHappy1OrHappy2 && (
            <div className="absolute flex inset-[-37.55%_3.42%_41.07%_-29.15%] items-center justify-center">
              <div className="flex-none h-[67.925px] rotate-[-12.55deg] w-[103.383px]">
                <div className="bg-[#9af] blur-[14.159px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[42.563px_54.63px] mask-size-[65.676px_43.15px] opacity-8 rounded-[109.735px] size-full" style={{ maskImage: `url('${imgRectangle18415}')` }} />
              </div>
            </div>
          )}
        </div>
        <div className="absolute inset-[32.15%_18.47%_54.52%_68.14%]">
          <div className="absolute inset-[-114.08%_-113.49%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40.2852 40.2213">
              <g filter="url(#filter0_d_239_205)" id="Frame 48097129">
                <path clipRule="evenodd" d={svgPaths.p30886900} fill="var(--fill-0, #9549CA)" fillRule="evenodd" id="Vector" />
                <path clipRule="evenodd" d={svgPaths.p345af580} fill="var(--fill-0, #7641A0)" fillRule="evenodd" id="Vector_2" />
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="40.2213" id="filter0_d_239_205" width="40.2853" x="0" y="0">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                  <feOffset />
                  <feGaussianBlur stdDeviation="6.99115" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0.710115 0 0 0 0 0.307049 0 0 0 0 0.995833 0 0 0 0.71 0" />
                  <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_239_205" />
                  <feBlend in="SourceGraphic" in2="effect1_dropShadow_239_205" mode="normal" result="shape" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
        {isSad1OrSad2 && (
          <>
            <div className="absolute contents inset-[48.91%_29.31%_42.71%_34.78%]">
              <div className="absolute flex inset-[49.12%_51.47%_42.71%_34.78%] items-center justify-center">
                <RobotEmotionsBackgroundImage additionalClassNames="-rotate-18" />
              </div>
              <div className="absolute flex inset-[48.91%_29.31%_42.92%_56.94%] items-center justify-center">
                <RobotEmotionsBackgroundImage additionalClassNames="rotate-18" />
              </div>
            </div>
            <div className={`absolute ${isSad2 ? "inset-[11.96%_16.3%_63.04%_66.3%]" : "inset-[11.96%_15.22%_63.04%_67.39%]"}`}>
              <div className="absolute inset-[0_-25%_-34.78%_-25%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 31">
                  <g id="Group 48095399">
                    <g filter="url(#filter0_di_239_420)" id="Ellipse 21">
                      <path d={svgPaths.p2e9582f0} fill="url(#paint0_linear_239_420)" />
                    </g>
                    <ellipse cx="15.5" cy="10.5" fill="var(--fill-0, white)" id="Ellipse 22" opacity="0.8" rx="1.5" ry="3.5" transform="rotate(-15.8369 15.5 10.5)" />
                  </g>
                  <defs>
                    <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="31" id="filter0_di_239_420" width="24" x="0" y="0">
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="2" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                      <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_239_420" />
                      <feBlend in="SourceGraphic" in2="effect1_dropShadow_239_420" mode="normal" result="shape" />
                      <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="2" />
                      <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0.708048 0 0 0 0 0.863506 0 0 0 0 0.953508 0 0 0 0.25 0" />
                      <feBlend in2="shape" mode="normal" result="effect2_innerShadow_239_420" />
                    </filter>
                    <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_239_420" x1="12" x2="12" y1="0" y2="23">
                      <stop stopColor="#E1F5FA" />
                      <stop offset="1" stopColor="#5EC0DB" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function RobotEmotions1() {
  return <RobotEmotions className="relative size-full" property1="happy2" />;
}
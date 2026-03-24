import svgPaths from "./svg-f1cx361lrp";
import { imgRectangle18413, imgRectangle18415 } from "./svg-fgwx2";
type RobotProps = {
  className?: string;
  position?: "2" | "3" | "4" | "6" | "7" | "5" | "1";
};

function Robot({ className, position = "1" }: RobotProps) {
  const is2Or4 = ["2", "4"].includes(position);
  const is6 = position === "6";
  return (
    <div className={className || "relative size-[122px]"}>
      <div className={`-translate-x-1/2 absolute bottom-[7.38%] left-[calc(50%-2px)] top-[90.16%] ${is2Or4 ? "w-[12px]" : "w-[20px]"}`}>
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox={is2Or4 ? "0 0 12 3" : "0 0 20 3"}>
          <ellipse cx={is2Or4 ? "6" : "10"} cy="1.5" fill={is2Or4 ? "var(--fill-0, #E6E6E6)" : "var(--fill-0, #CCCCCC)"} id="Ellipse 18" rx={is2Or4 ? "6" : "10"} ry="1.5" />
        </svg>
      </div>
      <div className={`absolute ${is2Or4 ? "inset-[8.2%_13.93%_16.39%_10.66%]" : "inset-[11.48%_13.93%_13.11%_10.66%]"}`} data-name="IA_mascote">
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
              <circle cx="46" cy="46" fill="var(--fill-0, #8A24FF)" fillOpacity="0.47" r="46" />
            </g>
          </svg>
        </div>
        <div className="absolute border-[rgba(255,255,255,0.9)] border-b-[3.54px] border-l-[1.77px] border-r-[2.655px] border-solid border-t-[1.77px] inset-[16.52%_6.19%_25.96%_11.8%] rounded-[141.593px]" style={{ backgroundImage: "linear-gradient(-63.8982deg, rgb(58, 2, 123) 7.6828%, rgb(107, 17, 196) 37.361%, rgb(223, 37, 255) 70.677%, rgb(255, 89, 37) 106.61%), linear-gradient(90deg, rgb(217, 217, 217) 0%, rgb(217, 217, 217) 100%)" }}>
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
          <div className="absolute flex inset-[-37.55%_3.42%_41.07%_-29.15%] items-center justify-center">
            <div className="flex-none h-[67.925px] rotate-[-12.55deg] w-[103.383px]">
              <div className="bg-[#9af] blur-[14.159px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[42.563px_54.63px] mask-size-[65.676px_43.15px] opacity-8 rounded-[109.735px] size-full" style={{ maskImage: `url('${imgRectangle18415}')` }} />
            </div>
          </div>
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
        <div className={`absolute contents ${is6 ? "inset-[52.96%_32.13%_43.78%_37.44%]" : "inset-[45.43%_32.15%_38.35%_37.46%]"}`}>
          <div className={`absolute bg-white rounded-[14.159px] shadow-[0px_0px_23.009px_5.31px_rgba(181,67,255,0.78)] ${is6 ? "inset-[52.96%_53.87%_43.78%_37.44%]" : "inset-[45.43%_54.87%_38.35%_37.46%]"}`}>
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_7.08px_0px_rgba(255,0,255,0.25)]" />
          </div>
          <div className={`absolute bg-white rounded-[14.159px] shadow-[0px_0px_23.009px_5.31px_rgba(181,67,255,0.78)] ${is6 ? "inset-[52.96%_32.13%_43.78%_60.26%]" : "inset-[45.43%_32.15%_38.35%_60.18%]"}`}>
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_7.08px_0px_rgba(255,0,255,0.25)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Robot1() {
  return <Robot className="relative size-full" />;
}
import clsx from "clsx";
import svgPaths from "./svg-egy1m69tvi";
import imgImage3 from "figma:asset/54cc36155fa3e6f354151e3c419ab6d505dd71c2.png";

function Wrapper7({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] shadow-[0px_4px_8px_0px_rgba(26,26,26,0.1),0px_0px_1px_0px_rgba(26,26,26,0.1)]">
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[24px] relative w-full">{children}</div>
    </div>
  );
}

function Wrapper6({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        {children}
      </svg>
    </div>
  );
}
type Wrapper5Props = {
  additionalClassNames?: string;
};

function Wrapper5({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper5Props>) {
  return (
    <div className={clsx("relative", additionalClassNames)}>
      <div className="content-stretch flex flex-col gap-[8px] items-start relative w-full">{children}</div>
    </div>
  );
}

function Frame48096275Helper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
      <div className="content-stretch flex isolate items-center px-[16px] py-[8px] relative w-full">{children}</div>
    </div>
  );
}
type Wrapper4Props = {
  additionalClassNames?: string;
};

function Wrapper4({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper4Props>) {
  return (
    <div className={additionalClassNames}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66667 10.6667">
        {children}
      </svg>
    </div>
  );
}
type Wrapper3Props = {
  additionalClassNames?: string;
};

function Wrapper3({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper3Props>) {
  return (
    <div className={additionalClassNames}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
        {children}
      </svg>
    </div>
  );
}
type Wrapper2Props = {
  additionalClassNames?: string;
};

function Wrapper2({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper2Props>) {
  return (
    <li className={clsx("ms-[calc(var(--list-marker-font-size,0)*1.5*1)]", additionalClassNames)}>
      <span className="font-['Funnel_Sans:Regular','Noto_Sans:Regular',sans-serif] leading-[20px] text-[#484848] text-[14px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
        {children}
      </span>
    </li>
  );
}
type TextButtonProps = {
  text: string;
  additionalClassNames?: string;
};

function TextButton({ children, text, additionalClassNames = "" }: React.PropsWithChildren<TextButtonProps>) {
  return (
    <div className="relative rounded-[8px] shrink-0">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[24px] py-[12px] relative">
          <div style={{ fontVariationSettings: "'wdth' 100" }} className={clsx("flex flex-col font-['Open_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[16px] whitespace-nowrap", additionalClassNames)}>
            <p className="leading-[normal]">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
type Wrapper1Props = {
  additionalClassNames?: string;
};

function Wrapper1({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper1Props>) {
  return (
    <div className={clsx("relative shrink-0 w-full", additionalClassNames)}>
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[24px] py-[12px] relative w-full">{children}</div>
      </div>
    </div>
  );
}
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return (
    <div className={clsx("relative rounded-[8px] shrink-0 w-full", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border border-[#808080] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[12px] relative w-full">{children}</div>
      </div>
    </div>
  );
}
type BodyTextProps = {
  text: string;
};

function BodyText({ text }: BodyTextProps) {
  return <Wrapper2>{text}</Wrapper2>;
}
type Helper3Props = {
  additionalClassNames?: string;
};

function Helper3({ additionalClassNames = "" }: Helper3Props) {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon - General">
        <div className="absolute flex inset-[16.67%] items-center justify-center">
          <div className="-scale-y-100 flex-none rotate-180 size-[16px]">
            <Wrapper3 additionalClassNames="relative size-full">
              <g id="time">
                <path d={svgPaths.p3fc34100} fill="var(--fill-0, #808080)" />
                <path clipRule="evenodd" d={svgPaths.p1fb3d1f0} fill="var(--fill-0, #808080)" fillRule="evenodd" />
              </g>
            </Wrapper3>
          </div>
        </div>
      </div>
      <Text1 text="CLT" additionalClassNames="text-[12px] text-right" />
    </div>
  );
}
type Helper2Props = {
  additionalClassNames?: string;
};

function Helper2({ additionalClassNames = "" }: Helper2Props) {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon - General">
        <div className="absolute flex inset-[16.67%_29.17%] items-center justify-center">
          <div className="-scale-y-100 flex-none h-[16px] rotate-180 w-[10px]">
            <Wrapper4 additionalClassNames="relative size-full">
              <g id="user">
                <path clipRule="evenodd" d={svgPaths.pa6e4d00} fill="var(--fill-0, #808080)" fillRule="evenodd" />
                <path d={svgPaths.p14a20d80} fill="var(--fill-0, #808080)" />
              </g>
            </Wrapper4>
          </div>
        </div>
      </div>
      <Text1 text="Sênior" additionalClassNames="text-[12px] text-right" />
    </div>
  );
}
type Helper1Props = {
  additionalClassNames?: string;
};

function Helper1({ additionalClassNames = "" }: Helper1Props) {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="relative shrink-0 size-[16px]" data-name="Icon - General">
        <Wrapper4 additionalClassNames="absolute inset-[16.67%_29.17%]">
          <path clipRule="evenodd" d={svgPaths.p19c57d80} fill="var(--fill-0, #808080)" fillRule="evenodd" id="dollar" />
        </Wrapper4>
      </div>
      <Text1 text="R$9.400,00" additionalClassNames="text-[12px] text-right" />
    </div>
  );
}
type HelperProps = {
  additionalClassNames?: string;
};

function Helper({ additionalClassNames = "" }: HelperProps) {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="relative shrink-0 size-[16px]" data-name="Icon - General">
        <MapPin />
      </div>
      <Text1 text="Remoto" additionalClassNames="text-[12px] text-right" />
    </div>
  );
}

function MapPin() {
  return (
    <div className="absolute inset-[16.67%_24.36%]">
      <div className="absolute inset-[-4.69%_-6.09%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.20513 11.6667">
          <g id="MapPin">
            <path d={svgPaths.pca65a00} id="Vector" stroke="var(--stroke-0, #808080)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p2e9e0940} id="Vector_2" stroke="var(--stroke-0, #808080)" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      </div>
    </div>
  );
}
type Text6Props = {
  text: string;
};

function Text6({ text }: Text6Props) {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <RadioButton className="relative rounded-[100px] shrink-0 size-[24px]" mode="Light" />
      <p className="font-['Funnel_Sans:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#484848] text-[14px] whitespace-nowrap">{text}</p>
    </div>
  );
}
type Text5Props = {
  text: string;
};

function Text5({ text }: Text5Props) {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <RadioButton className="bg-white relative rounded-[100px] shrink-0 size-[24px]" mode="Light" states="Active" />
      <p className="font-['Funnel_Sans:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#484848] text-[14px] whitespace-nowrap">{text}</p>
    </div>
  );
}

function IconArrow() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <div className="absolute inset-[32.5%_20%]" data-name="angle-down">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
          <path d={svgPaths.p20627880} fill="var(--fill-0, #808080)" id="angle-down" />
        </svg>
      </div>
    </div>
  );
}
type Text4Props = {
  text: string;
};

function Text4({ text }: Text4Props) {
  return (
    <div style={{ fontVariationSettings: "'wdth' 100" }} className="flex flex-col font-['Open_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[16px] w-full">
      <p className="leading-[normal]">{text}</p>
    </div>
  );
}
type Text3Props = {
  text: string;
};

function Text3({ text }: Text3Props) {
  return (
    <div style={{ fontVariationSettings: "'wdth' 100" }} className="flex flex-[1_0_0] flex-col font-['Open_Sans:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px relative text-[#808080] text-[14px]">
      <p className="leading-[normal]">{text}</p>
    </div>
  );
}

function Text2({ text, additionalClassNames = "" }: Text2Props) {
  return (
    <div style={{ fontVariationSettings: "'wdth' 100" }} className={clsx("flex flex-col font-['Open_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[16px] whitespace-nowrap", additionalClassNames)}>
      <p className="leading-[normal]">{text}</p>
    </div>
  );
}
type Text1Props = {
  text: string;
  additionalClassNames?: string;
};

function Text1({ text, additionalClassNames = "" }: Text1Props) {
  return (
    <div style={{ fontVariationSettings: "'wdth' 100" }} className={clsx("flex flex-col font-['Open_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#808080] whitespace-nowrap", additionalClassNames)}>
      <p className="leading-[normal]">{text}</p>
    </div>
  );
}
type TextProps = {
  text: string;
  additionalClassNames?: string;
};

function Text({ text, additionalClassNames = "" }: TextProps) {
  return (
    <div className={clsx("relative rounded-[8px] shrink-0 w-full", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border border-[#808080] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex items-start p-[12px] relative w-full">
        <Text3 text={text} />
      </div>
    </div>
  );
}
type RadioButtonProps = {
  className?: string;
  mode?: "Dark" | "Light";
  states?: "Default" | "Active" | "Disabled" | "Hover";
};

function RadioButton({ className, mode = "Dark", states = "Default" }: RadioButtonProps) {
  const isActiveAndLight = states === "Active" && mode === "Light";
  const isDisabledAndLight = states === "Disabled" && mode === "Light";
  return (
    <div className={className || `relative rounded-[100px] size-[24px] ${isDisabledAndLight ? "bg-[#ccc]" : isActiveAndLight ? "bg-white" : mode === "Light" && ["Default", "Hover"].includes(states) ? "" : "bg-[#333]"}`}>
      <div aria-hidden="true" className={`absolute border-2 border-solid inset-0 pointer-events-none rounded-[100px] ${isDisabledAndLight ? "border-[#b3b3b3]" : isActiveAndLight ? "border-[#8a24ff]" : states === "Disabled" && mode === "Dark" ? "border-[#484848]" : (states === "Hover" && mode === "Dark") || (states === "Active" && mode === "Dark") || (states === "Hover" && mode === "Light") ? "border-[#a95eff]" : "border-[#808080]"}`} />
      {states === "Active" && ["Dark", "Light"].includes(mode) && (
        <div className="flex flex-col items-center justify-center size-full">
          <div className="content-stretch flex flex-col items-center justify-center p-[5px] relative size-full">
            <div className="bg-[#a95eff] flex-[1_0_0] min-h-px min-w-px relative rounded-[100px] w-full">
              <div className="size-full" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Vaga() {
  return (
    <div className="bg-[#f2f2f2] relative size-full" data-name="vaga">
      <div className="absolute bg-white content-stretch flex flex-col gap-[16px] items-start left-[789px] p-[24px] rounded-[12px] shadow-[0px_10px_15px_0px_rgba(71,79,99,0.15)] top-[98px] w-[443px]" data-name="Formulário - informações">
        <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
            <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#484848] text-[18px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
              Candidate-se para a vaga
            </p>
          </div>
          <div className="content-stretch flex items-start relative shrink-0 w-full">
            <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Tabs">
              <Frame48096275Helper>
                <div className="flex flex-col font-['Open_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#8a24ff] text-[14px] whitespace-nowrap z-[1]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  <ol start="1">
                    <li className="ms-[21px] whitespace-pre-wrap">
                      <span className="leading-[normal]">Informações</span>
                    </li>
                  </ol>
                </div>
              </Frame48096275Helper>
              <div aria-hidden="true" className="absolute border-[#8a24ff] border-b-2 border-solid inset-0 pointer-events-none" />
            </div>
            <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Tabs">
              <Frame48096275Helper>
                <div className="flex flex-col font-['Open_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#333] text-[14px] whitespace-nowrap z-[1]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  <ol start="2">
                    <li className="ms-[21px] whitespace-pre-wrap">
                      <span className="leading-[normal]">Diversidade</span>
                    </li>
                  </ol>
                </div>
              </Frame48096275Helper>
              <div aria-hidden="true" className="absolute border-[#e6e6e6] border-b-2 border-solid inset-0 pointer-events-none" />
            </div>
          </div>
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
            <Wrapper5 additionalClassNames="shrink-0 w-full">
              <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#484848] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                Nome Completo *
              </p>
              <Text text="Nome" />
            </Wrapper5>
          </div>
          <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
            <Wrapper5 additionalClassNames="shrink-0 w-full">
              <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#484848] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                CPF
              </p>
              <Text text="000.000.000-00" />
            </Wrapper5>
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
              <div className="relative rounded-[2px] shrink-0 size-[24px]" data-name="CheckBox">
                <div aria-hidden="true" className="absolute border-2 border-[#808080] border-solid inset-0 pointer-events-none rounded-[2px]" />
              </div>
              <div className="flex flex-col font-['Funnel_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#484848] text-[14px] whitespace-nowrap">
                <p className="leading-[normal]">Não sou brasileiro</p>
              </div>
            </div>
          </div>
          <Wrapper5 additionalClassNames="shrink-0 w-full">
            <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#484848] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
              Seu melhor Email *
            </p>
            <Text text="Placeholder" />
          </Wrapper5>
          <div className="content-stretch flex gap-[8px] items-end relative shrink-0 w-full">
            <Wrapper5 additionalClassNames="shrink-0 w-[113px]">
              <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#484848] text-[14px] w-[142px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                Celular
              </p>
              <Wrapper additionalClassNames="bg-white">
                <Text3 text="SA +996" />
                <IconArrow />
              </Wrapper>
            </Wrapper5>
            <Wrapper5 additionalClassNames="flex-[1_0_0] min-h-px min-w-px">
              <Text text="00 0 0000 0000" additionalClassNames="bg-white" />
            </Wrapper5>
          </div>
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
            <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="input text">
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#484848] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                  Linkedin *
                </p>
              </div>
              <div className="relative rounded-[8px] shrink-0 w-full">
                <div aria-hidden="true" className="absolute border border-[#808080] border-solid inset-0 pointer-events-none rounded-[8px]" />
                <div className="content-stretch flex items-start p-[12px] relative w-full">
                  <div className="flex flex-[1_0_0] flex-col font-['Funnel_Sans:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#808080] text-[14px]">
                    <p className="leading-[normal]">{`https://linkedin.com/in/seu-perfil`}</p>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                <div className="content-stretch flex items-center relative shrink-0 w-full">
                  <p className="[text-decoration-skip-ink:none] decoration-solid flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px relative text-[#8a24ff] text-[14px] underline" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Obtenha o link do seu perfil do linkedin
                  </p>
                </div>
                <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#808080] text-[12px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                  (copie e cole o link do seu perfil do LinkedIn no campo acima, que está presente no navegador)
                </p>
              </div>
            </div>
          </div>
          <Wrapper5 additionalClassNames="shrink-0 w-full">
            <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#333] text-[14px] w-[142px]" style={{ fontVariationSettings: "'wdth' 100" }}>
              País de origem
            </p>
            <Wrapper>
              <Text3 text="Selecione o país" />
              <IconArrow />
            </Wrapper>
          </Wrapper5>
          <Wrapper5 additionalClassNames="shrink-0 w-full">
            <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#808080] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
              Cidade
            </p>
            <Text text="Informe sua cidade" additionalClassNames="bg-[#e6e6e6]" />
          </Wrapper5>
          <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Availability Section">
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Availability Question">
              <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] min-w-full relative shrink-0 text-[#484848] text-[14px] w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Você tem disponibilidade para trabalhar no formato `}</p>
              <div className="content-stretch flex items-center relative shrink-0" data-name="Location Details">
                <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#484848] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                  híbrido em Salvador, Bahia, 2x por semana?
                </p>
                <div className="content-stretch flex flex-col items-center justify-center px-[4px] relative shrink-0 w-[8px]">
                  <p className="font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#8a24ff] text-[14px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                    *
                  </p>
                </div>
              </div>
            </div>
            <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Availability Options">
              <Text5 text="Sim" />
              <Text6 text="Não" />
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
            <p className="font-['Lato:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#484848] text-[16px] w-full">Currículo</p>
            <div className="bg-[#f2e7fe] relative rounded-[8px] shrink-0 w-full" data-name="Text Button">
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex gap-[6px] items-center justify-center px-[24px] py-[12px] relative w-full">
                  <div className="overflow-clip relative shrink-0 size-[18px]" data-name="Variation=Add">
                    <div className="absolute inset-[16.67%]" data-name="math-plus">
                      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                        <path d={svgPaths.p1ea20d80} fill="var(--fill-0, #8A24FF)" id="math-plus" />
                      </svg>
                    </div>
                  </div>
                  <Text2 text="Anexar curriculo" additionalClassNames="text-[#8a24ff]" />
                </div>
              </div>
            </div>
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
              <div className="relative shrink-0 size-[24px]" data-name="Icon - Office & Editing">
                <div className="absolute inset-[16.67%_20.84%]" data-name="Paperclip">
                  <div className="absolute inset-[-4.69%_-5.36%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.4992 17.5">
                      <g id="Paperclip">
                        <path d={svgPaths.pcff9c80} id="Vector" stroke="var(--stroke-0, #8A24FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
              <p className="font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#8a24ff] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                Currículo Marcos.pdf
              </p>
              <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon - General">
                <Wrapper3 additionalClassNames="absolute inset-[16.67%]">
                  <path clipRule="evenodd" d={svgPaths.p295b2c0} fill="var(--fill-0, #B3B3B3)" fillRule="evenodd" id="â³Color" />
                </Wrapper3>
              </div>
            </div>
          </div>
          <Wrapper5 additionalClassNames="shrink-0 w-full">
            <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#484848] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
              Remuneração esperada
            </p>
            <Text text="R$ 0.000,00" />
          </Wrapper5>
          <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
            <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#484848] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
              Tipo de contrato
            </p>
            <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
              <Text5 text="PJ" />
              <Text6 text="CLT" />
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
            <Wrapper5 additionalClassNames="shrink-0 w-full">
              <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#484848] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                Foi indicado? Informe o email de quem indicou
              </p>
              <Text text="quem-me-indicou@empresa.com" />
            </Wrapper5>
            <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#808080] text-[12px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
              Forneça o email corporativo de quem o indicou
            </p>
          </div>
        </div>
        <Wrapper1 additionalClassNames="bg-[#1a1a1a] rounded-[8px]">
          <Text2 text="Avançar" additionalClassNames="text-white" />
        </Wrapper1>
      </div>
      <div className="absolute bg-[#f2f2f2] content-stretch flex items-center justify-between left-0 px-[136px] top-0 w-[1368px]" data-name="header">
        <div aria-hidden="true" className="absolute border-[#e6e6e6] border-b-2 border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
          <div className="content-stretch flex flex-col h-[62px] items-center justify-center p-[10px] relative shrink-0 w-[120px]">
            <div aria-hidden="true" className="absolute border-2 border-[#e6e6e6] border-solid inset-0 pointer-events-none" />
            <div className="h-[30px] mix-blend-multiply relative shrink-0 w-[85px]" data-name="image 3">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage3} />
            </div>
          </div>
          <Text1 text="Grupo SBF" additionalClassNames="text-[16px]" />
        </div>
        <div className="content-stretch flex gap-[12px] items-start relative shrink-0">
          <TextButton text="Sobre a empresa" additionalClassNames="text-[#484848]" />
          <TextButton text="vagas" additionalClassNames="text-[#484848]" />
          <div className="relative rounded-[8px] self-stretch shrink-0" data-name="Option">
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex gap-[8px] h-full items-center px-[24px] py-[12px] relative">
                <Text2 text="Português [PT-BR]" additionalClassNames="text-[#484848]" />
                <div className="relative shrink-0 size-[14px]" data-name="Icon - Arrow">
                  <div className="absolute inset-[32.5%_20%]" data-name="angle-down">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.4 4.9">
                      <path d={svgPaths.p1a4e7600} fill="var(--fill-0, #484848)" id="angle-down" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-[136px] top-[98px] w-[629px]" data-name="body">
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0">
          <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
            <div className="flex flex-col font-['Funnel_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#808080] text-[14px] whitespace-nowrap">
              <p className="leading-[normal]">Compartilhar vaga:</p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0">
              <div className="bg-[#4460a0] content-stretch flex items-start overflow-clip relative rounded-[4px] shrink-0" data-name="Icon - Brand">
                <Wrapper6>
                  <g id="Facebook_1_">
                    <path d="M24 0H0V24H24V0Z" fill="var(--fill-0, white)" id="Vector" />
                    <path clipRule="evenodd" d={svgPaths.p58e4600} fill="var(--fill-0, #4460A0)" fillRule="evenodd" id="Facebook" />
                  </g>
                </Wrapper6>
              </div>
              <Wrapper6>
                <g id="Icon - Brand">
                  <g clipPath="url(#clip0_26_4527)">
                    <rect fill="var(--fill-0, white)" height="24" rx="4" width="24" />
                    <g id="Vector">
                      <path d={svgPaths.p34c48b00} fill="var(--fill-0, #0961B8)" />
                      <path d={svgPaths.p34c48b00} stroke="var(--stroke-0, white)" />
                    </g>
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_26_4527">
                    <rect fill="white" height="24" rx="4" width="24" />
                  </clipPath>
                </defs>
              </Wrapper6>
              <div className="bg-[#25d366] relative rounded-[4px] shrink-0 size-[24px]" data-name="Icon - Brand">
                <div className="absolute contents inset-[16.67%]" data-name="WA">
                  <div className="absolute inset-[16.67%]" data-name="Group">
                    <div className="absolute inset-[-4.69%_-4.69%_-4.92%_-4.92%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.5372 17.5372">
                        <g id="Group">
                          <path d={svgPaths.p6aa6a00} fill="var(--fill-0, #25D366)" id="Vector" stroke="var(--stroke-0, white)" strokeMiterlimit="10" strokeWidth="1.5" />
                          <path d={svgPaths.pfceb580} fill="var(--fill-0, white)" id="Vector_2" />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="font-['Open_Sans:Bold',sans-serif] font-bold leading-[64px] relative shrink-0 text-[#484848] text-[64px] w-[629px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Staff Infrastructure Engineer
          </p>
        </div>
        <div className="bg-white content-stretch flex gap-[8px] items-start p-[24px] relative rounded-[8px] shadow-[0px_8px_16px_0px_rgba(26,26,26,0.1),0px_0px_1px_0px_rgba(26,26,26,0.1)] shrink-0">
          <div className="content-stretch flex items-center pr-[12px] relative shrink-0">
            <div aria-hidden="true" className="absolute border-[#e6e6e6] border-r border-solid inset-0 pointer-events-none" />
            <div className="content-stretch flex gap-[2px] items-center relative shrink-0">
              <div className="relative shrink-0 size-[16px]" data-name="Icon - General">
                <MapPin />
              </div>
              <Text1 text="Presencial" additionalClassNames="text-[12px] text-right" />
            </div>
          </div>
          <div className="content-stretch flex items-center pr-[12px] relative shrink-0">
            <div className="content-stretch flex items-center relative shrink-0">
              <Text1 text="Salvador, Bahia, Brasil" additionalClassNames="text-[12px] text-right" />
            </div>
          </div>
        </div>
        <div className="font-['Red_Hat_Display:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[#484848] text-[0px] w-[629px] whitespace-pre-wrap">
          <p className="font-['Open_Sans:Bold','Noto_Sans:Regular',sans-serif] font-bold leading-[20px] mb-0 text-[18px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Desafios da Vaga
            <br aria-hidden="true" />
            <br aria-hidden="true" />
          </p>
          <ul className="list-disc mb-0">
            <Wrapper2 additionalClassNames="mb-0">{`Atuar como SRE / Devops junto aos times de infraestrutura e desenvolvimento; `}</Wrapper2>
            <Wrapper2 additionalClassNames="mb-0">{`Integrar os times de desenvolvimento e infraestrutura atuando ativamente para a melhor entrega do serviço ao cliente final; `}</Wrapper2>
            <Wrapper2 additionalClassNames="mb-0">{`Garantir a velocidade de entrega dos ambientes e serviços, com melhor uso dos recursos computacionais, seguindo as recomendações e padrões de arquitetura de mercado; `}</Wrapper2>
            <Wrapper2 additionalClassNames="mb-0">{`Auxiliar os times de desenvolvimento na entrega de produtos escaláveis, com alta-disponibilidade e performance, agregando valor ao negócio; `}</Wrapper2>
            <Wrapper2 additionalClassNames="mb-0">{`Auxiliar os times de desenvolvimento no desenho de soluções de infraestrutura, garantindo padronização e melhor uso dos recursos computacionais; `}</Wrapper2>
            <Wrapper2 additionalClassNames="mb-0">{`Atuar diretamente na redução de trabalho operacional através de automação de processos, provisionamento e utilização dos melhores serviços disponíveis; `}</Wrapper2>
            <Wrapper2 additionalClassNames="mb-0">{`Automatizar e aplicar melhorias no processo de provisionamento e gestão de microserviços; `}</Wrapper2>
            <Wrapper2 additionalClassNames="mb-0">{`Atuar na arquitetura, planejamento de escalabilidade, disponibilidade e performance de ambientes de orquestração de aplicações e containers; `}</Wrapper2>
            <Wrapper2 additionalClassNames="mb-0">{`Atuar e evoluir o modelo de provisionamento de recursos em datacenters on-premisses, clouds Azure e AWS utilizando infraestrutura como código; `}</Wrapper2>
            <Wrapper2 additionalClassNames="mb-0">{`Troubleshooting de problemas de performance e de implementações que impactem a infraestrutura e as aplicações; `}</Wrapper2>
            <BodyText text="Evoluir e incentivar a cultura de Monitoring e Observability nas aplicações e infraestrutura." />
          </ul>
          <p className="leading-[20px] mb-0 text-[14px]">&nbsp;</p>
          <p className="leading-[20px] mb-0 text-[14px]">&nbsp;</p>
          <p className="font-['Open_Sans:Bold','Noto_Sans:Regular',sans-serif] font-bold leading-[20px] mb-0 text-[18px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Requisitos da Vaga
          </p>
          <p className="font-['Open_Sans:Bold','Noto_Sans:Regular',sans-serif] font-bold leading-[20px] mb-0 text-[18px]" style={{ fontVariationSettings: "'wdth' 100" }}>{` `}</p>
          <ul className="list-disc mb-0">
            <Wrapper2 additionalClassNames="mb-0">{`Ter atuado diretamente com ambientes de missão crítica na área de Infraestrutura, sistemas operacionais e serviços; `}</Wrapper2>
            <Wrapper2 additionalClassNames="mb-0">{`Perfil analítico, autodidata e foco em solução; `}</Wrapper2>
            <Wrapper2 additionalClassNames="mb-0">{`APM​; `}</Wrapper2>
            <Wrapper2 additionalClassNames="mb-0">{`Automação; `}</Wrapper2>
            <Wrapper2 additionalClassNames="mb-0">{`Banco de Dados NoSQL; `}</Wrapper2>
            <Wrapper2 additionalClassNames="mb-0">{`CI/CD; `}</Wrapper2>
            <Wrapper2 additionalClassNames="mb-0">{`Amazon Web Services (EC2, DynamoDB, ElastiCache, S3, RDS, ELB, ASG, IAM, CloudWatch, Config); `}</Wrapper2>
            <Wrapper2 additionalClassNames="mb-0">{`Cloud Azure; `}</Wrapper2>
            <Wrapper2 additionalClassNames="mb-0">{`Logs; `}</Wrapper2>
            <Wrapper2 additionalClassNames="mb-0">{`Monitoria básica; `}</Wrapper2>
            <Wrapper2 additionalClassNames="mb-0">{`Orquestração de serviços; `}</Wrapper2>
            <Wrapper2 additionalClassNames="mb-0">{`Provisioning; `}</Wrapper2>
            <Wrapper2 additionalClassNames="mb-0">{`Sistemas Operacional Linux; `}</Wrapper2>
            <Wrapper2 additionalClassNames="mb-0">{`Sistemas Operacional Windows Server; `}</Wrapper2>
            <Wrapper2 additionalClassNames="mb-0">{`Tecnologias de Mensageria – Fila; `}</Wrapper2>
            <Wrapper2 additionalClassNames="mb-0">{`Fluência em Inglês; `}</Wrapper2>
            <Wrapper2>{`Conhecimento em Metodologias Ágeis; `}</Wrapper2>
          </ul>
          <p className="leading-[20px] mb-0 text-[14px]">&nbsp;</p>
          <p className="leading-[20px] mb-0 text-[14px]">&nbsp;</p>
          <p className="font-['Open_Sans:Bold','Noto_Sans:Regular',sans-serif] font-bold leading-[20px] mb-0 text-[18px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Benefícios
          </p>
          <p className="leading-[20px] mb-0 text-[14px]">&nbsp;</p>
          <ul className="list-disc">
            <Wrapper2 additionalClassNames="mb-0">{`Vale alimentação e refeição `}</Wrapper2>
            <Wrapper2 additionalClassNames="mb-0">{`Plano de saúde `}</Wrapper2>
            <Wrapper2 additionalClassNames="mb-0">{`Plano odontológico `}</Wrapper2>
            <Wrapper2 additionalClassNames="mb-0">{`Gympass `}</Wrapper2>
            <Wrapper2 additionalClassNames="mb-0">{`Zenklub `}</Wrapper2>
            <Wrapper2 additionalClassNames="mb-0">{`Licença maternidade de 6 meses `}</Wrapper2>
            <Wrapper2 additionalClassNames="mb-0">{`Licença paternidade de 20 dias `}</Wrapper2>
            <Wrapper2 additionalClassNames="mb-0">{`Auxílio creche `}</Wrapper2>
            <Wrapper2 additionalClassNames="mb-0">{`Trabalhe de onde quiser `}</Wrapper2>
            <Wrapper2 additionalClassNames="mb-0">{`Mais liberdade, autonomia e flexibilidade no seu dia a dia. `}</Wrapper2>
            <Wrapper2 additionalClassNames="mb-0">{`Auxílio trabalho remoto `}</Wrapper2>
            <Wrapper2 additionalClassNames="mb-0">{`Mobília para equipar seu espaço de trabalho `}</Wrapper2>
            <Wrapper2 additionalClassNames="mb-0">{`Escritórios físicos disponíveis para trabalho presencial em SP, RJ e BH `}</Wrapper2>
            <Wrapper2 additionalClassNames="mb-0">{`XP Educação: descontos em cursos e módulos gratuitos `}</Wrapper2>
            <Wrapper2 additionalClassNames="mb-0">{`Assessoria de investimentos `}</Wrapper2>
            <BodyText text="Acesso a fundos de investimento exclusivos" />
          </ul>
        </div>
        <div className="relative rounded-[8px] shrink-0 w-full">
          <div aria-hidden="true" className="absolute border-2 border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[8px]" />
          <div className="flex flex-col justify-center size-full">
            <div className="content-stretch flex flex-col gap-[10px] items-start justify-center leading-[normal] p-[24px] relative text-[#484848] w-full">
              <p className="font-['Open_Sans:Bold',sans-serif] font-bold relative shrink-0 text-[18px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                Sobre a empresa
              </p>
              <p className="font-['Funnel_Sans:Regular',sans-serif] not-italic relative shrink-0 text-[14px] w-full">O Grupo SBF é um grupo empresarial que controla as lojas Centauro, ByTennis, Almax Sports e, atualmente, firmou um acordo inédito com a Nike para expansão das lojas Nike Store no país. A empresa foi fundada em 1981, em Belo Horizonte, por Sebastião Bomfim Filho.</p>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Outras vagas">
          <p className="font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#484848] text-[18px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
            Outras vagas
          </p>
          <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
            <Wrapper7>
              <Text4 text="Analista de Marketing" />
              <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
                <Helper />
                <Helper1 />
              </div>
            </Wrapper7>
            <Wrapper7>
              <Text4 text="Sr. Back-End Engineer (Node.Js)" />
              <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
                <Helper2 />
                <Helper3 />
                <Helper />
              </div>
            </Wrapper7>
          </div>
          <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
            <Wrapper7>
              <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#1a1a1a] text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                Desenvolvedor(a) Full Stack
              </p>
              <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
                <Helper2 />
                <Helper3 />
                <Helper />
                <Helper1 />
              </div>
            </Wrapper7>
            <Wrapper7>
              <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#1a1a1a] text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                Gerente de RH
              </p>
              <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
                <Helper2 />
                <Helper3 />
              </div>
            </Wrapper7>
          </div>
        </div>
        <Wrapper1>
          <p className="font-['Red_Hat_Display:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#999] text-[14px] whitespace-pre">{`All rights reserved   |   © InHire 2022`}</p>
        </Wrapper1>
      </div>
    </div>
  );
}
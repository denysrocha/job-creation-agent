import imgImage3 from "figma:asset/54cc36155fa3e6f354151e3c419ab6d505dd71c2.png";

export function CandidateView() {
  return (
    <div className="bg-[#f2f2f2] w-full min-h-screen">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-8 items-start">
          {/* Coluna esquerda - Descrição da vaga */}
          <div className="flex flex-col gap-6 w-full">
            {/* Compartilhar vaga */}
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <p className="font-['Funnel_Sans:Regular',sans-serif] text-[#808080] text-[14px]">Compartilhar vaga:</p>
              <div className="flex gap-3">
                <div className="bg-[#4460a0] p-1 rounded-[4px] w-6 h-6 flex items-center justify-center cursor-pointer hover:opacity-80">
                  <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <div className="bg-[#0961B8] p-1 rounded-[4px] w-6 h-6 flex items-center justify-center cursor-pointer hover:opacity-80">
                  <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div className="bg-[#25d366] p-1 rounded-[4px] w-6 h-6 flex items-center justify-center cursor-pointer hover:opacity-80">
                  <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Título da vaga */}
            <h1 className="font-['Open_Sans:Bold',sans-serif] font-bold text-[#484848] text-4xl sm:text-5xl lg:text-[64px] leading-tight">
              Staff Infrastructure Engineer
            </h1>

            {/* Badge de localização */}
            <div className="bg-white flex gap-2 items-center p-6 rounded-lg shadow-md flex-wrap">
              <div className="flex items-center gap-1 pr-3 border-r border-gray-200">
                <svg className="w-4 h-4 text-[#808080]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-['Open_Sans:SemiBold',sans-serif] font-semibold text-[#808080] text-[12px]">Presencial</span>
              </div>
              <span className="font-['Open_Sans:SemiBold',sans-serif] font-semibold text-[#808080] text-[12px]">Salvador, Bahia, Brasil</span>
            </div>

            {/* Descrição */}
            <div className="space-y-6">
              <div>
                <h2 className="font-['Open_Sans:Bold',sans-serif] font-bold text-[#484848] text-[18px] mb-4">
                  Desafios da Vaga
                </h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">Atuar como SRE / Devops junto aos times de infraestrutura e desenvolvimento;</li>
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">Integrar os times de desenvolvimento e infraestrutura atuando ativamente para a melhor entrega do serviço ao cliente final;</li>
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">Garantir a velocidade de entrega dos ambientes e serviços, com melhor uso dos recursos computacionais, seguindo as recomendações e padrões de arquitetura de mercado;</li>
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">Auxiliar os times de desenvolvimento na entrega de produtos escaláveis, com alta-disponibilidade e performance, agregando valor ao negócio;</li>
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">Auxiliar os times de desenvolvimento no desenho de soluções de infraestrutura, garantindo padronização e melhor uso dos recursos computacionais;</li>
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">Atuar diretamente na redução de trabalho operacional através de automação de processos, provisionamento e utilização dos melhores serviços disponíveis;</li>
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">Automatizar e aplicar melhorias no processo de provisionamento e gestão de microserviços;</li>
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">Atuar na arquitetura, planejamento de escalabilidade, disponibilidade e performance de ambientes de orquestração de aplicações e containers;</li>
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">Atuar e evoluir o modelo de provisionamento de recursos em datacenters on-premisses, clouds Azure e AWS utilizando infraestrutura como código;</li>
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">Troubleshooting de problemas de performance e de implementações que impactem a infraestrutura e as aplicações;</li>
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">Evoluir e incentivar a cultura de Monitoring e Observability nas aplicações e infraestrutura.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-['Open_Sans:Bold',sans-serif] font-bold text-[#484848] text-[18px] mb-4">
                  Requisitos da Vaga
                </h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">Ter atuado diretamente com ambientes de missão crítica na área de Infraestrutura, sistemas operacionais e serviços;</li>
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">Perfil analítico, autodidata e foco em solução;</li>
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">APM;</li>
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">Automação;</li>
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">Banco de Dados NoSQL;</li>
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">CI/CD;</li>
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">Amazon Web Services (EC2, DynamoDB, ElastiCache, S3, RDS, ELB, ASG, IAM, CloudWatch, Config);</li>
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">Cloud Azure;</li>
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">Logs;</li>
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">Monitoria básica;</li>
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">Orquestração de serviços;</li>
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">Provisioning;</li>
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">Sistemas Operacional Linux;</li>
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">Sistemas Operacional Windows Server;</li>
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">Tecnologias de Mensageria – Fila;</li>
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">Fluência em Inglês;</li>
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">Conhecimento em Metodologias Ágeis;</li>
                </ul>
              </div>

              <div>
                <h2 className="font-['Open_Sans:Bold',sans-serif] font-bold text-[#484848] text-[18px] mb-4">
                  Benefícios
                </h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">Vale alimentação e refeição</li>
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">Plano de saúde</li>
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">Plano odontológico</li>
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">Gympass</li>
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">Zenklub</li>
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">Licença maternidade de 6 meses</li>
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">Licença paternidade de 20 dias</li>
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">Auxílio creche</li>
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">Trabalhe de onde quiser</li>
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">Mais liberdade, autonomia e flexibilidade no seu dia a dia.</li>
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">Auxílio trabalho remoto</li>
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">Mobília para equipar seu espaço de trabalho</li>
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">Escritórios físicos disponíveis para trabalho presencial em SP, RJ e BH</li>
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">XP Educação: descontos em cursos e módulos gratuitos</li>
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">Assessoria de investimentos</li>
                  <li className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-[20px]">Acesso a fundos de investimento exclusivos</li>
                </ul>
              </div>

              {/* Sobre a empresa */}
              <div className="border-2 border-[#e6e6e6] rounded-lg p-6">
                <h2 className="font-['Open_Sans:Bold',sans-serif] font-bold text-[#484848] text-[18px] mb-3">
                  Sobre a empresa
                </h2>
                <p className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px] leading-relaxed">
                  O Grupo SBF é um grupo empresarial que controla as lojas Centauro, ByTennis, Almax Sports e, atualmente, firmou um acordo inédito com a Nike para expansão das lojas Nike Store no país. A empresa foi fundada em 1981, em Belo Horizonte, por Sebastião Bomfim Filho.
                </p>
              </div>

              {/* Outras vagas */}
              <div>
                <h2 className="font-['Open_Sans:Bold',sans-serif] font-bold text-[#484848] text-[18px] mb-4">
                  Outras vagas
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-2">
                    <h3 className="font-['Open_Sans:SemiBold',sans-serif] font-semibold text-[#1a1a1a] text-[16px]">Analista de Marketing</h3>
                    <div className="flex flex-wrap gap-2 text-[12px]">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-[#808080]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        <span className="font-semibold text-[#808080]">Remoto</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-[#808080]">R$9.400,00</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-2">
                    <h3 className="font-['Open_Sans:SemiBold',sans-serif] font-semibold text-[#1a1a1a] text-[16px]">Sr. Back-End Engineer (Node.Js)</h3>
                    <div className="flex flex-wrap gap-2 text-[12px]">
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-[#808080]">Sênior</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-[#808080]">CLT</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-[#808080]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        <span className="font-semibold text-[#808080]">Remoto</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna direita - Formulário */}
          <div className="w-full min-w-[400px]">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="font-['Open_Sans:SemiBold',sans-serif] font-semibold text-[#484848] text-[18px] mb-4">
                Candidate-se para a vaga
              </h2>

              {/* Tabs */}
              <div className="flex mb-6 border-b-2 border-[#e6e6e6]">
                <div className="flex-1 pb-2 border-b-2 border-[#8a24ff] -mb-0.5">
                  <p className="font-['Open_Sans:Bold',sans-serif] font-bold text-[#8a24ff] text-[14px] text-center">1. Informações</p>
                </div>
                <div className="flex-1 pb-2">
                  <p className="font-['Open_Sans:Regular',sans-serif] text-[#333] text-[14px] text-center">2. Diversidade</p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="font-['Open_Sans:SemiBold',sans-serif] font-semibold text-[#484848] text-[14px] block mb-2">
                    Nome Completo *
                  </label>
                  <input 
                    type="text" 
                    placeholder="Nome" 
                    className="w-full border border-[#808080] rounded-lg p-3 text-[14px] text-[#808080] focus:outline-none focus:border-[#8a24ff]"
                  />
                </div>

                <div>
                  <label className="font-['Open_Sans:SemiBold',sans-serif] font-semibold text-[#484848] text-[14px] block mb-2">
                    CPF
                  </label>
                  <input 
                    type="text" 
                    placeholder="000.000.000-00" 
                    className="w-full border border-[#808080] rounded-lg p-3 text-[14px] text-[#808080] focus:outline-none focus:border-[#8a24ff]"
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <input type="checkbox" className="w-6 h-6 border-2 border-[#808080] rounded" />
                    <span className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px]">Não sou brasileiro</span>
                  </div>
                </div>

                <div>
                  <label className="font-['Open_Sans:SemiBold',sans-serif] font-semibold text-[#484848] text-[14px] block mb-2">
                    Seu melhor Email *
                  </label>
                  <input 
                    type="email" 
                    placeholder="Placeholder" 
                    className="w-full border border-[#808080] rounded-lg p-3 text-[14px] text-[#808080] focus:outline-none focus:border-[#8a24ff]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-['Open_Sans:SemiBold',sans-serif] font-semibold text-[#484848] text-[14px] block mb-2">
                      Celular
                    </label>
                    <select className="w-full border border-[#808080] rounded-lg p-3 text-[14px] text-[#808080] bg-white focus:outline-none focus:border-[#8a24ff]">
                      <option>SA +996</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <input 
                      type="text" 
                      placeholder="00 0 0000 0000" 
                      className="w-full border border-[#808080] rounded-lg p-3 text-[14px] text-[#808080] focus:outline-none focus:border-[#8a24ff]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-['Open_Sans:SemiBold',sans-serif] font-semibold text-[#484848] text-[14px] block mb-2">
                    Linkedin *
                  </label>
                  <input 
                    type="text" 
                    placeholder="https://linkedin.com/in/seu-perfil" 
                    className="w-full border border-[#808080] rounded-lg p-3 text-[14px] text-[#808080] focus:outline-none focus:border-[#8a24ff]"
                  />
                  <a href="#" className="font-['Open_Sans:Regular',sans-serif] text-[#8a24ff] text-[14px] underline mt-1 inline-block">
                    Obtenha o link do seu perfil do linkedin
                  </a>
                  <p className="font-['Open_Sans:Regular',sans-serif] text-[#808080] text-[12px] mt-1">
                    (copie e cole o link do seu perfil do LinkedIn no campo acima, que está presente no navegador)
                  </p>
                </div>

                <div>
                  <label className="font-['Open_Sans:SemiBold',sans-serif] font-semibold text-[#333] text-[14px] block mb-2">
                    País de origem
                  </label>
                  <select className="w-full border border-[#808080] rounded-lg p-3 text-[14px] text-[#808080] bg-white focus:outline-none focus:border-[#8a24ff]">
                    <option>Selecione o país</option>
                  </select>
                </div>

                <div>
                  <label className="font-['Open_Sans:SemiBold',sans-serif] font-semibold text-[#808080] text-[14px] block mb-2">
                    Cidade
                  </label>
                  <input 
                    type="text" 
                    placeholder="Informe sua cidade" 
                    className="w-full border border-[#808080] rounded-lg p-3 text-[14px] text-[#808080] bg-[#e6e6e6] focus:outline-none focus:border-[#8a24ff]"
                    disabled
                  />
                </div>

                <div>
                  <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold text-[#484848] text-[14px] mb-3">
                    Você tem disponibilidade para trabalhar no formato <span className="inline">híbrido em Salvador, Bahia, 2x por semana?</span>
                    <span className="text-[#8a24ff]"> *</span>
                  </p>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div className="w-6 h-6 rounded-full border-2 border-[#8a24ff] bg-white flex items-center justify-center">
                        <div className="w-3.5 h-3.5 rounded-full bg-[#a95eff]"></div>
                      </div>
                      <span className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px]">Sim</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div className="w-6 h-6 rounded-full border-2 border-[#808080]"></div>
                      <span className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px]">Não</span>
                    </label>
                  </div>
                </div>

                <div>
                  <p className="font-['Lato:Bold',sans-serif] text-[#484848] text-[16px] mb-2">Currículo</p>
                  <button className="w-full bg-[#f2e7fe] rounded-lg p-3 flex items-center justify-center gap-2 hover:bg-[#e6d5fc] transition-colors">
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 18 18">
                      <path d="M3 9h12M9 3v12" stroke="#8A24FF" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span className="font-['Open_Sans:Bold',sans-serif] font-bold text-[#8a24ff] text-[16px]">Anexar curriculo</span>
                  </button>
                  <div className="flex items-center gap-2 mt-2">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                      <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" stroke="#8A24FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="font-['Open_Sans:Bold',sans-serif] font-bold text-[#8a24ff] text-[14px]">Currículo Marcos.pdf</span>
                    <svg className="w-4 h-4 ml-auto" fill="#B3B3B3" viewBox="0 0 24 24">
                      <path d="M18 6L6 18M6 6l12 12" stroke="#B3B3B3" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>

                <div>
                  <label className="font-['Open_Sans:SemiBold',sans-serif] font-semibold text-[#484848] text-[14px] block mb-2">
                    Remuneração esperada
                  </label>
                  <input 
                    type="text" 
                    placeholder="R$ 0.000,00" 
                    className="w-full border border-[#808080] rounded-lg p-3 text-[14px] text-[#808080] focus:outline-none focus:border-[#8a24ff]"
                  />
                </div>

                <div>
                  <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold text-[#484848] text-[14px] mb-3">
                    Tipo de contrato
                  </p>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div className="w-6 h-6 rounded-full border-2 border-[#8a24ff] bg-white flex items-center justify-center">
                        <div className="w-3.5 h-3.5 rounded-full bg-[#a95eff]"></div>
                      </div>
                      <span className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px]">PJ</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div className="w-6 h-6 rounded-full border-2 border-[#808080]"></div>
                      <span className="font-['Funnel_Sans:Regular',sans-serif] text-[#484848] text-[14px]">CLT</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="font-['Open_Sans:SemiBold',sans-serif] font-semibold text-[#484848] text-[14px] block mb-2">
                    Foi indicado? Informe o email de quem indicou
                  </label>
                  <input 
                    type="email" 
                    placeholder="quem-me-indicou@empresa.com" 
                    className="w-full border border-[#808080] rounded-lg p-3 text-[14px] text-[#808080] focus:outline-none focus:border-[#8a24ff]"
                  />
                  <p className="font-['Open_Sans:Regular',sans-serif] text-[#808080] text-[12px] mt-1">
                    Forneça o email corporativo de quem o indicou
                  </p>
                </div>

                <button className="w-full bg-[#1a1a1a] text-white rounded-lg p-4 font-['Open_Sans:Bold',sans-serif] font-bold text-[16px] hover:bg-[#2a2a2a] transition-colors">
                  Avançar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
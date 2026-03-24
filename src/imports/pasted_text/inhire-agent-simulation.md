Ajuste a experiência do Agente InHire para simular a inteligência de distribuição de requisitos da vaga entre as ferramentas do processo seletivo. Como não há IA real por trás, todos os dados devem ser simulados via models — nenhum dado fixo no código.

---

## Models a criar

### `job_description`
Texto da JD que o usuário cola. Usado como base para todos os outros models.

```
{
  texto: string
}
```

---

### `requisitos`
Lista de requisitos extraídos da JD, cada um com sua classificação e destino.

```
[
  {
    id: string,
    descricao: string,
    tipo: "tecnico" | "comportamental" | "situacional" | "fato_objetivo",
    destinos: ["criterio_curriculo" | "formulario" | "scorecard" | "automacao"],
    justificativa: string,
    ambiguo: boolean
  }
]
```

O campo `justificativa` é o mais importante — ele será exibido pro usuário para mostrar a inteligência por trás da distribuição.

Exemplos de justificativa:
- *"Verificável no CV com alta confiabilidade — entra como critério de triagem."*
- *"CVs raramente detalham isso com precisão — uma pergunta direta é mais confiável."*
- *"Competência avaliável apenas na conversa — entra no scorecard da etapa de entrevista."*
- *"Requisito binário e eliminatório — entra como automação de reprovação."*
- *"Pode aparecer no CV mas frequentemente não aparece — entra nos dois para cruzar sinais."*

---

### `formulario`
Perguntas geradas para o formulário personalizado de inscrição.

```
[
  {
    id: string,
    requisito_id: string,
    pergunta: string,
    tipo: "dissertativa" | "multipla_escolha" | "sim_nao",
    opcoes: string[] | null,
    tem_gabarito: boolean,
    gabarito: string | null,
    justificativa: string
  }
]
```

O formulário é preenchido no momento da inscrição. As perguntas devem ser rápidas de responder — o candidato precisa conseguir responder tudo em menos de 2 minutos. Nunca usar perguntas dissertativas profundas ou comportamentais no formulário — essas pertencem ao scorecard e ao kit de entrevista.

**Tipos permitidos no formulário:**
- Sim/não com gabarito claro
- Múltipla escolha com resposta esperada
- Número ou faixa ("quantos anos de experiência com X?")
- Disponibilidade e restrições objetivas

**Nunca colocar no formulário:**
- "Descreva uma situação em que..."
- Qualquer pergunta comportamental profunda
- Perguntas que exigem reflexão ou contexto extenso
- Dissertativas sem gabarito

Exemplos de perguntas simuladas corretas:
- "Você tem disponibilidade para viagens nacionais com frequência mensal?" (sim/não, gabarito: sim)
- "Qual o seu nível de experiência com arquitetura de microsserviços?" (múltipla escolha: Básico / Intermediário / Avançado, gabarito: Avançado)
- "Você já trabalhou em empresas com mais de 500 funcionários?" (sim/não, sem gabarito)
- "Quantos anos de experiência você tem com liderança de times técnicos?" (múltipla escolha: Nenhuma / 1-2 anos / 3-5 anos / 5+ anos, gabarito: 3-5 anos ou 5+ anos)

---

### `criterios_curriculo`
Critérios usados pelo Agente de Triagem para analisar o currículo.

```
[
  {
    id: string,
    requisito_id: string,
    criterio: string,
    peso: "eliminatorio" | "alto" | "medio" | "baixo",
    justificativa: string
  }
]
```

Exemplos:
- "Possui 5+ anos de experiência com Java" — peso: alto
- "Tem experiência em empresas B2B SaaS" — peso: médio
- "Formação em Ciência da Computação ou áreas correlatas" — peso: baixo

---

### `scorecard`
Habilidades para avaliação humana nas entrevistas, vinculadas às etapas do processo.

```
[
  {
    id: string,
    requisito_id: string,
    habilidade: string,
    descricao: string,
    etapa: string,
    justificativa: string
  }
]
```

Exemplos:
- Habilidade: "Conhecimento em AWS" — Descrição: "Avaliar profundidade de conhecimento em serviços como EC2, S3, Lambda e RDS. Verificar se o candidato já operou em ambientes produtivos." — Etapa: Entrevista técnica
- Habilidade: "Comunicação com stakeholders" — Etapa: Entrevista cultural

---

### `kit_entrevista`
Roteiro de entrevista gerado a partir da JD e das etapas.

```
[
  {
    etapa: string,
    objetivo: string,
    perguntas_sugeridas: string[],
    scorecards_vinculados: string[]
  }
]
```

Exemplos de perguntas sugeridas:
- "Fale sobre um projeto onde você foi responsável pela arquitetura. Quais decisões técnicas foram mais difíceis?"
- "Como você estrutura a comunicação do time com a liderança em sprints de alta pressão?"

---

### `automacoes`
Regras de reprovação automática configuradas.

```
[
  {
    tipo: "salario" | "modelo_trabalho" | "formulario",
    ativo: boolean,
    parametro: string,
    justificativa: string
  }
]
```

---

### `distribuicao_resumo`
Model de apresentação — agrupa tudo para exibir ao usuário a visão sistêmica da distribuição.

```
{
  total_requisitos: number,
  criterios_curriculo: number,
  perguntas_formulario: number,
  habilidades_scorecard: number,
  automacoes: number,
  ambiguos_resolvidos: number,
  conflitos_evitados: string[]
}
```

O campo `conflitos_evitados` é especialmente importante para mostrar a inteligência do Agente. Exemplos:
- *"Salário não entrou como critério de triagem pois já existe automação de reprovação por faixa salarial."*
- *"Modelo de trabalho não entrou no formulário pois já é verificado na automação de aderência."*

---

## Experiência a prototipar

### 1. Entrada da JD
O usuário cola a JD. Não há perguntas antes — o Agente começa a processar imediatamente.

---

### 2. Tela de processamento — ajustar os textos

Substituir os textos genéricos atuais por textos que comuniquem a inteligência sistêmica:

**Remover:**
- "Extraindo descrição"
- "Observando vagas semelhantes"

**Usar:**
- "Lendo a job description..."
- "Identificando requisitos técnicos e comportamentais..."
- "Classificando o que é verificável no currículo..."
- "Identificando o que o currículo raramente detalha..."
- "Montando perguntas para o formulário de inscrição..."
- "Definindo habilidades para avaliação nas entrevistas..."
- "Gerando roteiro de entrevista por etapa..."
- "Verificando conflitos entre ferramentas..."
- "Ajustando critérios para evitar redundâncias..."
- "Distribuição concluída."

---

### 3. Resultado — visão sistêmica da distribuição

Após o processamento, antes dos cards da vaga, o Agente apresenta um painel de transparência mostrando como distribuiu os requisitos:

> "Analisei a job description e distribuí os requisitos entre as ferramentas para tornar o processo seletivo mais eficiente. Veja como ficou:"

Exibir um componente visual com:
- Número de critérios de análise de currículo
- Número de perguntas no formulário
- Número de habilidades no scorecard
- Automações configuradas
- Conflitos evitados (lista textual das justificativas do model `conflitos_evitados`)

Cada item clicável abre o detalhe daquela ferramenta com a lista completa e as justificativas de cada decisão.

---

### 4. Perguntas estruturais agrupadas

Após a visão da distribuição, o Agente apresenta as perguntas que dependem de decisão humana — não uma por uma, mas agrupadas num bloco visual inline:

> "Para finalizar a configuração, preciso de algumas informações:"

- Faixa salarial
- Modelo de trabalho
- Avaliadores responsáveis
- Gestor responsável
- Quer reprovar automaticamente candidatos fora da faixa salarial? (sim/não)
- Quer reprovar automaticamente candidatos que não aceitam o modelo de trabalho? (sim/não)

As duas últimas perguntas disparam ajuste no model `distribuicao_resumo` — se o usuário ativar a automação de salário, o sistema remove salário dos critérios de triagem e exibe o conflito evitado correspondente.

---

## Diretrizes gerais

- Todos os dados simulados devem estar nos models, nunca no código diretamente
- A justificativa de cada decisão deve estar sempre visível ou acessível com um clique
- O tom do Agente deve ser direto, transparente e educativo — ele não só faz, ele explica o porquê
- A experiência deve comunicar ao recrutador que o processo seletivo foi montado de forma inteligente, não aleatória
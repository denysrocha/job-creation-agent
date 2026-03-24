Três ajustes no protótipo do Agente InHire.

---

## 1. Ordem dos botões de entrada

Alterar a ordem dos três botões da mensagem inicial do agente para:

1. **Começar por uma requisição** ← primeiro e mais destacado
2. **Duplicar vaga existente**
3. **Criar do zero** ← menos destacado visualmente

O botão "Criar do zero" deve ter menor destaque visual em relação aos outros dois — por exemplo, sem borda ou com cor mais apagada. O objetivo é estimular o usuário a usar requisição ou duplicação, que são os caminhos mais completos para clientes que já passaram pela implementação.

---

## 2. Layout do painel esquerdo — dois estados

O painel esquerdo tem dois estados distintos dependendo do momento da jornada.

### Antes do BUM

Exibir apenas:

```
Informações obrigatórias
□ Título
□ Descrição
□ Área
□ Cliente
□ Notas internas
□ Recrutador responsável
□ Senioridade
□ Avaliadores responsáveis
□ Gestor responsável
□ SLA
□ Posições
□ Faixa salarial
□ Localização
□ Modelo de trabalho
□ Campos personalizados
□ Requisição
```

Cada campo recebe check verde com o valor preenchido conforme é coletado. Sem barra de qualidade, sem recursos — o painel é simples e focado.

### Depois do BUM

O painel muda completamente de estrutura:

```
Qualidade da vaga   63%
[barra de progresso colorida]
Vagas acima de 80% contratam 2x mais rápido.

[botão] Recursos configurados  ✦ 4 recursos prontos →

────────────────────────────────

Informações obrigatórias
✓ Título: Eng. Frontend Sênior
✓ Descrição: ...
✓ Área: Tecnologia
□ Cliente
□ Notas internas
✓ Recrutador responsável: Augusto
✓ Senioridade: Sênior
□ Avaliadores responsáveis
□ Gestor responsável
□ SLA
✓ Posições: 2 — Aumento de quadro
✓ Faixa salarial: R$ 12k – R$ 16k
✓ Localização: São Paulo, SP
□ Modelo de trabalho
□ Campos personalizados
□ Requisição
```

**Cálculo da qualidade:** baseado na combinação de campos preenchidos + recursos configurados. Não é só contagem de campos.

**Cor da barra e do percentual:**
- Abaixo de 50% → vermelho (#E24B4A)
- Entre 50% e 79% → âmbar (#BA7517)
- 80% ou mais → verde (#1D9E75)

### Painel direito — Recursos configurados

O painel direito exibe os recursos gerados pelo Agente após o processamento da job description. Esses são os mesmos recursos que hoje aparecem no chat como cards após o BUM — **eles devem sair do chat e passar a viver exclusivamente no painel direito.**

O painel direito **abre automaticamente** assim que o BUM acontece, exibindo os 4 cards de recursos:
- Critérios de currículo (com número e descrição)
- Perguntas no formulário (com número e descrição)
- Kits de entrevista e scorecards (com número e descrição)
- Agente na triagem (com número e descrição)
- Nota de requisitos ambíguos ao final

O usuário pode fechar o painel direito clicando no X. Depois de fechado, pode reabri-lo clicando no botão "Recursos configurados" no painel esquerdo.

**No chat**, após o BUM, o agente envia apenas chips de acesso rápido aos recursos (ex: `Formulário ↗`, `Scorecard ↗`, `Critérios ↗`, `Triagem ↗`). Clicar em qualquer chip reabre o painel direito. Os cards de recursos completos não aparecem mais no corpo do chat.

**Botão "Recursos configurados" no painel esquerdo:** ao clicar, abre o painel direito. Quando o painel esquerdo está colapsado, esse botão vira apenas o ícone com fundo roxo suave (#EEEDFE), sem borda.

### Estado colapsado do painel esquerdo

Quando o usuário recolhe o painel, exibir apenas:

- O percentual de qualidade (mesmo tamanho de fonte que no estado expandido, colorido conforme o nível)
- O ícone de recursos configurados (fundo #EEEDFE, sem borda)
- O botão de expandir fixo no rodapé do painel

**Nada mais deve aparecer no estado colapsado.** Nenhum texto, nenhuma lista de campos, nenhuma barra.

O botão de expandir/recolher fica sempre no rodapé do painel, na mesma posição independente do estado.

---

## 3. Copy da segunda interação do agente — ser mais enfático

Na segunda rodada, após o usuário enviar a primeira mensagem com a descrição da vaga, o agente pede informações complementares. Substituir o texto atual por uma versão mais direta e enfática, que deixe claro o impacto de fornecer mais informações na qualidade da vaga:

**Texto atual (remover):**
> "Se não tiver tudo isso agora, tudo bem — é só me falar para prosseguir."

**Novo texto:**
> "Boa! Já extraí o título, senioridade e os principais requisitos. Para montar um processo seletivo de verdade, preciso também de: **faixa salarial e tipo de contrato, localização, modelo de trabalho e número de posições**. Cada informação que você me der agora aumenta diretamente a qualidade da vaga — e vagas mais completas contratam mais rápido. Me manda o que tiver, do jeito que for mais fácil."

O objetivo é influenciar o usuário a fornecer o máximo de informações possível, sem dar uma saída fácil para pular essa etapa. Não oferecer botão de "prosseguir sem essas informações".
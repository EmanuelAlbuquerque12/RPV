# 📊 Dashboard de RPVs (Requisições de Pequeno Valor)

Sistema completo de análise e monitoramento de Requisições de Pequeno Valor com interface moderna e intuitiva.

## 🚀 Características

- ✅ Carregamento de múltiplos arquivos CSV
- 📈 Estatísticas em tempo real
- 🔍 Sistema de filtros avançados
- 📊 Gráficos interativos (Chart.js)
- 📑 Tabela responsiva com paginação
- 💾 Exportação de dados (CSV/Excel)
- 🎨 Design moderno e responsivo
- 📱 Compatível com dispositivos móveis

## 📋 Funcionalidades

### Estatísticas Principais
- **RPVs Expedidas**: Total de requisições expedidas
- **RPVs Depositadas**: Total de requisições depositadas
- **RPVs Levantadas**: Total de requisições levantadas
- **Exequentes**: Número de exequentes únicos
- **Processos**: Total de processos
- **Grupos**: Quantidade de grupos diferentes

### Filtros Disponíveis
- Filtro por Sindicato
- Filtro por Status (Expedida, Depositada, Levantada)
- Filtro por Exequente
- Filtro por Número de Processo
- Filtro por Grupo
- Filtro por Período (Data Início/Fim)

### Visualizações
- Gráfico de RPVs por Status (pizza)
- Gráfico de RPVs por Sindicato (barras)
- Gráfico de RPVs por Grupo (barras)
- Gráfico de Timeline (linha temporal)

### Tabela de Dados
- Visualização completa dos dados
- Ordenação por colunas (clique no cabeçalho)
- Busca em tempo real
- Paginação (50 registros por página)
- Badges de status coloridos
- Formatação monetária automática

## 🛠️ Como Usar

### 1. Abrir o Dashboard
Basta abrir o arquivo `index.html` em qualquer navegador moderno:
```bash
# Se tiver um servidor local
python -m http.server 8000
# Ou simplesmente abra o arquivo diretamente no navegador
```

### 2. Carregar Arquivos CSV
1. Clique no botão **"📁 Carregar Arquivos CSV"**
2. Selecione um ou mais arquivos CSV
3. Os dados serão processados automaticamente

### 3. Formato do CSV

O sistema aceita CSVs com as seguintes colunas (flexível com nomes):

```csv
Processo,Exequente,Sindicato,Grupo,Status,Valor,Data
0001234-56.2023.5.01.0001,João Silva,SINDICATO DOS METALÚRGICOS,Grupo A,Expedida,R$ 5.420,00,15/01/2023
```

**Colunas suportadas:**
- `Processo` ou `Nº Processo` ou `Número do Processo`
- `Exequente` ou `Nome do Exequente`
- `Sindicato`
- `Grupo`
- `Status` (valores: Expedida, Depositada, Levantada)
- `Valor` (formato monetário)
- `Data` (formatos: DD/MM/YYYY, YYYY-MM-DD, DD-MM-YYYY)

**Observações:**
- O sistema detecta automaticamente os nomes das colunas (case-insensitive)
- Suporta separadores: vírgula (,) ou ponto-e-vírgula (;)
- Suporta valores entre aspas

### 4. Aplicar Filtros
1. Selecione os filtros desejados
2. Clique em **"Aplicar Filtros"**
3. Os dados e gráficos serão atualizados automaticamente
4. Use **"Limpar"** para remover todos os filtros

### 5. Buscar na Tabela
- Digite qualquer termo na caixa de busca
- A busca é realizada em todas as colunas
- Funciona em tempo real

### 6. Ordenar Dados
- Clique no cabeçalho da coluna desejada
- Clique novamente para inverter a ordem

### 7. Exportar Dados
- **📥 Exportar CSV**: Exporta os dados filtrados em formato CSV
- **📊 Exportar Excel**: Exporta em formato compatível com Excel

## 📁 Estrutura de Arquivos

```
RPV/
├── index.html          # Página principal
├── styles.css          # Estilos do dashboard
├── app.js              # Lógica JavaScript
├── README.md           # Este arquivo
└── exemplos/           # Arquivos CSV de exemplo
    ├── rpv_2023.csv
    ├── rpv_2024.csv
    └── rpv_pendentes.csv
```

## 🎨 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Design moderno com gradientes e animações
- **JavaScript (ES6+)**: Lógica de processamento
- **Chart.js 4.4.0**: Biblioteca de gráficos
- **Responsive Design**: Mobile-first approach

## 📊 Exemplos de Uso

### Carregar Múltiplos CSVs
O sistema permite carregar vários arquivos CSV de uma vez:
- Selecione múltiplos arquivos (Ctrl+Click ou Shift+Click)
- Todos os dados serão consolidados
- Ideal para análise de diferentes períodos

### Análise por Sindicato
1. Use o filtro "Sindicato" para selecionar um específico
2. Veja as estatísticas atualizadas
3. Analise o gráfico de distribuição

### Análise Temporal
1. Use os filtros "Data Início" e "Data Fim"
2. Observe o gráfico de Timeline
3. Identifique tendências ao longo do tempo

### Busca de Processo Específico
1. Digite o número do processo na busca da tabela
2. Ou use o filtro "Nº Processo"
3. Visualize os detalhes completos

## 🔧 Personalização

### Alterar Cores
Edite as variáveis CSS no arquivo `styles.css`:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #7c3aed;
    --success-color: #10b981;
    /* ... outras cores */
}
```

### Ajustar Itens por Página
No arquivo `app.js`, altere a constante:
```javascript
const itemsPerPage = 50; // Altere para o número desejado
```

### Adicionar Novos Campos
1. Adicione a coluna no CSV
2. O sistema detectará automaticamente
3. Adicione na tabela HTML se necessário

## 📱 Compatibilidade

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers

## 🐛 Resolução de Problemas

### Os dados não aparecem
- Verifique se o CSV está no formato correto
- Confirme que as colunas têm nomes reconhecíveis
- Verifique o console do navegador (F12) para erros

### Gráficos não carregam
- Certifique-se de ter conexão com internet (Chart.js é carregado via CDN)
- Verifique se JavaScript está habilitado

### Filtros não funcionam
- Limpe os filtros e tente novamente
- Recarregue os arquivos CSV
- Atualize a página (F5)

## 📝 Notas Importantes

- Os dados são processados localmente no navegador
- Nenhuma informação é enviada para servidores externos
- Os arquivos CSV devem estar em UTF-8 para caracteres especiais
- O sistema suporta milhares de registros sem problemas de performance

## 🤝 Contribuindo

Para adicionar novas funcionalidades:
1. Modifique `index.html` para estrutura
2. Adicione estilos em `styles.css`
3. Implemente lógica em `app.js`

## 📄 Licença

Este projeto é de uso livre para fins educacionais e profissionais.

## 📞 Suporte

Para dúvidas ou problemas:
- Verifique a documentação acima
- Consulte os exemplos na pasta `exemplos/`
- Analise o código comentado

---

**Desenvolvido com ❤️ para facilitar a gestão de RPVs**

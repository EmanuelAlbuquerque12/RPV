# 📊 Dashboard de RPVs (Requisições de Pequeno Valor)

Sistema completo de análise e monitoramento de Requisições de Pequeno Valor com interface moderna e intuitiva.

## 🚀 Características

- ✅ Carregamento de múltiplos arquivos CSV e Excel (.xls, .xlsx)
- 📋 Suporte a múltiplas abas do Excel (até 100 abas)
- 📈 Estatísticas em tempo real
- 🔍 Sistema de filtros avançados
- 📊 Gráficos interativos (Chart.js)
- 📑 Tabela responsiva com paginação
- 💾 Exportação de dados (CSV/Excel XLSX)
- 🎨 Design moderno e responsivo
- 📱 Compatível com dispositivos móveis
- 🚦 Validação de limites (100 arquivos, 100 abas)

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

### 2. Carregar Arquivos CSV ou Excel
1. Clique no botão **"📁 Carregar Arquivos (CSV/Excel)"**
2. Selecione um ou mais arquivos CSV, XLS ou XLSX
3. Os dados serão processados automaticamente
4. Se houver múltiplas abas no Excel, todas serão processadas (limite de 100 abas)
5. O sistema mostrará quantas abas foram processadas e quantos registros cada uma possui

**Limites de Importação:**
- Máximo de 100 arquivos por vez
- Máximo de 100 abas (somando todos os arquivos Excel)
- Arquivos suportados: .csv, .xls, .xlsx

### 3. Formato dos Arquivos

#### CSV

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

**Observações CSV:**
- O sistema detecta automaticamente os nomes das colunas (case-insensitive)
- Suporta separadores: vírgula (,) ou ponto-e-vírgula (;)
- Suporta valores entre aspas

#### Excel (XLS/XLSX)

O sistema processa arquivos Excel automaticamente:

**Características:**
- Processa todas as abas automaticamente (máximo 100 abas por sessão)
- A primeira linha de cada aba deve conter os cabeçalhos
- Usa as mesmas colunas do formato CSV
- Linhas em branco são ignoradas
- Todas as células são convertidas para texto

**Exemplo de estrutura Excel:**

| Processo | Exequente | Sindicato | Grupo | Status | Valor | Data |
|----------|-----------|-----------|-------|--------|-------|------|
| 0001234-56.2023.5.01.0001 | João Silva | SINDICATO DOS METALÚRGICOS | Grupo A | Expedida | R$ 5.420,00 | 15/01/2023 |

**Múltiplas Abas:**
- Cada aba pode ter uma estrutura diferente, desde que contenha as colunas necessárias
- Os dados de todas as abas são consolidados em um único conjunto
- O sistema exibe informações sobre cada aba processada
- Útil para organizar RPVs por período, sindicato ou status

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
- **📊 Exportar Excel**: Exporta em formato XLSX (Excel nativo) com formatação

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
- **SheetJS (xlsx) 0.18.5**: Processamento de arquivos Excel
- **Responsive Design**: Mobile-first approach

## 📊 Exemplos de Uso

### Carregar Múltiplos Arquivos
O sistema permite carregar vários arquivos de uma vez:
- Selecione múltiplos arquivos CSV e/ou Excel (Ctrl+Click ou Shift+Click)
- Todos os dados serão consolidados automaticamente
- Arquivos Excel com múltiplas abas são processados completamente
- Ideal para análise de diferentes períodos ou departamentos

### Trabalhar com Excel Multi-Abas
Organize seus dados em abas diferentes:
- **Aba "2023"**: RPVs do ano de 2023
- **Aba "2024"**: RPVs do ano de 2024
- **Aba "Pendentes"**: RPVs em processamento
- Todas as abas serão processadas e consolidadas automaticamente

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
- Verifique se o arquivo está no formato correto (CSV, XLS ou XLSX)
- Confirme que as colunas têm nomes reconhecíveis
- Para Excel: certifique-se que a primeira linha contém os cabeçalhos
- Verifique o console do navegador (F12) para erros

### Erro ao carregar arquivos Excel
- Certifique-se de ter conexão com internet (SheetJS é carregado via CDN)
- Verifique se o arquivo não está corrompido
- Tente abrir o arquivo no Excel/LibreOffice para confirmar integridade
- Verifique se não excedeu o limite de 100 abas

### Limite de arquivos/abas excedido
- Reduza o número de arquivos selecionados (máximo 100)
- Se usar Excel com muitas abas, divida em múltiplos arquivos menores
- O sistema interrompe o processamento ao atingir o limite

### Gráficos não carregam
- Certifique-se de ter conexão com internet (Chart.js e SheetJS são carregados via CDN)
- Verifique se JavaScript está habilitado

### Filtros não funcionam
- Limpe os filtros e tente novamente
- Recarregue os arquivos
- Atualize a página (F5)

### Abas do Excel não são processadas
- Verifique se cada aba tem cabeçalhos na primeira linha
- Certifique-se que as abas não estão vazias
- Abas ocultas também são processadas

## 📝 Notas Importantes

- Os dados são processados localmente no navegador
- Nenhuma informação é enviada para servidores externos
- Os arquivos CSV devem estar em UTF-8 para caracteres especiais
- Arquivos Excel são lidos diretamente no navegador sem uploads
- O sistema suporta milhares de registros sem problemas de performance
- Todas as abas de arquivos Excel são processadas automaticamente
- Limites: 100 arquivos e 100 abas no total por sessão

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

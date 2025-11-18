// Estado global da aplicação
let allData = [];
let filteredData = [];
let currentPage = 1;
const itemsPerPage = 50;
let charts = {};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    updateLastUpdate();
});

// Configurar event listeners
function setupEventListeners() {
    document.getElementById('csvFiles').addEventListener('change', handleFileUpload);
    document.getElementById('btnAplicarFiltros').addEventListener('click', applyFilters);
    document.getElementById('btnLimparFiltros').addEventListener('click', clearFilters);
    document.getElementById('searchTable').addEventListener('input', debounce(searchTable, 300));
    document.getElementById('btnExportCSV').addEventListener('click', exportToCSV);
    document.getElementById('btnExportExcel').addEventListener('click', exportToExcel);
    document.getElementById('btnPrevPage').addEventListener('click', () => changePage(-1));
    document.getElementById('btnNextPage').addEventListener('click', () => changePage(1));
}

// Manipular upload de arquivos CSV
async function handleFileUpload(event) {
    const files = event.target.files;
    if (files.length === 0) return;

    document.getElementById('fileCount').textContent = `Carregando ${files.length} arquivo(s)...`;
    allData = [];

    try {
        for (let file of files) {
            const data = await readCSV(file);
            allData = allData.concat(data);
        }

        document.getElementById('fileCount').textContent =
            `${files.length} arquivo(s) carregado(s) - ${allData.length} registros`;

        filteredData = [...allData];
        updateDashboard();
        updateLastUpdate();
    } catch (error) {
        console.error('Erro ao carregar arquivos:', error);
        alert('Erro ao carregar arquivos CSV. Verifique o formato dos arquivos.');
    }
}

// Ler arquivo CSV
function readCSV(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const text = e.target.result;
                const data = parseCSV(text);
                resolve(data);
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = () => reject(reader.error);
        reader.readAsText(file, 'UTF-8');
    });
}

// Parser CSV
function parseCSV(text) {
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length === 0) return [];

    const headers = lines[0].split(/[,;]/).map(h => h.trim().replace(/['"]/g, ''));
    const data = [];

    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        if (values.length === headers.length) {
            const obj = {};
            headers.forEach((header, index) => {
                obj[header] = values[index].trim();
            });
            data.push(obj);
        }
    }

    return data;
}

// Parser de linha CSV (suporta vírgulas dentro de aspas)
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
            inQuotes = !inQuotes;
        } else if ((char === ',' || char === ';') && !inQuotes) {
            result.push(current);
            current = '';
        } else {
            current += char;
        }
    }

    result.push(current);
    return result.map(v => v.replace(/['"]/g, ''));
}

// Atualizar dashboard completo
function updateDashboard() {
    populateFilters();
    updateStatistics();
    updateCharts();
    updateTable();
}

// Popular filtros dinâmicos
function populateFilters() {
    const sindicatos = [...new Set(allData.map(item => getFieldValue(item, 'sindicato')).filter(Boolean))].sort();
    const grupos = [...new Set(allData.map(item => getFieldValue(item, 'grupo')).filter(Boolean))].sort();

    populateSelect('filterSindicato', sindicatos);
    populateSelect('filterGrupo', grupos);
}

// Popular select
function populateSelect(selectId, options) {
    const select = document.getElementById(selectId);
    const currentValue = select.value;

    select.innerHTML = '<option value="">Todos</option>';
    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        select.appendChild(opt);
    });

    if (currentValue) select.value = currentValue;
}

// Obter valor do campo (case-insensitive)
function getFieldValue(item, fieldName) {
    const keys = Object.keys(item);
    const key = keys.find(k => k.toLowerCase().includes(fieldName.toLowerCase()));
    return key ? item[key] : '';
}

// Aplicar filtros
function applyFilters() {
    const filterSindicato = document.getElementById('filterSindicato').value.toLowerCase();
    const filterStatus = document.getElementById('filterStatus').value.toLowerCase();
    const filterExequente = document.getElementById('filterExequente').value.toLowerCase();
    const filterProcesso = document.getElementById('filterProcesso').value.toLowerCase();
    const filterGrupo = document.getElementById('filterGrupo').value.toLowerCase();
    const filterDataInicio = document.getElementById('filterDataInicio').value;
    const filterDataFim = document.getElementById('filterDataFim').value;

    filteredData = allData.filter(item => {
        const sindicato = getFieldValue(item, 'sindicato').toLowerCase();
        const status = getFieldValue(item, 'status').toLowerCase();
        const exequente = getFieldValue(item, 'exequente').toLowerCase();
        const processo = getFieldValue(item, 'processo').toLowerCase();
        const grupo = getFieldValue(item, 'grupo').toLowerCase();
        const data = getFieldValue(item, 'data');

        if (filterSindicato && !sindicato.includes(filterSindicato)) return false;
        if (filterStatus && !status.includes(filterStatus)) return false;
        if (filterExequente && !exequente.includes(filterExequente)) return false;
        if (filterProcesso && !processo.includes(filterProcesso)) return false;
        if (filterGrupo && !grupo.includes(filterGrupo)) return false;

        if (filterDataInicio && data) {
            const dataItem = parseDate(data);
            const dataInicio = new Date(filterDataInicio);
            if (dataItem < dataInicio) return false;
        }

        if (filterDataFim && data) {
            const dataItem = parseDate(data);
            const dataFim = new Date(filterDataFim);
            if (dataItem > dataFim) return false;
        }

        return true;
    });

    currentPage = 1;
    updateStatistics();
    updateCharts();
    updateTable();
}

// Limpar filtros
function clearFilters() {
    document.getElementById('filterSindicato').value = '';
    document.getElementById('filterStatus').value = '';
    document.getElementById('filterExequente').value = '';
    document.getElementById('filterProcesso').value = '';
    document.getElementById('filterGrupo').value = '';
    document.getElementById('filterDataInicio').value = '';
    document.getElementById('filterDataFim').value = '';
    document.getElementById('searchTable').value = '';

    filteredData = [...allData];
    currentPage = 1;
    updateStatistics();
    updateCharts();
    updateTable();
}

// Atualizar estatísticas
function updateStatistics() {
    const expedidas = filteredData.filter(item =>
        getFieldValue(item, 'status').toLowerCase().includes('expedida')).length;
    const depositadas = filteredData.filter(item =>
        getFieldValue(item, 'status').toLowerCase().includes('depositada')).length;
    const levantadas = filteredData.filter(item =>
        getFieldValue(item, 'status').toLowerCase().includes('levantada')).length;

    const exequentesUnicos = new Set(
        filteredData.map(item => getFieldValue(item, 'exequente')).filter(Boolean)
    ).size;

    const processosUnicos = new Set(
        filteredData.map(item => getFieldValue(item, 'processo')).filter(Boolean)
    ).size;

    const gruposUnicos = new Set(
        filteredData.map(item => getFieldValue(item, 'grupo')).filter(Boolean)
    ).size;

    animateNumber('statExpedidas', expedidas);
    animateNumber('statDepositadas', depositadas);
    animateNumber('statLevantadas', levantadas);
    animateNumber('statExequentes', exequentesUnicos);
    animateNumber('statProcessos', processosUnicos);
    animateNumber('statGrupos', gruposUnicos);
}

// Animar números
function animateNumber(elementId, targetValue) {
    const element = document.getElementById(elementId);
    const currentValue = parseInt(element.textContent) || 0;
    const increment = Math.ceil((targetValue - currentValue) / 20);

    let current = currentValue;
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= targetValue) || (increment < 0 && current <= targetValue)) {
            current = targetValue;
            clearInterval(timer);
        }
        element.textContent = current.toLocaleString('pt-BR');
    }, 30);
}

// Atualizar gráficos
function updateCharts() {
    updateStatusChart();
    updateSindicatoChart();
    updateGrupoChart();
    updateTimelineChart();
}

// Gráfico de Status
function updateStatusChart() {
    const ctx = document.getElementById('chartStatus');

    const expedidas = filteredData.filter(item =>
        getFieldValue(item, 'status').toLowerCase().includes('expedida')).length;
    const depositadas = filteredData.filter(item =>
        getFieldValue(item, 'status').toLowerCase().includes('depositada')).length;
    const levantadas = filteredData.filter(item =>
        getFieldValue(item, 'status').toLowerCase().includes('levantada')).length;

    if (charts.status) charts.status.destroy();

    charts.status = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Expedidas', 'Depositadas', 'Levantadas'],
            datasets: [{
                data: [expedidas, depositadas, levantadas],
                backgroundColor: ['#2563eb', '#f59e0b', '#10b981'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Gráfico de Sindicato
function updateSindicatoChart() {
    const ctx = document.getElementById('chartSindicato');

    const sindicatos = {};
    filteredData.forEach(item => {
        const sindicato = getFieldValue(item, 'sindicato') || 'Não informado';
        sindicatos[sindicato] = (sindicatos[sindicato] || 0) + 1;
    });

    const sortedSindicatos = Object.entries(sindicatos)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    if (charts.sindicato) charts.sindicato.destroy();

    charts.sindicato = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sortedSindicatos.map(s => s[0]),
            datasets: [{
                label: 'Quantidade de RPVs',
                data: sortedSindicatos.map(s => s[1]),
                backgroundColor: '#7c3aed',
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    }
                }
            }
        }
    });
}

// Gráfico de Grupo
function updateGrupoChart() {
    const ctx = document.getElementById('chartGrupo');

    const grupos = {};
    filteredData.forEach(item => {
        const grupo = getFieldValue(item, 'grupo') || 'Não informado';
        grupos[grupo] = (grupos[grupo] || 0) + 1;
    });

    const sortedGrupos = Object.entries(grupos)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    if (charts.grupo) charts.grupo.destroy();

    charts.grupo = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sortedGrupos.map(g => g[0]),
            datasets: [{
                label: 'Quantidade de RPVs',
                data: sortedGrupos.map(g => g[1]),
                backgroundColor: '#f43f5e',
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    }
                }
            }
        }
    });
}

// Gráfico de Timeline
function updateTimelineChart() {
    const ctx = document.getElementById('chartTimeline');

    const timeline = {};
    filteredData.forEach(item => {
        const data = getFieldValue(item, 'data');
        if (data) {
            const date = parseDate(data);
            if (date) {
                const month = `${date.getMonth() + 1}/${date.getFullYear()}`;
                timeline[month] = (timeline[month] || 0) + 1;
            }
        }
    });

    const sortedTimeline = Object.entries(timeline)
        .sort((a, b) => {
            const [monthA, yearA] = a[0].split('/');
            const [monthB, yearB] = b[0].split('/');
            return new Date(yearA, monthA - 1) - new Date(yearB, monthB - 1);
        });

    if (charts.timeline) charts.timeline.destroy();

    charts.timeline = new Chart(ctx, {
        type: 'line',
        data: {
            labels: sortedTimeline.map(t => t[0]),
            datasets: [{
                label: 'RPVs por mês',
                data: sortedTimeline.map(t => t[1]),
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    }
                }
            }
        }
    });
}

// Atualizar tabela
function updateTable() {
    const tbody = document.getElementById('tableBody');

    if (filteredData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="no-data">Nenhum dado encontrado</td></tr>';
        updatePagination();
        return;
    }

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageData = filteredData.slice(start, end);

    tbody.innerHTML = pageData.map(item => {
        const processo = getFieldValue(item, 'processo') || '-';
        const exequente = getFieldValue(item, 'exequente') || '-';
        const sindicato = getFieldValue(item, 'sindicato') || '-';
        const grupo = getFieldValue(item, 'grupo') || '-';
        const status = getFieldValue(item, 'status') || '-';
        const valor = getFieldValue(item, 'valor');
        const data = getFieldValue(item, 'data') || '-';

        const statusClass = status.toLowerCase().includes('expedida') ? 'status-expedida' :
                           status.toLowerCase().includes('depositada') ? 'status-depositada' :
                           status.toLowerCase().includes('levantada') ? 'status-levantada' : '';

        const valorFormatado = valor ? formatCurrency(parseFloat(valor.replace(/[^\d,.-]/g, '').replace(',', '.'))) : '-';

        return `
            <tr>
                <td>${processo}</td>
                <td>${exequente}</td>
                <td>${sindicato}</td>
                <td>${grupo}</td>
                <td><span class="status-badge ${statusClass}">${status}</span></td>
                <td class="valor-cell">${valorFormatado}</td>
                <td>${data}</td>
            </tr>
        `;
    }).join('');

    updatePagination();
}

// Atualizar paginação
function updatePagination() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    document.getElementById('pageInfo').textContent =
        `Página ${currentPage} de ${totalPages || 1} (${filteredData.length} registros)`;

    document.getElementById('btnPrevPage').disabled = currentPage === 1;
    document.getElementById('btnNextPage').disabled = currentPage >= totalPages;
}

// Mudar página
function changePage(direction) {
    currentPage += direction;
    updateTable();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Buscar na tabela
function searchTable() {
    const searchTerm = document.getElementById('searchTable').value.toLowerCase();

    if (!searchTerm) {
        applyFilters();
        return;
    }

    filteredData = allData.filter(item => {
        return Object.values(item).some(value =>
            value.toString().toLowerCase().includes(searchTerm)
        );
    });

    currentPage = 1;
    updateStatistics();
    updateCharts();
    updateTable();
}

// Ordenar tabela
let sortDirection = {};
function sortTable(columnIndex) {
    const fields = ['processo', 'exequente', 'sindicato', 'grupo', 'status', 'valor', 'data'];
    const field = fields[columnIndex];

    sortDirection[field] = !sortDirection[field];

    filteredData.sort((a, b) => {
        let valA = getFieldValue(a, field);
        let valB = getFieldValue(b, field);

        if (field === 'valor') {
            valA = parseFloat(valA.replace(/[^\d,.-]/g, '').replace(',', '.')) || 0;
            valB = parseFloat(valB.replace(/[^\d,.-]/g, '').replace(',', '.')) || 0;
        } else if (field === 'data') {
            valA = parseDate(valA) || new Date(0);
            valB = parseDate(valB) || new Date(0);
        }

        if (valA < valB) return sortDirection[field] ? -1 : 1;
        if (valA > valB) return sortDirection[field] ? 1 : -1;
        return 0;
    });

    updateTable();
}

// Exportar para CSV
function exportToCSV() {
    if (filteredData.length === 0) {
        alert('Nenhum dado para exportar');
        return;
    }

    const headers = ['Processo', 'Exequente', 'Sindicato', 'Grupo', 'Status', 'Valor', 'Data'];
    const csvContent = [
        headers.join(','),
        ...filteredData.map(item => [
            getFieldValue(item, 'processo'),
            getFieldValue(item, 'exequente'),
            getFieldValue(item, 'sindicato'),
            getFieldValue(item, 'grupo'),
            getFieldValue(item, 'status'),
            getFieldValue(item, 'valor'),
            getFieldValue(item, 'data')
        ].map(v => `"${v}"`).join(','))
    ].join('\n');

    downloadFile(csvContent, 'rpv-export.csv', 'text/csv');
}

// Exportar para Excel (formato CSV compatível)
function exportToExcel() {
    exportToCSV();
}

// Download de arquivo
function downloadFile(content, filename, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Utilidades
function parseDate(dateStr) {
    if (!dateStr) return null;

    // Tenta vários formatos
    const formats = [
        /(\d{2})\/(\d{2})\/(\d{4})/,  // DD/MM/YYYY
        /(\d{4})-(\d{2})-(\d{2})/,     // YYYY-MM-DD
        /(\d{2})-(\d{2})-(\d{4})/      // DD-MM-YYYY
    ];

    for (let format of formats) {
        const match = dateStr.match(format);
        if (match) {
            if (format === formats[0] || format === formats[2]) {
                return new Date(match[3], match[2] - 1, match[1]);
            } else {
                return new Date(match[1], match[2] - 1, match[3]);
            }
        }
    }

    return new Date(dateStr);
}

function formatCurrency(value) {
    if (isNaN(value)) return '-';
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function updateLastUpdate() {
    const now = new Date();
    document.getElementById('lastUpdate').textContent =
        now.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
}

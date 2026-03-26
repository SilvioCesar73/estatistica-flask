// static/js/new_analysis.js

// Mock data for demonstration. In a real app, column names would come from the uploaded file,
// and available tests from your backend/configuration.
const MOCK_AVAILABLE_TESTS = [
    { id: 'ttest_independent', name: 'Teste t para Amostras Independentes', variables: ['Variável Dependente (Numérica)', 'Variável de Agrupamento (Independente)'] },
    { id: 'ttest_paired', name: 'Teste t para Amostras Pareadas', variables: ['Variável 1 (Numérica)', 'Variável 2 (Numérica)'] },
    { id: 'anova_oneway', name: 'ANOVA de Uma Via', variables: ['Variável Dependente (Numérica)', 'Fator (Independente)'] },
    { id: 'mann_whitney', name: 'Teste U de Mann-Whitney', variables: ['Variável Dependente (Numérica)', 'Variável de Agrupamento (Independente)'] },
    { id: 'wilcoxon', name: 'Teste de Wilcoxon', variables: ['Variável 1 (Numérica)', 'Variável 2 (Numérica)'] },
    { id: 'correlation', name: 'Correlação de Pearson/Spearman', variables: ['Variável X (Numérica)', 'Variável Y (Numérica)'] },
    // Add more tests as needed
];

let currentAnalysisName = '';
let uploadedFileColumns = []; // To store column names after file upload

/**
 * Initiates the new analysis workflow by prompting the user for an analysis name.
 */
function startNewAnalysis() {
    // Step 1: Start and Name the Analysis
    const popupContent = `
        <h2>Nova Análise</h2>
        <p>Por favor, dê um nome à sua análise:</p>
        <input type="text" id="analysisNameInput" placeholder="Ex: Validação do Modelo Preditivo" class="popup-input" />
        <button id="createAnalysisBtn" class="popup-button">Criar</button>
    `;
    abrirPopup(popupContent); // Assuming abrirPopup is available from popup_util.js

    document.getElementById('createAnalysisBtn').onclick = () => {
        const analysisName = document.getElementById('analysisNameInput').value.trim();
        if (analysisName) {
            currentAnalysisName = analysisName;
            fecharPopup(); // Assuming fecharPopup is available
            setupAnalysisWorkspace(analysisName);
        } else {
            alert('O nome da análise não pode estar vazio.');
        }
    };
}

/**
 * Sets up the main panel as the analysis workspace.
 * @param {string} analysisName - The name of the current analysis.
 */
function setupAnalysisWorkspace(analysisName) {
    const mainPanel = document.querySelector('.main-panel');
    mainPanel.innerHTML = `
        <div class="analysis-workspace-header">
            <h2 id="analysisTitle">${analysisName}</h2>
            <div class="header-actions">
                <button id="saveAnalysisBtn" class="action-button" disabled>💾 Salvar Análise</button>
                <button id="closeAnalysisBtn" class="action-button">✖️ Fechar</button>
            </div>
        </div>

        <div id="section1-upload" class="analysis-section">
            <h3>Seção 1: Upload dos Dados</h3>
            <p>Faça o upload da sua planilha de dados (.csv, .xlsx) para começar.</p>
            <input type="file" id="dataFileInput" accept=".csv, .xlsx" style="display:none;" />
            <button id="chooseFileBtn" class="action-button">📂 Escolher Planilha</button>
            <div id="fileUploadFeedback" style="margin-top: 10px;"></div>
            <div id="dataTablePreview" style="margin-top: 15px; max-height: 300px; overflow-y: auto; border: 1px solid #ccc; display: none;"></div>
        </div>

        <div id="section2-test-selection" class="analysis-section" style="display:none;">
            <h3>Seção 2: Seleção Direta do Teste e Mapeamento de Variáveis</h3>
            <p>Selecione o teste estatístico que deseja aplicar.</p>
            <select id="testSelect" class="analysis-select">
                <option value="">-- Selecione um Teste --</option>
                ${MOCK_AVAILABLE_TESTS.map(test => `<option value="${test.id}">${test.name}</option>`).join('')}
            </select>
            <div id="variableMapping" style="margin-top: 15px;"></div>
            <button id="analyzeBtn" class="action-button" disabled style="margin-top: 20px;">▶️ Analisar</button>
        </div>

        <div id="section3-results" class="analysis-section" style="display:none;">
            <h3>Seção 3: Resultados da Análise</h3>
            <div id="analysisResults" style="margin-top: 10px;"></div>
        </div>
    `;

    // Attach event listeners
    document.getElementById('chooseFileBtn').onclick = () => document.getElementById('dataFileInput').click();
    document.getElementById('dataFileInput').onchange = handleFileUpload;
    document.getElementById('testSelect').onchange = handleTestSelection;
    document.getElementById('analyzeBtn').onclick = runAnalysis;
    document.getElementById('saveAnalysisBtn').onclick = saveCurrentAnalysis;
    document.getElementById('closeAnalysisBtn').onclick = closeAnalysisWorkspace;

    // Initially disable test selection and results sections
    document.getElementById('section2-test-selection').style.display = 'none';
    document.getElementById('section3-results').style.display = 'none';
}

/**
 * Handles the file upload, displays feedback, and unlocks the next section.
 * In a real application, this would parse the file and extract column names.
 */
function handleFileUpload(event) {
    const file = event.target.files[0];
    const fileUploadFeedback = document.getElementById('fileUploadFeedback');
    const dataTablePreview = document.getElementById('dataTablePreview');
    const section2 = document.getElementById('section2-test-selection');

    if (file) {
        fileUploadFeedback.innerHTML = `Arquivo: <strong>${file.name}</strong> (${(file.size / 1024).toFixed(2)} KB)`;
        fileUploadFeedback.style.color = 'green';
        section2.style.display = 'block'; // Unlock Section 2

        // Mocking column extraction and data preview
        // In a real scenario, you'd use a library like PapaParse for CSV or SheetJS for XLSX
        // to read the file and extract headers and a sample of rows.
        uploadedFileColumns = ['Coluna A', 'Coluna B', 'Coluna C', 'Variável Numérica', 'Variável de Grupo']; // Mock columns
        const mockTableHtml = `
            <table style="width:100%; border-collapse: collapse;">
                <thead>
                    <tr style="background-color: #f2f2f2;">
                        ${uploadedFileColumns.map(col => `<th style="border: 1px solid #ddd; padding: 8px; text-align: left;">${col}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        ${uploadedFileColumns.map(col => `<td style="border: 1px solid #ddd; padding: 8px;">Dados 1-${col.slice(-1)}</td>`).join('')}
                    </tr>
                    <tr>
                        ${uploadedFileColumns.map(col => `<td style="border: 1px solid #ddd; padding: 8px;">Dados 2-${col.slice(-1)}</td>`).join('')}
                    </tr>
                     <tr>
                        ${uploadedFileColumns.map(col => `<td style="border: 1px solid #ddd; padding: 8px;">Dados 3-${col.slice(-1)}</td>`).join('')}
                    </tr>
                </tbody>
            </table>
        `;
        dataTablePreview.innerHTML = `<h4>Pré-visualização dos Dados:</h4>${mockTableHtml}`;
        dataTablePreview.style.display = 'block';

        // Update dropdowns in section 2 with actual column names
        updateVariableMappingDropdowns();

    } else {
        fileUploadFeedback.innerHTML = 'Nenhum arquivo selecionado.';
        fileUploadFeedback.style.color = 'red';
        section2.style.display = 'none';
        dataTablePreview.style.display = 'none';
        uploadedFileColumns = [];
    }
}

/**
 * Updates the variable mapping dropdowns with the uploaded file's column names.
 */
function updateVariableMappingDropdowns() {
    const variableMappingDiv = document.getElementById('variableMapping');
    const testSelect = document.getElementById('testSelect');
    const selectedTestId = testSelect.value;
    const selectedTest = MOCK_AVAILABLE_TESTS.find(test => test.id === selectedTestId);

    variableMappingDiv.innerHTML = ''; // Clear previous fields
    document.getElementById('analyzeBtn').disabled = true; // Disable analyze button initially

    if (selectedTest && uploadedFileColumns.length > 0) {
        let mappingHtml = '<p>Agora, mapeie as colunas da sua planilha para as variáveis do teste.</p>';
        selectedTest.variables.forEach(variableName => {
            mappingHtml += `
                <div style="margin-bottom: 10px;">
                    <label for="${variableName.replace(/\s/g, '')}">${variableName}:</label>
                    <select id="${variableName.replace(/\s/g, '')}" class="variable-select" style="margin-left: 10px;">
                        <option value="">-- Selecione uma Coluna --</option>
                        ${uploadedFileColumns.map(col => `<option value="${col}">${col}</option>`).join('')}
                    </select>
                </div>
            `;
        });
        variableMappingDiv.innerHTML = mappingHtml;

        // Add event listeners to each new select element to check for completion
        const variableSelects = variableMappingDiv.querySelectorAll('.variable-select');
        variableSelects.forEach(select => {
            select.onchange = checkAllVariablesMapped;
        });
    }
}

/**
 * Handles the selection of a statistical test and dynamically displays variable mapping fields.
 */
function handleTestSelection() {
    updateVariableMappingDropdowns();
}

/**
 * Checks if all required variables for the selected test have been mapped.
 * Enables the 'Analyze' button if all are mapped.
 */
function checkAllVariablesMapped() {
    const testSelect = document.getElementById('testSelect');
    const selectedTestId = testSelect.value;
    const selectedTest = MOCK_AVAILABLE_TESTS.find(test => test.id === selectedTestId);
    const analyzeBtn = document.getElementById('analyzeBtn');

    if (!selectedTest) {
        analyzeBtn.disabled = true;
        return;
    }

    let allMapped = true;
    selectedTest.variables.forEach(variableName => {
        const selectElement = document.getElementById(variableName.replace(/\s/g, ''));
        if (!selectElement || !selectElement.value) {
            allMapped = false;
        }
    });

    analyzeBtn.disabled = !allMapped;
}

/**
 * Simulates running the analysis and displays mock results.
 * In a real application, this would send data to the backend for processing.
 */
function runAnalysis() {
    const analyzeBtn = document.getElementById('analyzeBtn');
    const analysisResultsDiv = document.getElementById('analysisResults');
    const section3 = document.getElementById('section3-results');
    const saveAnalysisBtn = document.getElementById('saveAnalysisBtn');

    analyzeBtn.disabled = true;
    analyzeBtn.textContent = 'Processando...';
    analysisResultsDiv.innerHTML = '<p>Executando a análise, por favor aguarde...</p>';
    section3.style.display = 'block'; // Show results section

    // Gather selected variables for the analysis
    const testSelect = document.getElementById('testSelect');
    const selectedTestId = testSelect.value;
    const selectedTest = MOCK_AVAILABLE_TESTS.find(test => test.id === selectedTestId);
    const mappedVariables = {};
    if (selectedTest) {
        selectedTest.variables.forEach(variableName => {
            const selectElement = document.getElementById(variableName.replace(/\s/g, ''));
            if (selectElement) {
                mappedVariables[variableName] = selectElement.value;
            }
        });
    }

    console.log("Running analysis:", selectedTestId, "with variables:", mappedVariables);

    // Simulate API call or computation
    setTimeout(() => {
        analysisResultsDiv.innerHTML = `
            <h3>Resultados do "${selectedTest.name}"</h3>
            <p><strong>Variáveis Mapeadas:</strong></p>
            <ul>
                ${Object.entries(mappedVariables).map(([key, value]) => `<li>${key}: ${value}</li>`).join('')}
            </ul>
            <p><strong>Valor-p:</strong> 0.042 (significativo!)</p>
            <p><strong>Estatística do Teste:</strong> 2.15</p>
            <p><strong>Conclusão:</strong> Há uma diferença estatisticamente significativa entre os grupos/variáveis.</p>
            <div style="margin-top: 20px; text-align: center;">
                <canvas id="analysisChart" width="400" height="200"></canvas>
            </div>
        `;
        renderMockChart(); // Render a simple chart

        analyzeBtn.disabled = false;
        analyzeBtn.textContent = '▶️ Analisar Novamente';
        saveAnalysisBtn.disabled = false; // Enable save button after analysis

    }, 2000); // Simulate 2 seconds processing time
}

/**
 * Renders a mock chart for demonstration purposes.
 * Uses Chart.js, which is already included in dashboard.html.
 */
function renderMockChart() {
    const ctx = document.getElementById('analysisChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Grupo A', 'Grupo B'],
                datasets: [{
                    label: 'Média Observada',
                    data: [25, 30],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)'
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

/**
 * Simulates saving the current analysis.
 * In a real application, this would send the analysis configuration and results to the backend.
 */
function saveCurrentAnalysis() {
    alert(`Análise "${currentAnalysisName}" salva com sucesso!`);
    // Here you would send a POST request to your backend
    // with currentAnalysisName, selectedTestId, mappedVariables, and analysisResults.
    console.log("Saving analysis:", {
        name: currentAnalysisName,
        test: document.getElementById('testSelect').value,
        variables: getMappedVariables(),
        // In a real app, you'd serialize the results displayed in analysisResultsDiv
    });
}

/**
 * Gathers currently mapped variables.
 * @returns {object} An object mapping variable names to selected column names.
 */
function getMappedVariables() {
    const testSelect = document.getElementById('testSelect');
    const selectedTestId = testSelect.value;
    const selectedTest = MOCK_AVAILABLE_TESTS.find(test => test.id === selectedTestId);
    const mappedVariables = {};
    if (selectedTest) {
        selectedTest.variables.forEach(variableName => {
            const selectElement = document.getElementById(variableName.replace(/\s/g, ''));
            if (selectElement) {
                mappedVariables[variableName] = selectElement.value;
            }
        });
    }
    return mappedVariables;
}

/**
 * Closes the current analysis workspace and reverts the main panel.
 */
function closeAnalysisWorkspace() {
    if (confirm('Tem certeza que deseja fechar esta análise? As alterações não salvas serão perdidas.')) {
        const mainPanel = document.querySelector('.main-panel');
        mainPanel.innerHTML = '<div id="testes-container" class="testes-lista"></div>'; // Revert to initial state or empty
        currentAnalysisName = '';
        uploadedFileColumns = [];
        alert('Análise fechada.');
    }
}

// Ensure popup_util.js functions are available.
// If popup_util.js is not loaded synchronously before this script,
// you might need to adjust the loading order or ensure functions are globally available.
// For example, if popup_util.js uses modules, you'd need to import them here.
// For simplicity, assuming they are globally available from the script tag in HTML.
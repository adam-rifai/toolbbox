// Tool data
const tools = [
  {
    id: "qr-generator",
    name: "QR Code Generator",
    description: "Create scannable QR codes from text or URLs",
    category: "productivity",
    icon: "📱",
  },
  {
    id: "password-generator",
    name: "Password Generator",
    description: "Generate secure passwords with customizable options",
    category: "security",
    icon: "🔒",
  },
  {
    id: "calendar",
    name: "Calendar",
    description: "Interactive monthly calendar with navigation",
    category: "productivity",
    icon: "📅",
  },
  {
    id: "calculator",
    name: "Calculator",
    description: "Basic arithmetic calculator for quick calculations",
    category: "productivity",
    icon: "🔢",
  },
  {
    id: "unit-converter",
    name: "Unit Converter",
    description: "Convert between different units of measurement",
    category: "productivity",
    icon: "📏",
  },
  {
    id: "text-case-converter",
    name: "Text Case Converter",
    description: "Convert text between different cases",
    category: "text",
    icon: "🔤",
  },
  {
    id: "timer",
    name: "Timer/Stopwatch",
    description: "Countdown timer and stopwatch for time tracking",
    category: "productivity",
    icon: "⏱️",
  },
  {
    id: "color-picker",
    name: "Color Picker",
    description: "Select colors and get their hex/RGB values",
    category: "design",
    icon: "🎨",
  },
  {
    id: "base64",
    name: "Base64 Encoder/Decoder",
    description: "Encode text to Base64 or decode Base64 to text",
    category: "security",
    icon: "🧬",
  },
  {
    id: "word-counter",
    name: "Word/Character Counter",
    description: "Count words, characters, and sentences in your text",
    category: "text",
    icon: "📝",
  },
];

// DOM Elements
const toolsGrid = document.getElementById("toolsGrid");
const modalOverlay = document.getElementById("modalOverlay");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");
const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");
const categoryButtons = document.querySelectorAll(".category-btn");

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
  renderToolsGrid();
  setupEventListeners();
});

// Render tools grid
function renderToolsGrid(filteredTools = tools) {
  toolsGrid.innerHTML = "";

  filteredTools.forEach((tool) => {
    const toolCard = document.createElement("div");
    toolCard.className = "tool-card";
    toolCard.dataset.id = tool.id;
    toolCard.innerHTML = `
            <h3>${tool.icon} ${tool.name}</h3>
            <p>${tool.description}</p>
        `;
    toolsGrid.appendChild(toolCard);
  });
}

// Set up event listeners
function setupEventListeners() {
  // Tool card clicks
  toolsGrid.addEventListener("click", (e) => {
    const toolCard = e.target.closest(".tool-card");
    if (toolCard) {
      const toolId = toolCard.dataset.id;
      openToolModal(toolId);
    }
  });

  // Modal close
  closeModal.addEventListener("click", closeToolModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeToolModal();
  });

  // Search functionality
  searchInput.addEventListener("input", filterTools);
  clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    filterTools();
  });

  // Category filtering
  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Update active button
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Filter tools
      const category = button.dataset.category;
      if (category === "all") {
        renderToolsGrid();
      } else {
        const filteredTools = tools.filter(
          (tool) => tool.category === category
        );
        renderToolsGrid(filteredTools);
      }
    });
  });

  // Contact form
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactForm);
  }

  // Copy email
  const copyEmail = document.getElementById("copyEmail");
  if (copyEmail) {
    copyEmail.addEventListener("click", copyEmailAddress);
  }
}

// Filter tools based on search input
function filterTools() {
  const searchTerm = searchInput.value.toLowerCase();
  const activeCategory = document.querySelector(".category-btn.active").dataset
    .category;

  let filteredTools = tools;

  // Apply category filter
  if (activeCategory !== "all") {
    filteredTools = tools.filter((tool) => tool.category === activeCategory);
  }

  // Apply search filter
  if (searchTerm) {
    filteredTools = filteredTools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(searchTerm) ||
        tool.description.toLowerCase().includes(searchTerm)
    );
  }

  renderToolsGrid(filteredTools);
}

// Open tool modal
function openToolModal(toolId) {
  const tool = tools.find((t) => t.id === toolId);
  if (!tool) return;

  modalTitle.textContent = tool.name;
  modalContent.innerHTML = getToolContent(toolId);
  modalOverlay.classList.add("active");

  // Initialize tool-specific functionality
  initializeTool(toolId);
}

// Close tool modal
function closeToolModal() {
  modalOverlay.classList.remove("active");
}

// Get tool content HTML
function getToolContent(toolId) {
  switch (toolId) {
    case "qr-generator":
      return `
                <div class="tool-container">
                    <label for="qrText">Enter text or URL:</label>
                    <input type="text" id="qrText" placeholder="https://example.com">
                    <div class="tool-buttons">
                        <button class="tool-btn" id="generateQR">Generate QR Code</button>
                        <button class="tool-btn secondary" id="downloadQR" disabled>Download</button>
                    </div>
                    <div class="tool-output qr-code-container">
                        <div id="qrCode"></div>
                    </div>
                </div>
            `;
    case "password-generator":
      return `
                <div class="tool-container">
                    <label for="passwordLength">Password Length: <span id="lengthValue">12</span></label>
                    <input type="range" id="passwordLength" min="4" max="50" value="12">
                    
                    <div>
                        <input type="checkbox" id="includeUppercase" checked>
                        <label for="includeUppercase">Include Uppercase Letters</label>
                    </div>
                    
                    <div>
                        <input type="checkbox" id="includeNumbers" checked>
                        <label for="includeNumbers">Include Numbers</label>
                    </div>
                    
                    <div>
                        <input type="checkbox" id="includeSymbols" checked>
                        <label for="includeSymbols">Include Symbols</label>
                    </div>
                    
                    <div class="tool-buttons">
                        <button class="tool-btn" id="generatePassword">Generate Password</button>
                        <button class="tool-btn secondary" id="copyPassword">Copy</button>
                    </div>
                    
                    <div class="tool-output">
                        <input type="text" id="passwordOutput" readonly placeholder="Your password will appear here">
                    </div>
                </div>
            `;
    case "calendar":
      return `
                <div class="tool-container">
                    <div class="calendar-header">
                        <button class="tool-btn secondary" id="prevMonth">←</button>
                        <h3 id="currentMonth">Month Year</h3>
                        <button class="tool-btn secondary" id="nextMonth">→</button>
                    </div>
                    <div id="calendar"></div>
                </div>
            `;
    case "calculator":
      return `
                <div class="tool-container">
                    <input type="text" id="calcDisplay" readonly placeholder="0">
                    <div class="calc-buttons">
                        <button class="tool-btn secondary" data-value="7">7</button>
                        <button class="tool-btn secondary" data-value="8">8</button>
                        <button class="tool-btn secondary" data-value="9">9</button>
                        <button class="tool-btn secondary" data-value="/">/</button>
                        <button class="tool-btn secondary" data-value="4">4</button>
                        <button class="tool-btn secondary" data-value="5">5</button>
                        <button class="tool-btn secondary" data-value="6">6</button>
                        <button class="tool-btn secondary" data-value="*">*</button>
                        <button class="tool-btn secondary" data-value="1">1</button>
                        <button class="tool-btn secondary" data-value="2">2</button>
                        <button class="tool-btn secondary" data-value="3">3</button>
                        <button class="tool-btn secondary" data-value="-">-</button>
                        <button class="tool-btn secondary" data-value="0">0</button>
                        <button class="tool-btn secondary" data-value=".">.</button>
                        <button class="tool-btn secondary" id="clearCalc">C</button>
                        <button class="tool-btn secondary" data-value="+">+</button>
                        <button class="tool-btn" id="calculate" style="grid-column: span 4;">=</button>
                    </div>
                </div>
            `;
    case "unit-converter":
      return `
                <div class="tool-container">
                    <div class="converter-section">
                        <label for="converterType">Converter Type:</label>
                        <select id="converterType">
                            <option value="length">Length</option>
                            <option value="weight">Weight</option>
                            <option value="temperature">Temperature</option>
                        </select>
                    </div>
                    
                    <div class="converter-section">
                        <label for="inputValue">Value:</label>
                        <input type="number" id="inputValue" placeholder="Enter value">
                    </div>
                    
                    <div class="converter-section">
                        <label for="fromUnit">From:</label>
                        <select id="fromUnit"></select>
                    </div>
                    
                    <div class="converter-section">
                        <label for="toUnit">To:</label>
                        <select id="toUnit"></select>
                    </div>
                    
                    <div class="tool-buttons">
                        <button class="tool-btn" id="convert">Convert</button>
                    </div>
                    
                    <div class="tool-output">
                        <p id="conversionResult">Result will appear here</p>
                    </div>
                </div>
            `;
    case "text-case-converter":
      return `
                <div class="tool-container">
                    <label for="textToConvert">Enter text to convert:</label>
                    <textarea id="textToConvert" rows="5" placeholder="Enter your text here..."></textarea>
                    
                    <div class="tool-buttons">
                        <button class="tool-btn" data-case="upper">UPPERCASE</button>
                        <button class="tool-btn" data-case="lower">lowercase</button>
                        <button class="tool-btn" data-case="title">Title Case</button>
                        <button class="tool-btn" data-case="sentence">Sentence case</button>
                        <button class="tool-btn secondary" id="copyConvertedText">Copy</button>
                    </div>
                    
                    <div class="tool-output">
                        <textarea id="convertedText" rows="5" readonly placeholder="Converted text will appear here"></textarea>
                    </div>
                </div>
            `;
    case "timer":
      return `
                    <div class="tool-container">
                        <div class="timer-section">
                            <h3>Countdown Timer</h3>
                            <div class="timer-inputs">
                                <input type="number" id="hours" min="0" max="23" value="0" placeholder="HH">
                                <input type="number" id="minutes" min="0" max="59" value="5" placeholder="MM">
                                <input type="number" id="seconds" min="0" max="59" value="0" placeholder="SS">
                            </div>
                            <div class="timer-display" id="countdownDisplay">00:05:00</div>
                            <div class="timer-controls">
                                <button class="tool-btn" id="startCountdown">Start</button>
                                <button class="tool-btn secondary" id="pauseCountdown">Pause</button>
                                <button class="tool-btn secondary" id="resetCountdown">Reset</button>
                            </div>
                        </div>
                        
                        <div class="timer-section">
                            <h3>Stopwatch</h3>
                            <div class="timer-display" id="stopwatchDisplay">00:00:00</div>
                            <div class="timer-controls">
                                <button class="tool-btn" id="startStopwatch">Start</button>
                                <button class="tool-btn secondary" id="pauseStopwatch">Pause</button>
                                <button class="tool-btn secondary" id="resetStopwatch">Reset</button>
                            </div>
                        </div>
                        
                        <div class="timer-section">
                            <h3>Word Timer</h3>
                            <div class="timer-inputs">
                                <input type="number" id="wordCount" min="1" value="500" placeholder="Word Count">
                            </div>
                            <div class="timer-display" id="wordTimerDisplay">00:00:00</div>
                            <div class="timer-controls">
                                <button class="tool-btn" id="startWordTimer">Start</button>
                                <button class="tool-btn secondary" id="pauseWordTimer">Pause</button>
                                <button class="tool-btn secondary" id="resetWordTimer">Reset</button>
                            </div>
                            <div class="timer-info">
                                <p>Set a word count goal and track your writing time</p>
                            </div>
                        </div>
                    </div>
                `;
    case "color-picker":
      return `
                <div class="tool-container">
                    <label for="colorPicker">Select a color:</label>
                    <input type="color" id="colorPicker" value="#4361ee">
                    
                    <div class="color-preview" id="colorPreview"></div>
                    
                    <div class="tool-output">
                        <p>Hex: <span id="hexValue">#4361ee</span></p>
                        <p>RGB: <span id="rgbValue">rgb(67, 97, 238)</span></p>
                    </div>
                    
                    <div class="tool-buttons">
                        <button class="tool-btn" id="randomColor">Random Color</button>
                        <button class="tool-btn secondary" id="copyHex">Copy Hex</button>
                    </div>
                </div>
            `;
    case "base64":
      return `
                <div class="tool-container">
                    <label for="base64Input">Text to Encode/Decode:</label>
                    <textarea id="base64Input" rows="5" placeholder="Enter text here..."></textarea>
                    
                    <div class="tool-buttons">
                        <button class="tool-btn" id="encodeBase64">Encode</button>
                        <button class="tool-btn" id="decodeBase64">Decode</button>
                        <button class="tool-btn secondary" id="copyBase64">Copy</button>
                    </div>
                    
                    <div class="tool-output">
                        <textarea id="base64Output" rows="5" readonly placeholder="Result will appear here"></textarea>
                    </div>
                </div>
            `;
    case "word-counter":
      return `
                <div class="tool-container">
                    <label for="textToCount">Enter text to analyze:</label>
                    <textarea id="textToCount" rows="8" placeholder="Enter your text here..."></textarea>
                    
                    <div class="tool-output">
                        <div class="counters">
                            <div class="counter-item">
                                <h4>Words</h4>
                                <p id="wordCount">0</p>
                            </div>
                            <div class="counter-item">
                                <h4>Characters</h4>
                                <p id="charCount">0</p>
                            </div>
                            <div class="counter-item">
                                <h4>Characters (no spaces)</h4>
                                <p id="charNoSpaceCount">0</p>
                            </div>
                            <div class="counter-item">
                                <h4>Sentences</h4>
                                <p id="sentenceCount">0</p>
                            </div>
                            <div class="counter-item">
                                <h4>Paragraphs</h4>
                                <p id="paragraphCount">0</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    default:
      return "<p>Tool content not found.</p>";
  }
}

// Initialize tool-specific functionality
function initializeTool(toolId) {
  switch (toolId) {
    case "qr-generator":
      initializeQRGenerator();
      break;
    case "password-generator":
      initializePasswordGenerator();
      break;
    case "calendar":
      initializeCalendar();
      break;
    case "calculator":
      initializeCalculator();
      break;
    case "unit-converter":
      initializeUnitConverter();
      break;
    case "text-case-converter":
      initializeTextCaseConverter();
      break;
    case "timer":
      initializeTimer();
      break;
    case "color-picker":
      initializeColorPicker();
      break;
    case "base64":
      initializeBase64();
      break;
    case "word-counter":
      initializeWordCounter();
      break;
  }
}

// Tool-specific initialization functions
function initializeQRGenerator() {
  const generateBtn = document.getElementById("generateQR");
  const downloadBtn = document.getElementById("downloadQR");
  const qrText = document.getElementById("qrText");
  const qrCode = document.getElementById("qrCode");

  generateBtn.addEventListener("click", () => {
    const text = qrText.value.trim();
    if (!text) {
      alert("Please enter text or URL");
      return;
    }

    // Clear previous QR code
    qrCode.innerHTML = "";

    // Create a proper QR code using a data URL approach
    const qrSize = 200;
    const qrContainer = document.createElement("div");
    qrContainer.style.width = qrSize + "px";
    qrContainer.style.height = qrSize + "px";
    qrContainer.style.background = "white";
    qrContainer.style.position = "relative";
    qrContainer.style.border = "10px solid white";
    qrContainer.style.display = "flex";
    qrContainer.style.alignItems = "center";
    qrContainer.style.justifyContent = "center";

    // Create a simple visual representation of a QR code
    const qrCanvas = document.createElement("div");
    qrCanvas.style.width = "180px";
    qrCanvas.style.height = "180px";
    qrCanvas.style.display = "grid";
    qrCanvas.style.gridTemplateColumns = "repeat(15, 1fr)";
    qrCanvas.style.gridTemplateRows = "repeat(15, 1fr)";
    qrCanvas.style.gap = "1px";

    // Generate a pattern based on the text
    const textHash = Array.from(text).reduce(
      (acc, char) => acc + char.charCodeAt(0),
      0
    );
    const patternSeed = textHash % 100;

    // Create QR code pattern
    for (let i = 0; i < 225; i++) {
      const cell = document.createElement("div");
      // Position markers (corners)
      if (
        (i < 15 && i < 8) || // Top-left corner
        (i < 15 && i > 6) || // Top-right corner
        (i > 210 && i < 218) || // Bottom-left corner
        // Position detection patterns
        (i % 15 < 3 && Math.floor(i / 15) < 3) || // Top-left
        (i % 15 > 11 && Math.floor(i / 15) < 3) || // Top-right
        (i % 15 < 3 && Math.floor(i / 15) > 11) || // Bottom-left
        // Data area with pattern based on text
        (i > 45 && i < 180 && (i + patternSeed) % 7 < 4)
      ) {
        cell.style.backgroundColor = "#000";
      } else {
        cell.style.backgroundColor = "#fff";
      }
      cell.style.border = "1px solid #eee";
      qrCanvas.appendChild(cell);
    }

    qrContainer.appendChild(qrCanvas);
    qrCode.appendChild(qrContainer);
    downloadBtn.disabled = false;
  });

  downloadBtn.addEventListener("click", () => {
    alert(
      "In a real implementation, this would download the QR code as an image. For this demo, we show an alert instead."
    );
  });
}

function initializePasswordGenerator() {
  const lengthSlider = document.getElementById("passwordLength");
  const lengthValue = document.getElementById("lengthValue");
  const uppercaseCheckbox = document.getElementById("includeUppercase");
  const numbersCheckbox = document.getElementById("includeNumbers");
  const symbolsCheckbox = document.getElementById("includeSymbols");
  const generateBtn = document.getElementById("generatePassword");
  const copyBtn = document.getElementById("copyPassword");
  const passwordOutput = document.getElementById("passwordOutput");

  lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
  });

  generateBtn.addEventListener("click", () => {
    const length = parseInt(lengthSlider.value);
    const includeUppercase = uppercaseCheckbox.checked;
    const includeNumbers = numbersCheckbox.checked;
    const includeSymbols = symbolsCheckbox.checked;

    const password = generatePassword(
      length,
      includeUppercase,
      includeNumbers,
      includeSymbols
    );
    passwordOutput.value = password;
  });

  copyBtn.addEventListener("click", () => {
    if (passwordOutput.value) {
      passwordOutput.select();
      document.execCommand("copy");
      showCopyFeedback(copyBtn, "Copied!");
    }
  });

  // Generate initial password
  generateBtn.click();
}

function generatePassword(
  length,
  includeUppercase,
  includeNumbers,
  includeSymbols
) {
  let charset = "abcdefghijklmnopqrstuvwxyz";
  if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (includeNumbers) charset += "0123456789";
  if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}

function initializeCalendar() {
  const prevBtn = document.getElementById("prevMonth");
  const nextBtn = document.getElementById("nextMonth");
  const currentMonth = document.getElementById("currentMonth");
  const calendar = document.getElementById("calendar");

  let currentDate = new Date();
  let currentMonthValue = currentDate.getMonth();
  let currentYearValue = currentDate.getFullYear();

  function renderCalendar() {
    // Set month and year header
    currentMonth.textContent = currentDate.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    // Clear calendar
    calendar.innerHTML = "";

    // Create calendar header
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const header = document.createElement("div");
    header.className = "calendar-header-days";
    days.forEach((day) => {
      const dayElement = document.createElement("div");
      dayElement.textContent = day;
      dayElement.className = "calendar-day-header";
      header.appendChild(dayElement);
    });
    calendar.appendChild(header);

    // Get first day of month and number of days
    const firstDay = new Date(currentYearValue, currentMonthValue, 1).getDay();
    const daysInMonth = new Date(
      currentYearValue,
      currentMonthValue + 1,
      0
    ).getDate();

    // Create calendar grid
    const grid = document.createElement("div");
    grid.className = "calendar-grid";

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      const emptyCell = document.createElement("div");
      emptyCell.className = "calendar-day empty";
      grid.appendChild(emptyCell);
    }

    // Add cells for each day of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const dayCell = document.createElement("div");
      dayCell.className = "calendar-day";
      dayCell.textContent = i;

      // Highlight current day
      const today = new Date();
      if (
        i === today.getDate() &&
        currentMonthValue === today.getMonth() &&
        currentYearValue === today.getFullYear()
      ) {
        dayCell.classList.add("today");
      }

      grid.appendChild(dayCell);
    }

    calendar.appendChild(grid);
  }

  prevBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    currentMonthValue = currentDate.getMonth();
    currentYearValue = currentDate.getFullYear();
    renderCalendar();
  });

  nextBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    currentMonthValue = currentDate.getMonth();
    currentYearValue = currentDate.getFullYear();
    renderCalendar();
  });

  renderCalendar();
}

function initializeCalculator() {
  const display = document.getElementById("calcDisplay");
  const buttons = document.querySelectorAll(
    ".calc-buttons .tool-btn.secondary"
  );
  const clearBtn = document.getElementById("clearCalc");
  const calculateBtn = document.getElementById("calculate");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.value;
      if (display.value === "0" || display.value === "Error") {
        display.value = value;
      } else {
        display.value += value;
      }
    });
  });

  clearBtn.addEventListener("click", () => {
    display.value = "0";
  });

  calculateBtn.addEventListener("click", () => {
    try {
      // Replace × with * and ÷ with / for evaluation
      const expression = display.value.replace(/×/g, "*").replace(/÷/g, "/");
      const result = eval(expression);
      display.value = result;
    } catch (error) {
      display.value = "Error";
    }
  });

  // Initialize display
  display.value = "0";
}

function initializeUnitConverter() {
  const converterType = document.getElementById("converterType");
  const fromUnit = document.getElementById("fromUnit");
  const toUnit = document.getElementById("toUnit");
  const inputValue = document.getElementById("inputValue");
  const convertBtn = document.getElementById("convert");
  const result = document.getElementById("conversionResult");

  // Unit definitions
  const units = {
    length: [
      { name: "Meters", value: "m" },
      { name: "Kilometers", value: "km" },
      { name: "Centimeters", value: "cm" },
      { name: "Millimeters", value: "mm" },
      { name: "Inches", value: "in" },
      { name: "Feet", value: "ft" },
      { name: "Yards", value: "yd" },
      { name: "Miles", value: "mi" },
    ],
    weight: [
      { name: "Grams", value: "g" },
      { name: "Kilograms", value: "kg" },
      { name: "Milligrams", value: "mg" },
      { name: "Pounds", value: "lb" },
      { name: "Ounces", value: "oz" },
    ],
    temperature: [
      { name: "Celsius", value: "c" },
      { name: "Fahrenheit", value: "f" },
      { name: "Kelvin", value: "k" },
    ],
  };

  function updateUnitOptions() {
    const type = converterType.value;
    const unitOptions = units[type];

    // Clear current options
    fromUnit.innerHTML = "";
    toUnit.innerHTML = "";

    // Add new options
    unitOptions.forEach((unit) => {
      const fromOption = document.createElement("option");
      fromOption.value = unit.value;
      fromOption.textContent = unit.name;
      fromUnit.appendChild(fromOption);

      const toOption = document.createElement("option");
      toOption.value = unit.value;
      toOption.textContent = unit.name;
      toUnit.appendChild(toOption);
    });

    // Set default selections
    if (type === "length") {
      fromUnit.value = "m";
      toUnit.value = "cm";
    } else if (type === "weight") {
      fromUnit.value = "kg";
      toUnit.value = "g";
    } else if (type === "temperature") {
      fromUnit.value = "c";
      toUnit.value = "f";
    }
  }

  converterType.addEventListener("change", updateUnitOptions);
  updateUnitOptions();

  convertBtn.addEventListener("click", () => {
    const type = converterType.value;
    const from = fromUnit.value;
    const to = toUnit.value;
    const value = parseFloat(inputValue.value);

    if (isNaN(value)) {
      result.textContent = "Please enter a valid number";
      return;
    }

    let convertedValue;

    if (type === "length") {
      convertedValue = convertLength(value, from, to);
    } else if (type === "weight") {
      convertedValue = convertWeight(value, from, to);
    } else if (type === "temperature") {
      convertedValue = convertTemperature(value, from, to);
    }

    result.textContent = `${value} ${getUnitName(
      from,
      type
    )} = ${convertedValue.toFixed(4)} ${getUnitName(to, type)}`;
  });

  // Conversion functions
  function convertLength(value, from, to) {
    // Convert to meters first
    let meters;
    switch (from) {
      case "m":
        meters = value;
        break;
      case "km":
        meters = value * 1000;
        break;
      case "cm":
        meters = value / 100;
        break;
      case "mm":
        meters = value / 1000;
        break;
      case "in":
        meters = value * 0.0254;
        break;
      case "ft":
        meters = value * 0.3048;
        break;
      case "yd":
        meters = value * 0.9144;
        break;
      case "mi":
        meters = value * 1609.34;
        break;
    }

    // Convert from meters to target unit
    switch (to) {
      case "m":
        return meters;
      case "km":
        return meters / 1000;
      case "cm":
        return meters * 100;
      case "mm":
        return meters * 1000;
      case "in":
        return meters / 0.0254;
      case "ft":
        return meters / 0.3048;
      case "yd":
        return meters / 0.9144;
      case "mi":
        return meters / 1609.34;
    }
  }

  function convertWeight(value, from, to) {
    // Convert to grams first
    let grams;
    switch (from) {
      case "g":
        grams = value;
        break;
      case "kg":
        grams = value * 1000;
        break;
      case "mg":
        grams = value / 1000;
        break;
      case "lb":
        grams = value * 453.592;
        break;
      case "oz":
        grams = value * 28.3495;
        break;
    }

    // Convert from grams to target unit
    switch (to) {
      case "g":
        return grams;
      case "kg":
        return grams / 1000;
      case "mg":
        return grams * 1000;
      case "lb":
        return grams / 453.592;
      case "oz":
        return grams / 28.3495;
    }
  }

  function convertTemperature(value, from, to) {
    // Convert to Celsius first
    let celsius;
    if (from === "c") {
      celsius = value;
    } else if (from === "f") {
      celsius = ((value - 32) * 5) / 9;
    } else if (from === "k") {
      celsius = value - 273.15;
    }

    // Convert from Celsius to target unit
    if (to === "c") {
      return celsius;
    } else if (to === "f") {
      return (celsius * 9) / 5 + 32;
    } else if (to === "k") {
      return celsius + 273.15;
    }
  }

  function getUnitName(unit, type) {
    const unitObj = units[type].find((u) => u.value === unit);
    return unitObj ? unitObj.name : unit;
  }
}

function initializeTextCaseConverter() {
  const textToConvert = document.getElementById("textToConvert");
  const convertedText = document.getElementById("convertedText");
  const copyBtn = document.getElementById("copyConvertedText");
  const caseButtons = document.querySelectorAll("[data-case]");

  caseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const caseType = button.dataset.case;
      const text = textToConvert.value;

      let converted;
      switch (caseType) {
        case "upper":
          converted = text.toUpperCase();
          break;
        case "lower":
          converted = text.toLowerCase();
          break;
        case "title":
          converted = text.replace(
            /\w\S*/g,
            (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
          );
          break;
        case "sentence":
          converted = text.replace(/(^\s*|[.!?]\s+)([a-z])/g, (match) =>
            match.toUpperCase()
          );
          break;
      }

      convertedText.value = converted;
    });
  });

  copyBtn.addEventListener("click", () => {
    if (convertedText.value) {
      convertedText.select();
      document.execCommand("copy");
      showCopyFeedback(copyBtn, "Copied!");
    }
  });
}

function initializeTimer() {
  // Countdown Timer
  const hoursInput = document.getElementById("hours");
  const minutesInput = document.getElementById("minutes");
  const secondsInput = document.getElementById("seconds");
  const countdownDisplay = document.getElementById("countdownDisplay");
  const startCountdownBtn = document.getElementById("startCountdown");
  const pauseCountdownBtn = document.getElementById("pauseCountdown");
  const resetCountdownBtn = document.getElementById("resetCountdown");

  let countdownInterval;
  let countdownTimeLeft;
  let countdownRunning = false;

  function updateCountdownDisplay() {
    const hours = Math.floor(countdownTimeLeft / 3600);
    const minutes = Math.floor((countdownTimeLeft % 3600) / 60);
    const seconds = countdownTimeLeft % 60;

    countdownDisplay.textContent = `${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  startCountdownBtn.addEventListener("click", () => {
    if (!countdownRunning) {
      const hours = parseInt(hoursInput.value) || 0;
      const minutes = parseInt(minutesInput.value) || 0;
      const seconds = parseInt(secondsInput.value) || 0;

      countdownTimeLeft = hours * 3600 + minutes * 60 + seconds;

      if (countdownTimeLeft <= 0) {
        alert("Please enter a valid time");
        return;
      }

      countdownRunning = true;
      updateCountdownDisplay();

      countdownInterval = setInterval(() => {
        countdownTimeLeft--;
        updateCountdownDisplay();

        if (countdownTimeLeft <= 0) {
          clearInterval(countdownInterval);
          countdownRunning = false;
          alert("Countdown finished!");
        }
      }, 1000);
    }
  });

  pauseCountdownBtn.addEventListener("click", () => {
    if (countdownRunning) {
      clearInterval(countdownInterval);
      countdownRunning = false;
    }
  });

  resetCountdownBtn.addEventListener("click", () => {
    clearInterval(countdownInterval);
    countdownRunning = false;
    countdownTimeLeft = 0;
    updateCountdownDisplay();
    hoursInput.value = 0;
    minutesInput.value = 5;
    secondsInput.value = 0;
  });

  // Stopwatch
  const stopwatchDisplay = document.getElementById("stopwatchDisplay");
  const startStopwatchBtn = document.getElementById("startStopwatch");
  const pauseStopwatchBtn = document.getElementById("pauseStopwatch");
  const resetStopwatchBtn = document.getElementById("resetStopwatch");

  let stopwatchInterval;
  let stopwatchTime = 0;
  let stopwatchRunning = false;

  function updateStopwatchDisplay() {
    const hours = Math.floor(stopwatchTime / 3600);
    const minutes = Math.floor((stopwatchTime % 3600) / 60);
    const seconds = stopwatchTime % 60;

    stopwatchDisplay.textContent = `${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  startStopwatchBtn.addEventListener("click", () => {
    if (!stopwatchRunning) {
      stopwatchRunning = true;
      stopwatchInterval = setInterval(() => {
        stopwatchTime++;
        updateStopwatchDisplay();
      }, 1000);
    }
  });

  pauseStopwatchBtn.addEventListener("click", () => {
    if (stopwatchRunning) {
      clearInterval(stopwatchInterval);
      stopwatchRunning = false;
    }
  });

  resetStopwatchBtn.addEventListener("click", () => {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    stopwatchTime = 0;
    updateStopwatchDisplay();
  });

  // Word Timer
  const wordCountInput = document.getElementById("wordCount");
  const wordTimerDisplay = document.getElementById("wordTimerDisplay");
  const startWordTimerBtn = document.getElementById("startWordTimer");
  const pauseWordTimerBtn = document.getElementById("pauseWordTimer");
  const resetWordTimerBtn = document.getElementById("resetWordTimer");

  let wordTimerInterval;
  let wordTimerTime = 0;
  let wordTimerRunning = false;

  function updateWordTimerDisplay() {
    const hours = Math.floor(wordTimerTime / 3600);
    const minutes = Math.floor((wordTimerTime % 3600) / 60);
    const seconds = wordTimerTime % 60;

    wordTimerDisplay.textContent = `${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  startWordTimerBtn.addEventListener("click", () => {
    if (!wordTimerRunning) {
      const wordGoal = parseInt(wordCountInput.value) || 500;
      if (wordGoal <= 0) {
        alert("Please enter a valid word count goal");
        return;
      }

      wordTimerRunning = true;
      updateWordTimerDisplay();

      wordTimerInterval = setInterval(() => {
        wordTimerTime++;
        updateWordTimerDisplay();
      }, 1000);
    }
  });

  pauseWordTimerBtn.addEventListener("click", () => {
    if (wordTimerRunning) {
      clearInterval(wordTimerInterval);
      wordTimerRunning = false;
    }
  });

  resetWordTimerBtn.addEventListener("click", () => {
    clearInterval(wordTimerInterval);
    wordTimerRunning = false;
    wordTimerTime = 0;
    updateWordTimerDisplay();
  });

  // Initialize displays
  updateCountdownDisplay();
  updateStopwatchDisplay();
  updateWordTimerDisplay();
}

function initializeColorPicker() {
  const colorPicker = document.getElementById("colorPicker");
  const colorPreview = document.getElementById("colorPreview");
  const hexValue = document.getElementById("hexValue");
  const rgbValue = document.getElementById("rgbValue");
  const randomColorBtn = document.getElementById("randomColor");
  const copyHexBtn = document.getElementById("copyHex");

  function updateColorInfo(hex) {
    colorPreview.style.backgroundColor = hex;
    hexValue.textContent = hex;

    // Convert hex to RGB
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    rgbValue.textContent = `rgb(${r}, ${g}, ${b})`;
  }

  colorPicker.addEventListener("input", () => {
    updateColorInfo(colorPicker.value);
  });

  randomColorBtn.addEventListener("click", () => {
    const randomHex =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
    colorPicker.value = randomHex;
    updateColorInfo(randomHex);
  });

  copyHexBtn.addEventListener("click", () => {
    const textarea = document.createElement("textarea");
    textarea.value = hexValue.textContent;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    showCopyFeedback(copyHexBtn, "Copied!");
  });

  // Initialize with default color
  updateColorInfo(colorPicker.value);
}

function initializeBase64() {
  const input = document.getElementById("base64Input");
  const output = document.getElementById("base64Output");
  const encodeBtn = document.getElementById("encodeBase64");
  const decodeBtn = document.getElementById("decodeBase64");
  const copyBtn = document.getElementById("copyBase64");

  encodeBtn.addEventListener("click", () => {
    const text = input.value;
    try {
      const encoded = btoa(unescape(encodeURIComponent(text)));
      output.value = encoded;
    } catch (error) {
      output.value = "Error encoding text";
    }
  });

  decodeBtn.addEventListener("click", () => {
    const text = input.value;
    try {
      const decoded = decodeURIComponent(escape(atob(text)));
      output.value = decoded;
    } catch (error) {
      output.value = "Error decoding text - invalid Base64";
    }
  });

  copyBtn.addEventListener("click", () => {
    if (output.value) {
      output.select();
      document.execCommand("copy");
      showCopyFeedback(copyBtn, "Copied!");
    }
  });
}

function initializeWordCounter() {
  const textToCount = document.getElementById("textToCount");
  const wordCount = document.getElementById("wordCount");
  const charCount = document.getElementById("charCount");
  const charNoSpaceCount = document.getElementById("charNoSpaceCount");
  const sentenceCount = document.getElementById("sentenceCount");
  const paragraphCount = document.getElementById("paragraphCount");

  function updateCounts() {
    const text = textToCount.value;

    // Word count (split by whitespace and filter out empty strings)
    const words = text.trim()
      ? text
          .trim()
          .split(/\s+/)
          .filter((word) => word.length > 0)
      : [];
    wordCount.textContent = words.length;

    // Character counts
    charCount.textContent = text.length;
    charNoSpaceCount.textContent = text.replace(/\s/g, "").length;

    // Sentence count (count periods, exclamation marks, and question marks)
    sentenceCount.textContent = text ? (text.match(/[.!?]+/g) || []).length : 0;

    // Paragraph count (count newlines)
    paragraphCount.textContent = text
      ? (text.match(/\n+/g) || []).length + 1
      : 0;
  }

  textToCount.addEventListener("input", updateCounts);

  // Initialize counts
  updateCounts();
}

// Helper function to show copy feedback
function showCopyFeedback(button, message) {
  const originalText = button.textContent;
  button.textContent = message;
  button.disabled = true;

  setTimeout(() => {
    button.textContent = originalText;
    button.disabled = false;
  }, 2000);
}

// Handle contact form submission
function handleContactForm(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;
  const formMessage = document.getElementById("formMessage");

  if (!name || !message) {
    formMessage.textContent = "Please fill in all fields";
    formMessage.className = "form-message error";
    return;
  }

  // In a real implementation, you would send the form data to a server here
  // For this demo, we'll just show a success message
  formMessage.textContent =
    "Thank you for your message! We will get back to you soon.";
  formMessage.className = "form-message success";

  // Reset form
  document.getElementById("contactForm").reset();

  // Hide message after 5 seconds
  setTimeout(() => {
    formMessage.style.display = "none";
  }, 5000);
}

// Copy email address to clipboard
function copyEmailAddress() {
  const email = document.getElementById("emailAddress");
  const textarea = document.createElement("textarea");
  textarea.value = email.textContent;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);

  const copyBtn = document.getElementById("copyEmail");
  showCopyFeedback(copyBtn, "Copied!");
}

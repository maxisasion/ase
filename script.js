// Enhanced Configuration
const config = {
  validMentorId: "7442",
  validEmail: "ultimatefx686@gmail.com",
  validLicenseKeys: ["32D-J07-71D-A61", "QS2-10S-RS25-02", "22-SV-01A-J16"],
  securityCodes: {
    "32D-J07-71D-A61": "FXPRO7442",
    "QS2-10S-RS25-02": "TRADE2023",
    "22-SV-01A-J16": "ULTIMATE32"
  },
  maxLoginAttempts: 3,
  blockDuration: 30 * 60 * 1000, // 30 minutes
  signalRefreshInterval: 5 * 60 * 1000 // 5 minutes
};

// State Management
const state = {
  signalHistory: [],
  loginAttempts: 0,
  blockedUntil: 0,
  autoSignalInterval: null,
  currentPair: "OANDA:BTCUSD"
};

// DOM Elements
const elements = {
  menuBtn: document.getElementById('menuBtn'),
  menuContainer: document.getElementById('menuContainer'),
  timeDisplay: document.getElementById('timeDisplay'),
  securityCodeContainer: document.getElementById('securityCodeContainer'),
  loginContainer: document.getElementById('login-container'),
  dashboard: document.getElementById('dashboard'),
  userNameDisplay: document.getElementById('userNameDisplay'),
  pairSelect: document.getElementById('pairSelect'),
  signalMessage: document.getElementById('signal-message'),
  chartIframe: document.getElementById('chartIframe'),
  accuracyDisplay: document.getElementById('accuracyDisplay'),
  loginBtn: document.getElementById('loginBtn'),
  verifySecurityCodeBtn: document.getElementById('verifySecurityCodeBtn'),
  refreshSignalBtn: document.getElementById('refreshSignalBtn'),
  advancedAnalysisBtn: document.getElementById('advancedAnalysisBtn'),
  logoutBtn: document.getElementById('logoutBtn'),
  mentorId: document.getElementById('mentorId'),
  email: document.getElementById('email'),
  username: document.getElementById('username'),
  licenseKey: document.getElementById('licenseKey'),
  securityCode: document.getElementById('securityCode')
};

// Menu Functions
function toggleMenu() {
  elements.menuContainer.classList.toggle('open');
}

function navigate(section) {
  alert(Navigating to ${section} (demo));
  toggleMenu();
}

// Time Display
function updateTime() {
  const now = new Date();
  const options = { 
    timeZone: 'Africa/Johannesburg',
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  };
  elements.timeDisplay.textContent = now.toLocaleString('en-ZA', options);
}

// Trading Functions
function checkFractals() {
  const patterns = ["bullish", "bearish", "neutral"];
  const weights = [0.4, 0.4, 0.2];
  let num = Math.random();
  let s = 0;
  let lastIndex = weights.length - 1;

  for (let i = 0; i < lastIndex; ++i) {
    s += weights[i];
    if (num < s) {
      return patterns[i];
    }
  }
  
  return patterns[lastIndex];
}

function calculateATR() {
  return (Math.random() * 90 + 10).toFixed(2);
}

function calculateAccuracy() {
  // Calculate accuracy based on signal history
  if (state.signalHistory.length === 0) return "87.5%";
  
  const successfulSignals = state.signalHistory.filter(signal => 
    signal.type !== "neutral" && Math.random() > 0.3 // 70% chance of success for demo
  ).length;
  
  const accuracy = (successfulSignals / state.signalHistory.length * 100).toFixed(1);
  return ${accuracy}%;
}

function checkIndicators() {
  const rsi = Math.floor(Math.random() * 100);
  const price = 1000 + Math.random() * 500;
  const ma20 = price + (Math.random() * 40 - 20);
  const fractal = checkFractals();
  const atr = calculateATR();
  const macd = (Math.random() * 2 - 1).toFixed(2);
  const stochastic = Math.floor(Math.random() * 100);
  
  let signal = {
    type: "neutral",
    message: "No Clear Trade 🚫",
    details: {
      rsi,
      ma20: ma20.toFixed(2),
      fractal,
      atr,
      macd,
      stochastic
    }
  };
  
  if (fractal === "bullish" && rsi <= 20 && price > ma20) {
    signal.type = "buy";
    signal.message = STRONG BUY 📈 | RSI:${rsi} (Extreme Oversold) | Price above MA20 | FRACTAL:${fractal} | ATR:${atr};
  } else if (fractal === "bearish" && rsi >= 80 && price < ma20) {
    signal.type = "sell";
    signal.message = STRONG SELL 📉 | RSI:${rsi} (Extreme Overbought) | Price below MA20 | FRACTAL:${fractal} | ATR:${atr};
  } else if (fractal === "bullish" && rsi <= 30 && price > ma20) {
    signal.type = "buy";
    signal.message = BUY 📈 | RSI:${rsi} (Oversold) | Price above MA20 | FRACTAL:${fractal};
  } else if (fractal === "bearish" && rsi >= 70 && price < ma20) {
    signal.type = "sell";
    signal.message = SELL 📉 | RSI:${rsi} (Overbought) | Price below MA20 | FRACTAL:${fractal};
  }
  
  signal.timestamp = new Date();
  signal.pair = elements.pairSelect.value;
  state.signalHistory.unshift(signal);
  if (state.signalHistory.length > 50) state.signalHistory.pop();
  
  return signal;
}

function refreshSignal() {
  elements.signalMessage.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing market conditions...';
  elements.signalMessage.className = "signal-neutral";
  
  setTimeout(() => {
    const signal = checkIndicators();
    showSignal(signal);
    elements.accuracyDisplay.textContent = calculateAccuracy();
  }, 1500);
}

function showSignal(signal) {
  elements.signalMessage.innerHTML = signal.message;
  
  if (signal.type === "buy") {
    elements.signalMessage.className = "signal-buy";
  } else if (signal.type === "sell") {
    elements.signalMessage.className = "signal-sell";
  } else {
    elements.signalMessage.className = "signal-neutral";
  }
  
  const pair = elements.pairSelect.value.split(':')[1];
  sendNotification("🚀 New Trading Signal", ${signal.message} | Pair: ${pair});
}

function updateChart() {
  const pair = elements.pairSelect.value;
  const src = https://s.tradingview.com/widgetembed/?symbol=${pair}&interval=15&theme=dark&style=9&timezone=Africa%2FJohannesburg&hide_side_toolbar=true&studies=RSI@tv-basicstudies,MACD@tv-basicstudies,MA%20EXP@tv-basicstudies;
  elements.chartIframe.src = src;
}

function showAdvancedAnalysis() {
  const pair = elements.pairSelect.value.split(':')[1];
  alert(Advanced analysis for ${pair} would be displayed here.\nThis premium feature includes:\n- Deep market analysis\n- Volume profile\n- Order flow data\n- AI-powered predictions);
}

// Auth Functions
function login() {
  if (Date.now() < state.blockedUntil) {
    const remainingTime = Math.ceil((state.blockedUntil - Date.now()) / 1000 / 60);
    alert(Account temporarily locked. Please try again in ${remainingTime} minutes.);
    return;
  }
  
  const mentor = elements.mentorId.value.trim();
  const email = elements.email.value.trim();
  const username = elements.username.value.trim();
  const key = elements.licenseKey.value.trim();
  
  if (mentor === config.validMentorId && email === config.validEmail && config.validLicenseKeys.includes(key)) {
    if (localStorage.getItem(deactivated_${key}) {
      elements.securityCodeContainer.classList.remove("hidden");
      elements.loginContainer.style.paddingBottom = "20px";
      return;
    }
    
    state.loginAttempts = 0;
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("username", username);
    localStorage.setItem("licenseKey", key);
    elements.loginContainer.classList.add("hidden");
    elements.dashboard.classList.remove("hidden");
    elements.userNameDisplay.textContent = username;
    updateChart();
    refreshSignal();
    requestNotificationPermission();
    startAutoSignalGeneration();
  } else {
    state.loginAttempts++;
    if (state.loginAttempts >= config.maxLoginAttempts) {
      state.blockedUntil = Date.now() + config.blockDuration;
      alert("Too many failed attempts. Account temporarily locked for 30 minutes.");
    } else {
      alert("❌ Invalid credentials or license key. Please contact support.");
    }
  }
}

function verifySecurityCode() {
  const key = elements.licenseKey.value.trim();
  const code = elements.securityCode.value.trim();
  
  if (config.securityCodes[key] && code === config.securityCodes[key]) {
    localStorage.removeItem(deactivated_${key});
    elements.securityCodeContainer.classList.add("hidden");
    login();
  } else {
    alert("❌ Invalid security code. Please contact support.");
  }
}

function deactivateLicense() {
  if (confirm("Are you sure you want to logout and deactivate your license?")) {
    const key = localStorage.getItem("licenseKey");
    if (key) {
      localStorage.setItem(deactivated_${key}, "true");
    }
    clearInterval(state.autoSignalInterval);
    localStorage.clear();
    location.reload();
  }
}

// Notification Functions
function requestNotificationPermission() {
  if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission().then(permission => {
      console.log("Notification permission:", permission);
    });
  }
}

function sendNotification(title, body) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, { body });
  }
}

function startAutoSignalGeneration() {
  state.autoSignalInterval = setInterval(() => {
    refreshSignal();
  }, config.signalRefreshInterval);
}

// Event Listeners
function setupEventListeners() {
  elements.menuBtn.addEventListener('click', toggleMenu);
  elements.loginBtn.addEventListener('click', login);
  elements.verifySecurityCodeBtn.addEventListener('click', verifySecurityCode);
  elements.refreshSignalBtn.addEventListener('click', refreshSignal);
  elements.advancedAnalysisBtn.addEventListener('click', showAdvancedAnalysis);
  elements.logoutBtn.addEventListener('click', deactivateLicense);
  
  // Add menu item click handlers
  document.querySelectorAll('.menu-item[data-section]').forEach(item => {
    item.addEventListener('click', () => navigate(item.dataset.section));
  });
  
  // Update chart when pair changes
  elements.pairSelect.addEventListener('change', () => {
    updateChart();
    refreshSignal();
  });
}

// Initialize App
function init() {
  setupEventListeners();
  setInterval(updateTime, 1000);
  updateTime();
  
  if (localStorage.getItem("loggedIn") === "true") {
    const username = localStorage.getItem("username");
    const key = localStorage.getItem("licenseKey");
    
    if (key && localStorage.getItem(deactivated_${key})) {
      localStorage.clear();
      return;
    }
    
    elements.loginContainer.classList.add("hidden");
    elements.dashboard.classList.remove("hidden");
    elements.userNameDisplay.textContent = username;
    updateChart();
    refreshSignal();
    requestNotificationPermission();
    startAutoSignalGeneration();
  }
}

// Start the application
document.addEventListener('DOMContentLoaded', init);
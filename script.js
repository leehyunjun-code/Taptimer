// DOM 요소 선택
const timerBtn = document.getElementById('timerBtn');
const stopwatchBtn = document.getElementById('stopwatchBtn');
const timerSection = document.getElementById('timerSection');
const stopwatchSection = document.getElementById('stopwatchSection');

// 타이머 관련 요소
const timerHours = document.getElementById('timerHours');
const timerMinutes = document.getElementById('timerMinutes');
const timerSeconds = document.getElementById('timerSeconds');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const startTimerBtn = document.getElementById('startTimer');
const pauseTimerBtn = document.getElementById('pauseTimer');
const resetTimerBtn = document.getElementById('resetTimer');

// 스톱워치 관련 요소
const stopwatchMinutes = document.getElementById('stopwatchMinutes');
const stopwatchSeconds = document.getElementById('stopwatchSeconds');
const stopwatchMs = document.getElementById('stopwatchMs');
const startStopwatchBtn = document.getElementById('startStopwatch');
const pauseStopwatchBtn = document.getElementById('pauseStopwatch');
const resetStopwatchBtn = document.getElementById('resetStopwatch');
const lapBtn = document.getElementById('lapBtn');
const lapTimes = document.getElementById('lapTimes');

// 타이머 종료 오버레이 요소
const timerEndOverlay = document.getElementById('timerEndOverlay');
const timerEndText = document.getElementById('timerEndText');
const timerEndCloseBtn = document.getElementById('timerEndCloseBtn');

// 타이머 변수
let timerInterval;
let timerTotalSeconds = 0;
let timerRunning = false;

// 스톱워치 변수
let stopwatchInterval;
let stopwatchTime = 0;
let stopwatchRunning = false;
let lapCount = 0;
let lastLapTime = 0; // 마지막 랩의 시간을 저장

// 다크모드 관련 변수 - localStorage에서 불러오기
const themeToggleBtn = document.getElementById('themeToggleBtn');
let darkMode = localStorage.getItem('darkMode') === 'true' || false;

// 언어 관련 변수 및 텍스트 - localStorage에서 불러오기
const langToggleBtn = document.getElementById('langToggleBtn');
let currentLang = localStorage.getItem('currentLang') || 'ko'; // 기본값은 한국어

const translations = {
    ko: {
        timer: '타이머',
        stopwatch: '스톱워치',
        hours: '시간',
        minutes: '분',
        seconds: '초',
        start: '시작',
        pause: '일시정지',
        reset: '리셋',
        lap: '랩 기록',
        timerEnd: '타이머가 종료되었습니다!',
        lapText: '랩',
        sec10: '10초',
        min1: '1분',
        min5: '5분',
        min10: '10분',
        min30: '30분',
        hour1: '1시간',
		footerHome: '홈',
        footerGuide: '이용가이드',
        footerPrivacy: '개인정보 처리방침',
        // 사용방법 안내 번역 추가
        usageGuideTitle: '사용방법 안내',
        timerUsageTitle: '📱 무료 브라우저 타이머 사용법',
        timerStep1: '원하는 시간을 시간, 분, 초 입력란에 설정하세요.',
        timerStep2: '시작 버튼을 눌러 브라우저 타이머를 작동시키세요.',
        timerStep3: '타이머가 0에 도달하면 소리 알림이 표시됩니다.',
        timerTip: '팁: 빠른 설정 버튼(10초, 1분, 5분 등)을 사용하면 더 편리합니다! 이 무료 브라우저 타이머는 다운로드 없이 바로 사용 가능합니다.',
        stopwatchUsageTitle: '⏱️ 웹 스톱워치 사용법',
        stopwatchStep1: '상단의 \'스톱워치\' 탭을 클릭하여 모드를 전환하세요.',
        stopwatchStep2: '시작 버튼을 눌러 브라우저 스톱워치로 시간 측정을 시작하세요.',
        stopwatchStep3: '랩 기록 버튼으로 구간 시간을 기록할 수 있습니다.',
        stopwatchTip: '팁: 운동이나 달리기할 때 각 구간의 시간을 기록하고 비교해보세요! 이 웹 스톱워치는 정확한 시간 측정을 제공합니다.',
        usageExamplesTitle: '💡 브라우저 타이머 활용 예시',
        cookingTitle: '🍳 요리',
        cookingText: '라면 3분, 계란 삶기 6분, 스테이크 굽기 타이머',
        exerciseTitle: '💪 운동',
        exerciseText: 'HIIT 운동, 플랭크, 세트 간 휴식 시간 측정',
        studyTitle: '📚 공부',
        studyText: '포모도로 기법 (25분 집중 + 5분 휴식) 타이머',
        workTitle: '💼 업무',
        workText: '회의 시간, 집중 작업, 휴식 관리 도구',
        detailedGuideText: '더 자세한 무료 브라우저 타이머 사용법은',
        guideLink: '이용가이드',
        detailedGuideText2: '를 확인하세요!'
    },
    en: {
        timer: 'Timer',
        stopwatch: 'Stopwatch',
        hours: 'Hours',
        minutes: 'Min',
        seconds: 'Sec',
        start: 'Start',
        pause: 'Pause',
        reset: 'Reset',
        lap: 'Lap',
        timerEnd: 'Timer has ended!',
        lapText: 'Lap',
        sec10: '10s',
        min1: '1m',
        min5: '5m',
        min10: '10m',
        min30: '30m',
        hour1: '1h',
		footerHome: 'Home',
        footerGuide: 'User Guide',
        footerPrivacy: 'Privacy Policy',
        // 사용방법 안내 번역 추가
        usageGuideTitle: 'Usage Guide',
        timerUsageTitle: '📱 How to Use Free Browser Timer',
        timerStep1: 'Set your desired time in the hours, minutes, and seconds input fields.',
        timerStep2: 'Press the start button to activate the browser timer.',
        timerStep3: 'A sound alert will be displayed when the timer reaches 0.',
        timerTip: 'Tip: Use quick setting buttons (10s, 1m, 5m, etc.) for convenience! This free browser timer works without any download.',
        stopwatchUsageTitle: '⏱️ How to Use Web Stopwatch',
        stopwatchStep1: 'Click the \'Stopwatch\' tab at the top to switch modes.',
        stopwatchStep2: 'Press the start button to begin time measurement with browser stopwatch.',
        stopwatchStep3: 'Use the lap record button to record split times.',
        stopwatchTip: 'Tip: Record and compare split times during exercise or running! This web stopwatch provides accurate time measurement.',
        usageExamplesTitle: '💡 Browser Timer Usage Examples',
        cookingTitle: '🍳 Cooking',
        cookingText: 'Ramen 3min, Boiled eggs 6min, Steak grilling timer',
        exerciseTitle: '💪 Exercise',
        exerciseText: 'HIIT workouts, Plank, Rest time measurement between sets',
        studyTitle: '📚 Study',
        studyText: 'Pomodoro technique (25min focus + 5min break) timer',
        workTitle: '💼 Work',
        workText: 'Meeting time, Focused work, Break management tool',
        detailedGuideText: 'For more detailed free browser timer instructions, check the',
        guideLink: 'User Guide',
        detailedGuideText2: '!'
    }
};

// 모드 전환 이벤트 리스너
timerBtn.addEventListener('click', () => {
    timerBtn.classList.add('active');
    stopwatchBtn.classList.remove('active');
    timerSection.classList.add('active');
    stopwatchSection.classList.remove('active');
});

stopwatchBtn.addEventListener('click', () => {
    stopwatchBtn.classList.add('active');
    timerBtn.classList.remove('active');
    stopwatchSection.classList.add('active');
    timerSection.classList.remove('active');
});

// 테마 변경 이벤트 리스너 - localStorage에 저장
themeToggleBtn.addEventListener('click', () => {
    darkMode = !darkMode;
    localStorage.setItem('darkMode', darkMode.toString());
    updateTheme();
});

// 언어 전환 이벤트 리스너 - localStorage에 저장
langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'ko' ? 'en' : 'ko';
    localStorage.setItem('currentLang', currentLang);
    updateLanguage();
});

// 타이머 함수
function startTimer() {
    if (timerRunning) return;
    
    // 입력 값 가져오기
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    
    // 총 초로 변환
    timerTotalSeconds = hours * 3600 + minutes * 60 + seconds;
    
    // 입력값이 0이면 타이머 시작하지 않음
    if (timerTotalSeconds === 0) return;
    
    timerRunning = true;
    startTimerBtn.disabled = true;
    pauseTimerBtn.disabled = false;
    
    // 타이머 갱신 인터벌 설정
    timerInterval = setInterval(() => {
        if (timerTotalSeconds <= 0) {
            clearInterval(timerInterval);
            timerRunning = false;
            startTimerBtn.disabled = false;
            pauseTimerBtn.disabled = true;
            
            // 타이머 종료 알림 (오버레이 표시)
            timerEndText.textContent = translations[currentLang].timerEnd;
            timerEndOverlay.classList.add('show');
            return;
        }
        
        timerTotalSeconds--;
        updateTimerDisplay();
    }, 1000);
    
    updateTimerDisplay();
}

function pauseTimer() {
    if (!timerRunning) return;
    
    clearInterval(timerInterval);
    timerRunning = false;
    startTimerBtn.disabled = false;
    pauseTimerBtn.disabled = true;
}

function resetTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    timerTotalSeconds = 0;
    
    hoursInput.value = 0;
    minutesInput.value = 0;
    secondsInput.value = 0;
    
    startTimerBtn.disabled = false;
    pauseTimerBtn.disabled = true;
    
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const hours = Math.floor(timerTotalSeconds / 3600);
    const minutes = Math.floor((timerTotalSeconds % 3600) / 60);
    const seconds = timerTotalSeconds % 60;
    
    timerHours.textContent = formatTime(hours);
    timerMinutes.textContent = formatTime(minutes);
    timerSeconds.textContent = formatTime(seconds);
}

// 스톱워치 함수
function startStopwatch() {
    if (stopwatchRunning) return;
    
    stopwatchRunning = true;
    startStopwatchBtn.disabled = true;
    pauseStopwatchBtn.disabled = false;
    lapBtn.disabled = false;
    
    const startTime = Date.now() - stopwatchTime;
    
    stopwatchInterval = setInterval(() => {
        stopwatchTime = Date.now() - startTime;
        updateStopwatchDisplay();
    }, 10); // 10ms마다 업데이트 (밀리초 표시를 위해)
}

function pauseStopwatch() {
    if (!stopwatchRunning) return;
    
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    startStopwatchBtn.disabled = false;
    pauseStopwatchBtn.disabled = true;
    lapBtn.disabled = true;
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    stopwatchTime = 0;
    lapCount = 0;
    lastLapTime = 0; // 마지막 랩 시간도 리셋
    
    startStopwatchBtn.disabled = false;
    pauseStopwatchBtn.disabled = true;
    lapBtn.disabled = true;
    
    // 랩 타임 목록 비우기
    lapTimes.innerHTML = '';
    
    updateStopwatchDisplay();
}

function recordLap() {
    if (!stopwatchRunning) return;
    
    lapCount++;
    
    const minutes = Math.floor((stopwatchTime / 1000 / 60) % 60);
    const seconds = Math.floor((stopwatchTime / 1000) % 60);
    const milliseconds = Math.floor((stopwatchTime % 1000) / 10);
    
    // 총 경과 시간
    const totalTimeText = `${formatTime(minutes)}:${formatTime(seconds)}.${formatTime(milliseconds)}`;
    
    // 랩 간격 시간 계산 (현재 시간 - 마지막 랩 시간)
    const lapInterval = stopwatchTime - lastLapTime;
    const lapMinutes = Math.floor((lapInterval / 1000 / 60) % 60);
    const lapSeconds = Math.floor((lapInterval / 1000) % 60);
    const lapMilliseconds = Math.floor((lapInterval % 1000) / 10);
    const lapIntervalText = `${formatTime(lapMinutes)}:${formatTime(lapSeconds)}.${formatTime(lapMilliseconds)}`;
    
    // 현재 시간을 마지막 랩 시간으로 저장
    lastLapTime = stopwatchTime;
    
    const lapItem = document.createElement('li');
    lapItem.innerHTML = `
        <div>
            <span>${translations[currentLang].lapText} ${lapCount}</span>
        </div>
        <div>
            <span class="lap-interval">+${lapIntervalText}</span>
            <span class="total-time">${totalTimeText}</span>
        </div>
    `;
    
    // 새 랩을 목록 맨 위에 추가
    lapTimes.prepend(lapItem);
}

function updateStopwatchDisplay() {
    const minutes = Math.floor((stopwatchTime / 1000 / 60) % 60);
    const seconds = Math.floor((stopwatchTime / 1000) % 60);
    const milliseconds = Math.floor((stopwatchTime % 1000) / 10);
    
    stopwatchMinutes.textContent = formatTime(minutes);
    stopwatchSeconds.textContent = formatTime(seconds);
    stopwatchMs.textContent = formatTime(milliseconds);
}

// 테마 업데이트 함수
function updateTheme() {
    if (darkMode) {
        document.body.classList.add('dark-mode');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-mode');
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// 언어 업데이트 함수
function updateLanguage() {
    // 타이머/스톱워치 버튼
    timerBtn.textContent = translations[currentLang].timer;
    stopwatchBtn.textContent = translations[currentLang].stopwatch;
    
    // 라벨 업데이트
    document.querySelector('label[for="hours"]').textContent = translations[currentLang].hours;
    document.querySelector('label[for="minutes"]').textContent = translations[currentLang].minutes;
    document.querySelector('label[for="seconds"]').textContent = translations[currentLang].seconds;
    
    // 버튼 텍스트 업데이트
    startTimerBtn.innerHTML = `<i class="fas fa-play"></i> ${translations[currentLang].start}`;
    pauseTimerBtn.innerHTML = `<i class="fas fa-pause"></i> ${translations[currentLang].pause}`;
    resetTimerBtn.innerHTML = `<i class="fas fa-redo"></i> ${translations[currentLang].reset}`;
    
    startStopwatchBtn.innerHTML = `<i class="fas fa-play"></i> ${translations[currentLang].start}`;
    pauseStopwatchBtn.innerHTML = `<i class="fas fa-pause"></i> ${translations[currentLang].pause}`;
    resetStopwatchBtn.innerHTML = `<i class="fas fa-redo"></i> ${translations[currentLang].reset}`;
    
    lapBtn.innerHTML = `<i class="fas fa-flag"></i> ${translations[currentLang].lap}`;
    
    // 빠른 타이머 버튼 텍스트 업데이트
    const quickButtons = document.querySelectorAll('.quick-timer-btn');
    quickButtons.forEach(btn => {
        const seconds = parseInt(btn.getAttribute('data-seconds'));
        if (seconds === 10) btn.textContent = translations[currentLang].sec10;
        else if (seconds === 60) btn.textContent = translations[currentLang].min1;
        else if (seconds === 300) btn.textContent = translations[currentLang].min5;
        else if (seconds === 600) btn.textContent = translations[currentLang].min10;
        else if (seconds === 1800) btn.textContent = translations[currentLang].min30;
        else if (seconds === 3600) btn.textContent = translations[currentLang].hour1;
    });
    
    // 랩 텍스트 업데이트 (이미 기록된 랩)
    const lapItems = lapTimes.querySelectorAll('li');
    lapItems.forEach((item, index) => {
        const lapNumber = index + 1;
        const timeText = item.querySelector('span:last-child').textContent;
        item.querySelector('span:first-child').textContent = `${translations[currentLang].lapText} ${lapNumber}`;
    });
	
    // footer 링크 업데이트 코드 추가
    const footerHomeEl = document.getElementById('footerHome');
    const footerGuideEl = document.getElementById('footerGuide');
    const footerPrivacyEl = document.getElementById('footerPrivacy');
    
    if (footerHomeEl) {
        footerHomeEl.textContent = translations[currentLang].footerHome;
    }
    
    if (footerGuideEl) {
        footerGuideEl.textContent = translations[currentLang].footerGuide;
    }
    
    if (footerPrivacyEl) {
        footerPrivacyEl.textContent = translations[currentLang].footerPrivacy;
    }	
    
    // 사용방법 안내 섹션 번역 업데이트
    const usageGuideTitle = document.getElementById('usageGuideTitle');
    if (usageGuideTitle) {
        usageGuideTitle.textContent = translations[currentLang].usageGuideTitle;
    }
    
    const timerUsageTitle = document.getElementById('timerUsageTitle');
    if (timerUsageTitle) {
        timerUsageTitle.textContent = translations[currentLang].timerUsageTitle;
    }
    
    // 타이머 사용법 단계들
    const timerStep1El = document.getElementById('timerStep1');
    if (timerStep1El) {
        timerStep1El.textContent = translations[currentLang].timerStep1;
    }
    
    const timerStep2El = document.getElementById('timerStep2');
    if (timerStep2El) {
        timerStep2El.textContent = translations[currentLang].timerStep2;
    }
    
    const timerStep3El = document.getElementById('timerStep3');
    if (timerStep3El) {
        timerStep3El.textContent = translations[currentLang].timerStep3;
    }
    
    const timerTipEl = document.getElementById('timerTip');
    if (timerTipEl) {
        timerTipEl.innerHTML = `<strong>${translations[currentLang].timerTip}</strong>`;
    }
    
    const stopwatchUsageTitle = document.getElementById('stopwatchUsageTitle');
    if (stopwatchUsageTitle) {
        stopwatchUsageTitle.textContent = translations[currentLang].stopwatchUsageTitle;
    }
    
    // 스톱워치 사용법 단계들
    const stopwatchStep1El = document.getElementById('stopwatchStep1');
    if (stopwatchStep1El) {
        stopwatchStep1El.textContent = translations[currentLang].stopwatchStep1;
    }
    
    const stopwatchStep2El = document.getElementById('stopwatchStep2');
    if (stopwatchStep2El) {
        stopwatchStep2El.textContent = translations[currentLang].stopwatchStep2;
    }
    
    const stopwatchStep3El = document.getElementById('stopwatchStep3');
    if (stopwatchStep3El) {
        stopwatchStep3El.textContent = translations[currentLang].stopwatchStep3;
    }
    
    const stopwatchTipEl = document.getElementById('stopwatchTip');
    if (stopwatchTipEl) {
        stopwatchTipEl.innerHTML = `<strong>${translations[currentLang].stopwatchTip}</strong>`;
    }
    
    // 활용 예시 섹션
    const usageExamplesTitle = document.getElementById('usageExamplesTitle');
    if (usageExamplesTitle) {
        usageExamplesTitle.textContent = translations[currentLang].usageExamplesTitle;
    }
    
    const cookingTitle = document.getElementById('cookingTitle');
    if (cookingTitle) {
        cookingTitle.textContent = translations[currentLang].cookingTitle;
    }
    
    const cookingText = document.getElementById('cookingText');
    if (cookingText) {
        cookingText.textContent = translations[currentLang].cookingText;
    }
    
    const exerciseTitle = document.getElementById('exerciseTitle');
    if (exerciseTitle) {
        exerciseTitle.textContent = translations[currentLang].exerciseTitle;
    }
    
    const exerciseText = document.getElementById('exerciseText');
    if (exerciseText) {
        exerciseText.textContent = translations[currentLang].exerciseText;
    }
    
    const studyTitle = document.getElementById('studyTitle');
    if (studyTitle) {
        studyTitle.textContent = translations[currentLang].studyTitle;
    }
    
    const studyText = document.getElementById('studyText');
    if (studyText) {
        studyText.textContent = translations[currentLang].studyText;
    }
    
    const workTitle = document.getElementById('workTitle');
    if (workTitle) {
        workTitle.textContent = translations[currentLang].workTitle;
    }
    
    const workText = document.getElementById('workText');
    if (workText) {
        workText.textContent = translations[currentLang].workText;
    }
    
    // 상세 가이드 링크
    const detailedGuideText = document.getElementById('detailedGuideText');
    const guideLink = document.getElementById('guideLink');
    if (detailedGuideText && guideLink) {
        detailedGuideText.innerHTML = `${translations[currentLang].detailedGuideText} <a href="guide.html" id="guideLink">${translations[currentLang].guideLink}</a>${translations[currentLang].detailedGuideText2}`;
    }
    
    // 타이머 종료 텍스트도 업데이트
    timerEndText.textContent = translations[currentLang].timerEnd;
}

// 시간 포맷팅 함수 (두 자릿수로 표시)
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// 빠른 타이머 버튼 기능
const quickTimerBtns = document.querySelectorAll('.quick-timer-btn');

quickTimerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const seconds = parseInt(btn.getAttribute('data-seconds'));
        
        // 시, 분, 초로 변환
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        // 입력 필드에 값 설정
        hoursInput.value = hours;
        minutesInput.value = minutes;
        secondsInput.value = secs;
        
        // 타이머 디스플레이 업데이트
        timerTotalSeconds = seconds;
        updateTimerDisplay();
    });
});

// 이벤트 리스너
startTimerBtn.addEventListener('click', startTimer);
pauseTimerBtn.addEventListener('click', pauseTimer);
resetTimerBtn.addEventListener('click', resetTimer);

startStopwatchBtn.addEventListener('click', startStopwatch);
pauseStopwatchBtn.addEventListener('click', pauseStopwatch);
resetStopwatchBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);

// 오버레이 닫기 버튼 이벤트 리스너
timerEndCloseBtn.addEventListener('click', () => {
    timerEndOverlay.classList.remove('show');
});

// 페이지 로드시 저장된 설정 적용
document.addEventListener('DOMContentLoaded', () => {
    // 저장된 테마와 언어 설정 적용
    updateTheme();
    updateLanguage();
});

// 초기 화면 설정
updateTimerDisplay();
updateStopwatchDisplay();

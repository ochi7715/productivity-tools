const main = document.getElementById("main"),
      navWrapper = document.getElementById("nav-wrapper");

const toggleNav = () => {
  main.dataset.nav = main.dataset.nav === "true" ? "false" : "true";
  if (main.dataset.nav == "true") {
    navWrapper.style.opacity = 100;
  }
  else {
    navWrapper.style.opacity = 0;
  }
}

// Event listeners to each tab to switch between components
const worldClockTab = document.querySelector('#worldclock-tab');
const alarmTab = document.querySelector('#alarm-tab');
const timerTab = document.querySelector('#timer-tab');
const pomodoroTab = document.querySelector('#pomodoro-tab');
const stopwatchTab = document.querySelector('#stopwatch-tab');
const calendarTab = document.querySelector('#calendar-tab');
const todoListTab = document.querySelector('#todo-list-tab');


const worldClockComponent = document.querySelector('#worldclock-component');
const alarmComponent = document.querySelector('#alarm-component');
const timerComponent = document.querySelector('#timer-component');
const pomodoroComponent = document.querySelector('#pomodoro-component');
const stopwatchComponent = document.querySelector('#stopwatch-component');
const calendarComponent = document.querySelector('#calendar-component');
const todoListComponent = document.querySelector('#todo-list-component');

worldClockTab.addEventListener('click', () => {
    worldClockTab.classList.add('active');
    alarmTab.classList.remove('active');
    timerTab.classList.remove('active');
    pomodoroTab.classList.remove('active');
    stopwatchTab.classList.remove('active');
    calendarTab.classList.remove('active');
    todoListTab.classList.remove('active');

    worldClockComponent.classList.add('active');
    alarmComponent.classList.remove('active');
    timerComponent.classList.remove('active');
    pomodoroComponent.classList.remove('active');
    stopwatchComponent.classList.remove('active');
    calendarComponent.classList.remove('active');
    todoListComponent.classList.remove('active');
});

alarmTab.addEventListener('click', () => {
    worldClockTab.classList.remove('active');
    alarmTab.classList.add('active');
    timerTab.classList.remove('active');
    pomodoroTab.classList.remove('active');
    stopwatchTab.classList.remove('active');
    calendarTab.classList.remove('active');
    todoListTab.classList.remove('active');

    worldClockComponent.classList.remove('active');
    alarmComponent.classList.add('active');
    timerComponent.classList.remove('active');
    pomodoroComponent.classList.remove('active');
    stopwatchComponent.classList.remove('active');
    calendarComponent.classList.remove('active');
    todoListComponent.classList.remove('active');
});

timerTab.addEventListener('click', () => {
    worldClockTab.classList.remove('active');
    alarmTab.classList.remove('active');
    timerTab.classList.add('active');
    pomodoroTab.classList.remove('active');
    stopwatchTab.classList.remove('active');
    calendarTab.classList.remove('active');
    todoListTab.classList.remove('active');

    worldClockComponent.classList.remove('active');
    alarmComponent.classList.remove('active');
    timerComponent.classList.add('active');
    pomodoroComponent.classList.remove('active');
    stopwatchComponent.classList.remove('active');
    calendarComponent.classList.remove('active');
    todoListComponent.classList.remove('active');
});

pomodoroTab.addEventListener('click', () => {
    worldClockTab.classList.remove('active');
    alarmTab.classList.remove('active');
    timerTab.classList.remove('active');
    pomodoroTab.classList.add('active');
    stopwatchTab.classList.remove('active');
    calendarTab.classList.remove('active');
    todoListTab.classList.remove('active');

    worldClockComponent.classList.remove('active');
    alarmComponent.classList.remove('active');
    timerComponent.classList.remove('active');
    pomodoroComponent.classList.add('active');
    stopwatchComponent.classList.remove('active');
    calendarComponent.classList.remove('active');
    todoListComponent.classList.remove('active');
});

stopwatchTab.addEventListener('click', () => {
    worldClockTab.classList.remove('active');
    alarmTab.classList.remove('active');
    timerTab.classList.remove('active');
    pomodoroTab.classList.remove('active');
    stopwatchTab.classList.add('active');
    calendarTab.classList.remove('active');
    todoListTab.classList.remove('active');

    worldClockComponent.classList.remove('active');
    alarmComponent.classList.remove('active');
    timerComponent.classList.remove('active');
    pomodoroComponent.classList.remove('active');
    stopwatchComponent.classList.add('active');
    calendarComponent.classList.remove('active');
    todoListComponent.classList.remove('active');
});


calendarTab.addEventListener('click', () => {
    worldClockTab.classList.remove('active');
    alarmTab.classList.remove('active');
    timerTab.classList.remove('active');
    pomodoroTab.classList.remove('active');
    stopwatchTab.classList.remove('active');
    calendarTab.classList.add('active');
    todoListTab.classList.remove('active');

    worldClockComponent.classList.remove('active');
    alarmComponent.classList.remove('active');
    timerComponent.classList.remove('active');
    pomodoroComponent.classList.remove('active');
    stopwatchComponent.classList.remove('active');
    calendarComponent.classList.add('active');
    todoListComponent.classList.remove('active');
});

todoListTab.addEventListener('click', () => {
    worldClockTab.classList.remove('active');
    alarmTab.classList.remove('active');
    timerTab.classList.remove('active');
    pomodoroTab.classList.remove('active');
    stopwatchTab.classList.remove('active');
    calendarTab.classList.remove('active');
    todoListTab.classList.add('active');

    worldClockComponent.classList.remove('active');
    alarmComponent.classList.remove('active');
    timerComponent.classList.remove('active');
    pomodoroComponent.classList.remove('active');
    stopwatchComponent.classList.remove('active');
    calendarComponent.classList.remove('active');
    todoListComponent.classList.add('active');
});
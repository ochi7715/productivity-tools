const alarmList = document.querySelector(".alarmList");
const addAlarmBtn = document.querySelector("#addAlarmBtn");
const alarmModalCancelBtn = document.querySelector(".alarmModal-cancelBtn")
var alarmSound = new Audio('assets/timersound.mp3');

document.addEventListener('DOMContentLoaded', function () {
    loadAlarms();
}, false);

let alarms = [];

function addAlarm() {
    // Get the values from the form
    const time = alarmForm.alarmTimeInput.value;
    const notes = alarmForm.alarmNotesInput.value;
    const repeat = {
        week: alarmForm.repeatWeekInput.checked,
        day: alarmForm.repeatDayInput.checked,
        month: alarmForm.repeatMonthInput.checked,
        none: !alarmForm.repeatWeekInput.checked && !alarmForm.repeatDayInput.checked && !alarmForm.repeatMonthInput.checked,
    };

    const newAlarm = {
        id: "alarm" + alarms.length.toString(),
        time: militaryTo12HourTime(time),
        notes: notes,
        repeat: repeat,
        enabled: true,
    };

    alarms.push(newAlarm);
    saveAlarms();
    renderAlarm(newAlarm);
    alarmForm.reset();
    alarmModal.style.display = "none";
}

function loadAlarms() {
    const alarmsJSON = localStorage.getItem("alarms");
    if (alarmsJSON !== null) {
        alarms = JSON.parse(alarmsJSON);
    }
    // Render the alarms
    alarms.forEach((alarm) => {
        renderAlarm(alarm);
    });
}

function renderAlarm(alarm) {
    const alarmElement = document.createElement("div");
    alarmElement.classList.add("alarm");

    const timeElement = document.createElement("span");
    timeElement.classList.add("alarm-time");
    timeElement.textContent = alarm.time;
    alarmElement.appendChild(timeElement);

    const notesElement = document.createElement("span");
    notesElement.classList.add("alarm-notes");
    notesElement.textContent = alarm.notes;
    alarmElement.appendChild(notesElement);

    const controlsElement = document.createElement("div");
    controlsElement.classList.add("alarm-controls");

    const onOffSwitchContainer = document.createElement("div");
    onOffSwitchContainer.classList.add("onOffSwitchContainer")

    const onOffSwitch = document.createElement("input");
    onOffSwitch.type = "checkbox";
    onOffSwitch.classList.add("alarm-on-off-switch");
    onOffSwitch.id = ("alarm-on-off-switch" + alarm.time + alarm.notes);
    onOffSwitch.addEventListener("change", () => {
        toggleAlarm(alarm, onOffSwitch.checked);
    });

    const onOffSwitchLabel = document.createElement("label");
    onOffSwitchLabel.htmlFor = ("alarm-on-off-switch" + alarm.time + alarm.notes);
    onOffSwitchLabel.classList.add("switch");
    
    onOffSwitchContainer.appendChild(onOffSwitch)
    onOffSwitchContainer.appendChild(onOffSwitchLabel)
    controlsElement.appendChild(onOffSwitchContainer)

    const editBtn = document.createElement("button");
    editBtn.classList.add("alarm-edit-btn");
    editBtn.textContent = "EDIT";
    editBtn.addEventListener("click", () => {
        editAlarm(alarm);
    });
    controlsElement.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("alarm-delete-btn");
    deleteBtn.textContent = "DELETE";
    deleteBtn.addEventListener("click", () => {
        deleteAlarm(alarm);
    });
    controlsElement.appendChild(deleteBtn);

    alarmElement.appendChild(controlsElement);

    alarmList.appendChild(alarmElement);
}

function deleteAlarm(alarm) {
    const index = alarms.indexOf(alarm);
    if (index !== -1) {
        alarms.splice(index, 1);
        saveAlarms();
    }
    refreshAlarmList();
    saveAlarms();
    loadAlarms();
}

function toggleAlarm(alarm, on) {
    alarm.enabled = on;
    saveAlarms();
}

var editing = false;
var alarmBeingEdited;

function editAlarm(alarm) {
    alarmTimeInput.required = true;
    const alarmModal = document.getElementById("alarmModal");
    const alarmForm = alarmModal.querySelector("#alarmForm");
    const timeInput = alarmForm.querySelector("#alarmTimeInput");
    const notesInput = alarmForm.querySelector("#alarmNotesInput");
    const repeatNoneInput = alarmForm.querySelector("#repeatNoneInput");
    const repeatWeekInput = alarmForm.querySelector("#repeatWeekInput");
    const repeatDayInput = alarmForm.querySelector("#repeatDayInput");
    const repeatMonthInput = alarmForm.querySelector("#repeatMonthInput");

    timeInput.value = toMilitaryTime(alarm.time);
    notesInput.value = alarm.notes;
    repeatNoneInput.checked = !alarm.repeat.week && !alarm.repeat.day && !alarm.repeat.month;
    repeatWeekInput.checked = alarm.repeat.week;
    repeatDayInput.checked = alarm.repeat.day;
    repeatMonthInput.checked = alarm.repeat.month;

    alarmModal.style.display = "block";
    editing = true;
    alarmEditedid = alarm.id;
}

function saveAlarms() {
    const alarmsJSON = JSON.stringify(alarms);
    localStorage.setItem("alarms", alarmsJSON);
}

function refreshAlarmList() {
    const alarmList = document.querySelector("#alarm .alarmList");
    alarmList.innerHTML = "";
    alarms.forEach((alarm) => saveAlarms(alarm, alarmList));
}

addAlarmBtn.addEventListener("click", () => {
    alarmModal.style.display = "block";
    alarmTimeInput.required = true;
});

alarmForm.addEventListener("submit", (event) => {
    alarmTimeInput.required = true;
    if (editing) {
        const alarmModal = document.getElementById("alarmModal");
        const alarmForm = alarmModal.querySelector("#alarmForm");
        const timeInput = alarmForm.querySelector("#alarmTimeInput");
        const notesInput = alarmForm.querySelector("#alarmNotesInput");
        const repeatWeekInput = alarmForm.querySelector("#repeatWeekInput");
        const repeatDayInput = alarmForm.querySelector("#repeatDayInput");
        const repeatMonthInput = alarmForm.querySelector("#repeatMonthInput");
        var alarmBeingEdited = alarms[parseInt(alarmEditedid.slice(-1))];
        timeInput.focus();
        alarmBeingEdited.time = militaryTo12HourTime(timeInput.value);
        alarmBeingEdited.notes = notesInput.value;
        alarmBeingEdited.repeat.week = repeatWeekInput.checked;
        alarmBeingEdited.repeat.day = repeatDayInput.checked;
        alarmBeingEdited.repeat.month = repeatMonthInput.checked;
        alarmBeingEdited.repeat.none = !repeatMonthInput.checked && !repeatDayInput.checked && !repeatWeekInput.checked;

        event.preventDefault();

        alarmModal.style.display = "none";
        // update the alarm list display
        refreshAlarmList();
        saveAlarms();
        loadAlarms();
        editing = false;
    }
    else if (!editing) {
        const alarmModal = document.getElementById("alarmModal");
        const alarmForm = alarmModal.querySelector("#alarmForm");
        const timeInput = alarmForm.querySelector("#alarmTimeInput");
        const notesInput = alarmForm.querySelector("#alarmNotesInput");
        const repeatWeekInput = alarmForm.querySelector("#repeatWeekInput");
        const repeatDayInput = alarmForm.querySelector("#repeatDayInput");
        const repeatMonthInput = alarmForm.querySelector("#repeatMonthInput");

        event.preventDefault();
        const timeValue = militaryTo12HourTime(timeInput.value);
        const notesValue = notesInput.value;
        const repeatWeekValue = repeatWeekInput.checked;
        const repeatDayValue = repeatDayInput.checked;
        const repeatMonthValue = repeatMonthInput.checked;

        const newAlarm = {
            time: timeValue,
            notes: notesValue,
            repeatWeek: repeatWeekValue,
            repeatDay: repeatDayValue,
            repeatMonth: repeatMonthValue,
            on: true,
        };
        addAlarm(newAlarm);
        alarmModal.style.display = "none";
    }
    else {
        console.log("error")
    }
});

alarmModalCancelBtn.addEventListener("click", function (event) {
    alarmModal.style.display = "none";
    alarmTimeInput.required = false;
});

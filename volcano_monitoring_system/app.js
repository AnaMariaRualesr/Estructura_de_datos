var SeismicReading = /** @class */ (function () {
    function SeismicReading(id, magnitude) {
        this.id = id;
        this.magnitude = magnitude;
        this.timestamp = new Date();
    }
    return SeismicReading;
}());
var Queue = /** @class */ (function () {
    function Queue() {
        this.items = [];
    }
    Queue.prototype.enqueue = function (item) {
        this.items.push(item);
    };
    Queue.prototype.dequeue = function () {
        return this.items.shift();
    };
    Queue.prototype.isEmpty = function () {
        return this.items.length === 0;
    };
    Queue.prototype.getItems = function () {
        return this.items;
    };
    return Queue;
}());
var VolcanoMonitoringSystem = /** @class */ (function () {
    function VolcanoMonitoringSystem() {
        this.currentId = 1;
        this.readingQueue = new Queue();
    }
    VolcanoMonitoringSystem.prototype.receiveReading = function (magnitude) {
        var reading = new SeismicReading(this.currentId++, magnitude);
        this.readingQueue.enqueue(reading);
    };
    VolcanoMonitoringSystem.prototype.analyzeNextReading = function () {
        if (this.readingQueue.isEmpty()) {
            return "No readings to analyze.";
        }
        var reading = this.readingQueue.dequeue();
        if (reading.magnitude >= 7) {
            return "\uD83D\uDD34 RED ALERT! Magnitude ".concat(reading.magnitude);
        }
        else if (reading.magnitude >= 5) {
            return "\uD83D\uDFE1 Yellow Alert. Magnitude ".concat(reading.magnitude);
        }
        else {
            return "\uD83D\uDFE2 Normal activity. Magnitude ".concat(reading.magnitude);
        }
    };
    VolcanoMonitoringSystem.prototype.getPendingReadings = function () {
        return this.readingQueue.getItems();
    };
    return VolcanoMonitoringSystem;
}());
var system = new VolcanoMonitoringSystem();
var magnitudeInput = document.getElementById("magnitudeInput");
var addReadingBtn = document.getElementById("addReadingBtn");
var analyzeBtn = document.getElementById("analyzeBtn");
var queueList = document.getElementById("queueList");
var alertMessage = document.getElementById("alertMessage");
function updateQueueUI() {
    queueList.innerHTML = "";
    system.getPendingReadings().forEach(function (reading) {
        var li = document.createElement("li");
        li.textContent = "Reading ".concat(reading.id, " - Magnitude ").concat(reading.magnitude);
        queueList.appendChild(li);
    });
}
addReadingBtn.addEventListener("click", function () {
    var magnitude = Number(magnitudeInput.value);
    if (!magnitude)
        return;
    system.receiveReading(magnitude);
    magnitudeInput.value = "";
    updateQueueUI();
});
analyzeBtn.addEventListener("click", function () {
    var result = system.analyzeNextReading();
    alertMessage.textContent = result;
    updateQueueUI();
});

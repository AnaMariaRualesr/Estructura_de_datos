class SeismicReading {
    public id: number;
    public magnitude: number;
    public timestamp: Date;

    constructor(id: number, magnitude: number) {
        this.id = id;
        this.magnitude = magnitude;
        this.timestamp = new Date();
    }
}

class Queue<T> {
    private items: T[] = [];

    enqueue(item: T): void {
        this.items.push(item);
    }

    dequeue(): T | undefined {
        return this.items.shift();
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    getItems(): T[] {
        return this.items;
    }
}

class VolcanoMonitoringSystem {
    private readingQueue: Queue<SeismicReading>;
    private currentId: number = 1;

    constructor() {
        this.readingQueue = new Queue<SeismicReading>();
    }

    receiveReading(magnitude: number): void {
        const reading = new SeismicReading(this.currentId++, magnitude);
        this.readingQueue.enqueue(reading);
    }

    analyzeNextReading(): string {
        if (this.readingQueue.isEmpty()) {
            return "No readings to analyze.";
        }

        const reading = this.readingQueue.dequeue()!;

        if (reading.magnitude >= 7) {
            return `🔴 RED ALERT! Magnitude ${reading.magnitude}`;
        } else if (reading.magnitude >= 5) {
            return `🟡 Yellow Alert. Magnitude ${reading.magnitude}`;
        } else {
            return `🟢 Normal activity. Magnitude ${reading.magnitude}`;
        }
    }

    getPendingReadings(): SeismicReading[] {
        return this.readingQueue.getItems();
    }
}

const system = new VolcanoMonitoringSystem();

const magnitudeInput = document.getElementById("magnitudeInput") as HTMLInputElement;
const addReadingBtn = document.getElementById("addReadingBtn") as HTMLButtonElement;
const analyzeBtn = document.getElementById("analyzeBtn") as HTMLButtonElement;
const queueList = document.getElementById("queueList") as HTMLUListElement;
const alertMessage = document.getElementById("alertMessage") as HTMLParagraphElement;

function updateQueueUI(): void {
    queueList.innerHTML = "";
    system.getPendingReadings().forEach(reading => {
        const li = document.createElement("li");
        li.textContent = `Reading ${reading.id} - Magnitude ${reading.magnitude}`;
        queueList.appendChild(li);
    });
}

addReadingBtn.addEventListener("click", () => {
    const magnitude = Number(magnitudeInput.value);
    if (!magnitude) return;

    system.receiveReading(magnitude);
    magnitudeInput.value = "";
    updateQueueUI();
});

analyzeBtn.addEventListener("click", () => {
    const result = system.analyzeNextReading();
    alertMessage.textContent = result;
    updateQueueUI();
});
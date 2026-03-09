/* script.js - Hardware-Linked Controller */

class NexusSystem {
    constructor() {
        this.nodes = {
            cpuVal: document.getElementById('cpu-val'),
            memVal: document.getElementById('mem-val'),
            memBar: document.getElementById('mem-bar'),
            maxCpu: document.getElementById('max-cpu') // New element for UI
        };

        this.history = {
            maxCpu: localStorage.getItem('maxCpu') || 0
        };

        this.init();
    }

    init() {
        this.updateUI();
        this.stream();
    }

    async getStats() {
        try {
            // Attempt to talk to your Node.js backend
            const response = await fetch('http://localhost:3000/stats');
            return await response.json();
        } catch (err) {
            // Fallback to random if server is offline
            return {
                cpu: (Math.random() * 100).toFixed(1),
                mem: (Math.random() * 100).toFixed(1),
                rawMem: (Math.random() * 16).toFixed(1)
            };
        }
    }

    async stream() {
        const data = await this.getStats();

        // Check for new High Scores (LocalStorage Logic)
        if (parseFloat(data.cpu) > this.history.maxCpu) {
            this.history.maxCpu = data.cpu;
            localStorage.setItem('maxCpu', this.history.maxCpu);
        }

        // DOM Updates
        this.nodes.cpuVal.innerText = data.cpu;
        this.nodes.memVal.innerText = data.rawMem;
        this.nodes.memBar.style.width = `${data.mem}%`;
        
        // Recursive call for real-time feel
        setTimeout(() => this.stream(), 1000);
    }

    updateUI() {
        console.log(`System Initialized. Peak CPU Recorded: ${this.history.maxCpu}%`);
    }
}

document.addEventListener('DOMContentLoaded', () => new NexusSystem());
// // Enhanced animations and effects
// class Animations {
//     static createParticles() {
//         const particles = document.getElementById('particles');
//         for (let i = 0; i < 50; i++) {
//             const particle = document.createElement('div');
//             particle.className = 'particle';
//             particle.style.left = `${Math.random() * 100}%`;
//             particle.style.animationDelay = `${Math.random() * 15}s`;
//             particle.style.animationDuration = `${15 + Math.random() * 10}s`;
//             particles.appendChild(particle);
//         }
//     }
    
//     static createRipple(e) {
//         const ripple = document.createElement('div');
//         ripple.className = 'ripple';
//         const rect = e.currentTarget.getBoundingClientRect();
//         ripple.style.left = `${e.clientX - rect.left}px`;
//         ripple.style.top = `${e.clientY - rect.top}px`;
//         e.currentTarget.appendChild(ripple);
//         setTimeout(() => ripple.remove(), 600);
//     }
    
//     static createSparkle(x, y) {
//         const sparkle = document.createElement('div');
//         sparkle.className = 'sparkle';
//         sparkle.style.left = `${x}px`;
//         sparkle.style.top = `${y}px`;
//         document.body.appendChild(sparkle);
//         setTimeout(() => sparkle.remove(), 1000);
//     }
    
//     static showNotification(message) {
//         const notification = document.getElementById('notification');
//         notification.querySelector('span').textContent = message;
//         notification.classList.add('show');
//         setTimeout(() => notification.classList.remove('show'), 3000);
//     }
    
//     static animateNumber(element, start, end, duration) {
//         let startTime = null;
//         const step = (timestamp) => {
//             if (!startTime) startTime = timestamp;
//             const progress = Math.min((timestamp - startTime) / duration, 1);
//             const value = Math.floor(progress * (end - start) + start);
//             element.textContent = value;
//             if (progress < 1) requestAnimationFrame(step);
//         };
//         requestAnimationFrame(step);
//     }
// }

// // Disk Scheduling Logic
// class DiskScheduler {
//     static getRequests() {
//         const raw = document.getElementById('req').value.split(',');
//         return raw.map(x => parseInt(x.trim())).filter(x => !isNaN(x));
//     }
    
//     static bubbleSort(arr) {
//         for (let i = 0; i < arr.length - 1; i++) {
//             for (let j = 0; j < arr.length - i - 1; j++) {
//                 if (arr[j] > arr[j + 1]) {
//                     [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
//                 }
//             }
//         }
//         return arr;
//     }
    

//     // FCFS Algorithm:

//     static FCFS(requests, head) {
//         let total = 0;
//         const path = [head];
//         for (let req of requests) {
//             total += Math.abs(head - req);
//             head = req;
//             path.push(req);
//         }
//         return { total, avg: (total/requests.length).toFixed(2), path: path.join(' → ') };
//     }
    
//     // SSTF Algorithm:
//     static SSTF(requests, head) {
//         const used = new Array(requests.length).fill(false);
//         let total = 0, count = 0;
//         const path = [head];
        
//         while (count < requests.length) {
//             let minDist = Infinity, minIndex = -1;
//             for (let i = 0; i < requests.length; i++) {
//                 if (!used[i]) {
//                     const dist = Math.abs(head - requests[i]);
//                     if (dist < minDist) {
//                         minDist = dist;
//                         minIndex = i;
//                     }
//                 }
//             }
//             used[minIndex] = true;
//             total += minDist;
//             head = requests[minIndex];
//             path.push(head);
//             count++;
//         }
//         return { total, avg: (total/requests.length).toFixed(2), path: path.join(' → ') };
//     }
    
//     // SCAN Algorithm:

//     static SCAN(requests, head, direction, diskSize) {
//         const left = [], right = [];
//         for (let req of requests) {
//             if (req < head) left.push(req);
//             else right.push(req);
//         }
//         this.bubbleSort(left);
//         this.bubbleSort(right);
        
//         let total = 0;
//         const path = [head];
        
//         if (direction === 1) {
//             for (let req of right) {
//                 total += Math.abs(head - req);
//                 head = req;
//                 path.push(req);
//             }
//             if (head !== diskSize - 1) {
//                 total += Math.abs(head - (diskSize - 1));
//                 head = diskSize - 1;
//                 path.push(head);
//             }
//             for (let i = left.length - 1; i >= 0; i--) {
//                 total += Math.abs(head - left[i]);
//                 head = left[i];
//                 path.push(head);
//             }
//         } else {
//             for (let i = left.length - 1; i >= 0; i--) {
//                 total += Math.abs(head - left[i]);
//                 head = left[i];
//                 path.push(head);
//             }
//             if (head !== 0) {
//                 total += Math.abs(head - 0);
//                 head = 0;
//                 path.push(head);
//             }
//             for (let req of right) {
//                 total += Math.abs(head - req);
//                 head = req;
//                 path.push(req);
//             }
//         }
//         return { total, avg: (total/requests.length).toFixed(2), path: path.join(' → ') };
//     }
    
//     // C-SCAN Algorithm:

//     static CSCAN(requests, head, direction, diskSize) {
//         const left = [], right = [];
//         for (let req of requests) {
//             if (req < head) left.push(req);
//             else right.push(req);
//         }
//         this.bubbleSort(left);
//         this.bubbleSort(right);
        
//         let total = 0;
//         const path = [head];
        
//         if (direction === 1) {
//             for (let req of right) {
//                 total += Math.abs(head - req);
//                 head = req;
//                 path.push(req);
//             }
//             if (head !== diskSize - 1) {
//                 total += Math.abs(head - (diskSize - 1));
//                 head = diskSize - 1;
//                 path.push(head);
//             }
//             if (left.length > 0) {
//                 total += Math.abs(head - 0);
//                 head = 0;
//                 path.push(head);
//             }
//             for (let req of left) {
//                 total += Math.abs(head - req);
//                 head = req;
//                 path.push(req);
//             }
//         } else {
//             for (let i = left.length - 1; i >= 0; i--) {
//                 total += Math.abs(head - left[i]);
//                 head = left[i];
//                 path.push(head);
//             }
//             if (head !== 0) {
//                 total += Math.abs(head - 0);
//                 head = 0;
//                 path.push(head);
//             }
//             if (right.length > 0) {
//                 total += Math.abs(head - (diskSize - 1));
//                 head = diskSize - 1;
//                 path.push(head);
//             }
//             for (let i = right.length - 1; i >= 0; i--) {
//                 total += Math.abs(head - right[i]);
//                 head = right[i];
//                 path.push(head);
//             }
//         }
//         return { total, avg: (total/requests.length).toFixed(2), path: path.join(' → ') };
//     }
// }

// // UI Controller
// class UIController {
//     static initialize() {
//         this.updateTrack();
//         this.setInitialPointer();
        
//         // Add input listeners
//         document.getElementById('disk').addEventListener('change', () => {
//             this.updateTrack();
//             this.setInitialPointer();
//         });
        
//         document.getElementById('head').addEventListener('change', () => {
//             this.setInitialPointer();
//         });
//     }
    
//     static updateTrack() {
//         const diskSize = parseInt(document.getElementById('disk').value);
//         document.getElementById('disk-size-label').textContent = diskSize;
        
//         // Clear existing request dots
//         document.querySelectorAll('.request-dot').forEach(dot => dot.remove());
//     }
    
//     static setInitialPointer() {
//         const head = parseInt(document.getElementById('head').value);
//         const diskSize = parseInt(document.getElementById('disk').value);
//         const pointer = document.getElementById('pointer');
//         const leftPos = Math.min((head / diskSize) * 100, 100);
//         pointer.style.left = `calc(${leftPos}% - 16px)`;
//     }
    
//     static showRequestDots(requests) {
//         const diskSize = parseInt(document.getElementById('disk').value);
//         const track = document.getElementById('track');
        
//         requests.forEach(req => {
//             const dot = document.createElement('div');
//             dot.className = 'request-dot';
//             dot.style.left = `${(req / diskSize) * 100}%`;
//             dot.style.backgroundColor = this.getColorForRequest(req);
//             track.appendChild(dot);
//         });
//     }
    
//     static getColorForRequest(req) {
//         const colors = ['#ff3366', '#ffcc00', '#00ffcc', '#9966ff'];
//         return colors[req % colors.length];
//     }
    
//     static async animateHeadMovement(path, algorithm) {
//         const pointer = document.getElementById('pointer');
//         const diskSize = parseInt(document.getElementById('disk').value);
//         const algoBox = document.getElementById(`${algorithm}-box`);
        
//         // Highlight algorithm box
//         algoBox.style.transform = 'scale(1.05)';
//         algoBox.style.boxShadow = '0 25px 50px rgba(0,0,0,0.4)';
        
//         for (let i = 0; i < path.length - 1; i++) {
//             const from = path[i];
//             const to = path[i + 1];
//             const leftPos = (to / diskSize) * 100;
            
//             // Animate pointer movement
//             pointer.style.left = `calc(${Math.min(leftPos, 100)}% - 16px)`;
            
//             // Create movement trail
//             this.createTrail(from, to, diskSize);
            
//             // Add sparkle effect
//             const trackRect = document.getElementById('track').getBoundingClientRect();
//             const x = trackRect.left + (to / diskSize) * trackRect.width;
//             const y = trackRect.top + trackRect.height / 2;
//             Animations.createSparkle(x, y);
            
//             await new Promise(r => setTimeout(r, 300));
//         }
        
//         // Reset algorithm box
//         setTimeout(() => {
//             algoBox.style.transform = '';
//             algoBox.style.boxShadow = '';
//         }, 500);
//     }
    
//     static createTrail(from, to, diskSize) {
//         const track = document.getElementById('track');
//         const trail = document.createElement('div');
//         trail.style.position = 'absolute';
//         trail.style.height = '8px';
//         trail.style.background = 'linear-gradient(90deg, #00ffcc, transparent)';
//         trail.style.top = '4px';
//         trail.style.borderRadius = '4px';
//         trail.style.opacity = '0.7';
//         trail.style.zIndex = '5';
        
//         const leftStart = Math.min((from / diskSize) * 100, 100);
//         const leftEnd = Math.min((to / diskSize) * 100, 100);
        
//         if (leftStart < leftEnd) {
//             trail.style.left = `${leftStart}%`;
//             trail.style.width = `${leftEnd - leftStart}%`;
//         } else {
//             trail.style.left = `${leftEnd}%`;
//             trail.style.width = `${leftStart - leftEnd}%`;
//         }
        
//         track.appendChild(trail);
        
//         // Fade out trail
//         setTimeout(() => {
//             trail.style.transition = 'opacity 0.5s ease';
//             trail.style.opacity = '0';
//             setTimeout(() => trail.remove(), 500);
//         }, 300);
//     }
    
//     static updateResults(results) {
//         // Update FCFS
//         document.getElementById('fcfs-total').textContent = results.fcfs.total;
//         document.getElementById('fcfs-avg').textContent = results.fcfs.avg;
//         document.getElementById('fcfs-throughput').textContent = results.fcfs.path.split('→').length - 1;
//         document.getElementById('fcfs-path').innerHTML = `<i class="fas fa-route"></i> ${results.fcfs.path}`;
        
//         // Update SSTF
//         document.getElementById('sstf-total').textContent = results.sstf.total;
//         document.getElementById('sstf-avg').textContent = results.sstf.avg;
//         document.getElementById('sstf-throughput').textContent = results.sstf.path.split('→').length - 1;
//         document.getElementById('sstf-path').innerHTML = `<i class="fas fa-route"></i> ${results.sstf.path}`;
        
//         // Update SCAN
//         document.getElementById('scan-total').textContent = results.scan.total;
//         document.getElementById('scan-avg').textContent = results.scan.avg;
//         document.getElementById('scan-throughput').textContent = results.scan.path.split('→').length - 1;
//         document.getElementById('scan-path').innerHTML = `<i class="fas fa-route"></i> ${results.scan.path}`;
        
//         // Update C-SCAN
//         document.getElementById('cscan-total').textContent = results.cscan.total;
//         document.getElementById('cscan-avg').textContent = results.cscan.avg;
//         document.getElementById('cscan-throughput').textContent = results.cscan.path.split('→').length - 1;
//         document.getElementById('cscan-path').innerHTML = `<i class="fas fa-route"></i> ${results.cscan.path}`;
        
//         // Animate numbers
//         ['fcfs', 'sstf', 'scan', 'cscan'].forEach(algo => {
//             const totalEl = document.getElementById(`${algo}-total`);
//             const start = parseInt(totalEl.textContent) || 0;
//             const end = results[algo].total;
//             Animations.animateNumber(totalEl, start, end, 1000);
//         });
//     }
    
//     static updateChart(results) {
//         const totals = [
//             results.fcfs.total,
//             results.sstf.total,
//             results.scan.total,
//             results.cscan.total
//         ];
        
//         const maxTotal = Math.max(...totals);
        
//         // Animate bars with delay
//         ['fcfs', 'sstf', 'scan', 'cscan'].forEach((algo, index) => {
//             setTimeout(() => {
//                 const bar = document.getElementById(`${algo}-bar`);
//                 const valueEl = document.getElementById(`${algo}-bar-value`);
//                 const height = maxTotal > 0 ? (results[algo].total / maxTotal) * 100 : 0;
                
//                 bar.style.height = `${height}%`;
//                 valueEl.textContent = results[algo].total;
                
//                 // Animate value
//                 Animations.animateNumber(valueEl, 0, results[algo].total, 800);
//             }, index * 300);
//         });
//     }
    
//     static reset() {
//         // Reset inputs
//         document.getElementById('req').value = '98, 183, 37, 122, 14, 124, 65, 67';
//         document.getElementById('head').value = '53';
//         document.getElementById('disk').value = '200';
//         document.getElementById('dir').value = '1';
        
//         // Reset results
//         ['fcfs', 'sstf', 'scan', 'cscan'].forEach(algo => {
//             document.getElementById(`${algo}-total`).textContent = '-';
//             document.getElementById(`${algo}-avg`).textContent = '-';
//             document.getElementById(`${algo}-throughput`).textContent = '-';
//             document.getElementById(`${algo}-path`).innerHTML = `<i class="fas fa-route"></i> Path will appear here...`;
//             document.getElementById(`${algo}-bar`).style.height = '0%';
//             document.getElementById(`${algo}-bar-value`).textContent = '0';
//         });
        
//         // Clear request dots
//         document.querySelectorAll('.request-dot').forEach(dot => dot.remove());
        
//         // Reset pointer
//         this.setInitialPointer();
//         this.updateTrack();
        
//         Animations.showNotification('Simulation reset to default values');
//     }
// }

// // Main simulation function
// async function runSimulation() {
//     const requests = DiskScheduler.getRequests();
//     const head = parseInt(document.getElementById('head').value);
//     const diskSize = parseInt(document.getElementById('disk').value);
//     const direction = parseInt(document.getElementById('dir').value);
    
//     if (requests.length === 0) {
//         Animations.showNotification('Please enter valid disk requests');
//         return;
//     }
    
//     // Clear previous dots and update UI
//     document.querySelectorAll('.request-dot').forEach(dot => dot.remove());
//     UIController.showRequestDots(requests);
    
//     // Calculate results
//     const results = {
//         fcfs: DiskScheduler.FCFS([...requests], head),
//         sstf: DiskScheduler.SSTF([...requests], head),
//         scan: DiskScheduler.SCAN([...requests], head, direction, diskSize),
//         cscan: DiskScheduler.CSCAN([...requests], head, direction, diskSize)
//     };
    
//     // Update UI with results
//     UIController.updateResults(results);
//     UIController.updateChart(results);
    
//     // Animate each algorithm
//     const algorithms = ['fcfs', 'sstf', 'scan', 'cscan'];
//     for (const algo of algorithms) {
//         const path = results[algo].path.split(' → ').map(Number);
//         await UIController.animateHeadMovement(path, algo);
//         await new Promise(r => setTimeout(r, 800));
//     }
    
//     Animations.showNotification('All algorithms simulated successfully!');
// }

// // Initialize
// document.addEventListener('DOMContentLoaded', () => {
//     Animations.createParticles();
    
//     // Add ripple effect to buttons
//     document.querySelectorAll('button').forEach(btn => {
//         btn.addEventListener('click', (e) => Animations.createRipple(e));
//     });
    
//     // Add sparkle effect on inputs focus
//     document.querySelectorAll('input, select').forEach(input => {
//         input.addEventListener('focus', (e) => {
//             const rect = e.target.getBoundingClientRect();
//             Animations.createSparkle(rect.right - 10, rect.top + rect.height / 2);
//         });
//     });
    
//     UIController.initialize();
    
//     // Add event listeners
//     document.getElementById('run-btn').addEventListener('click', runSimulation);
//     document.getElementById('reset-btn').addEventListener('click', () => UIController.reset());
    
//     // Add keyboard shortcuts
//     document.addEventListener('keydown', (e) => {
//         if (e.ctrlKey && e.key === 'Enter') {
//             runSimulation();
//         }
//         if (e.key === 'Escape') {
//             UIController.reset();
//         }
//     });
// });




// Enhanced animations and effects
class Animations {
    static createParticles() {
        const particles = document.getElementById('particles');
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 15}s`;
            particle.style.animationDuration = `${15 + Math.random() * 10}s`;
            particles.appendChild(particle);
        }
    }
    
    static createRipple(e) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        const rect = e.currentTarget.getBoundingClientRect();
        ripple.style.left = `${e.clientX - rect.left}px`;
        ripple.style.top = `${e.clientY - rect.top}px`;
        e.currentTarget.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }
    
    static createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    }
    
    static showNotification(message) {
        const notification = document.getElementById('notification');
        notification.querySelector('span').textContent = message;
        notification.classList.add('show');
        setTimeout(() => notification.classList.remove('show'), 3000);
    }
    
    static animateNumber(element, start, end, duration) {
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value;
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }
}

// Disk Scheduling Logic
class DiskScheduler {
    static getRequests() {
        const raw = document.getElementById('req').value.split(',');
        return raw.map(x => parseInt(x.trim())).filter(x => !isNaN(x));
    }
    
    static bubbleSort(arr) {
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
            }
        }
        return arr;
    }
    
    static FCFS(requests, head) {
        let total = 0;
        const path = [head];
        for (let req of requests) {
            total += Math.abs(head - req);
            head = req;
            path.push(req);
        }
        return { total, avg: (total/requests.length).toFixed(2), path: path.join(' → ') };
    }
    
    static SSTF(requests, head) {
        const used = new Array(requests.length).fill(false);
        let total = 0, count = 0;
        const path = [head];
        
        while (count < requests.length) {
            let minDist = Infinity, minIndex = -1;
            for (let i = 0; i < requests.length; i++) {
                if (!used[i]) {
                    const dist = Math.abs(head - requests[i]);
                    if (dist < minDist) {
                        minDist = dist;
                        minIndex = i;
                    }
                }
            }
            used[minIndex] = true;
            total += minDist;
            head = requests[minIndex];
            path.push(head);
            count++;
        }
        return { total, avg: (total/requests.length).toFixed(2), path: path.join(' → ') };
    }
    
    static SCAN(requests, head, direction, diskSize) {
        const left = [], right = [];
        for (let req of requests) {
            if (req < head) left.push(req);
            else right.push(req);
        }
        this.bubbleSort(left);
        this.bubbleSort(right);
        
        let total = 0;
        const path = [head];
        
        if (direction === 1) {
            for (let req of right) {
                total += Math.abs(head - req);
                head = req;
                path.push(req);
            }
            if (head !== diskSize - 1) {
                total += Math.abs(head - (diskSize - 1));
                head = diskSize - 1;
                path.push(head);
            }
            for (let i = left.length - 1; i >= 0; i--) {
                total += Math.abs(head - left[i]);
                head = left[i];
                path.push(head);
            }
        } else {
            for (let i = left.length - 1; i >= 0; i--) {
                total += Math.abs(head - left[i]);
                head = left[i];
                path.push(head);
            }
            if (head !== 0) {
                total += Math.abs(head - 0);
                head = 0;
                path.push(head);
            }
            for (let req of right) {
                total += Math.abs(head - req);
                head = req;
                path.push(req);
            }
        }
        return { total, avg: (total/requests.length).toFixed(2), path: path.join(' → ') };
    }
    
    static CSCAN(requests, head, direction, diskSize) {
        const left = [], right = [];
        for (let req of requests) {
            if (req < head) left.push(req);
            else right.push(req);
        }
        this.bubbleSort(left);
        this.bubbleSort(right);
        
        let total = 0;
        const path = [head];
        
        if (direction === 1) {
            for (let req of right) {
                total += Math.abs(head - req);
                head = req;
                path.push(req);
            }
            if (head !== diskSize - 1) {
                total += Math.abs(head - (diskSize - 1));
                head = diskSize - 1;
                path.push(head);
            }
            if (left.length > 0) {
                total += Math.abs(head - 0);
                head = 0;
                path.push(head);
            }
            for (let req of left) {
                total += Math.abs(head - req);
                head = req;
                path.push(req);
            }
        } else {
            for (let i = left.length - 1; i >= 0; i--) {
                total += Math.abs(head - left[i]);
                head = left[i];
                path.push(head);
            }
            if (head !== 0) {
                total += Math.abs(head - 0);
                head = 0;
                path.push(head);
            }
            if (right.length > 0) {
                total += Math.abs(head - (diskSize - 1));
                head = diskSize - 1;
                path.push(head);
            }
            for (let i = right.length - 1; i >= 0; i--) {
                total += Math.abs(head - right[i]);
                head = right[i];
                path.push(head);
            }
        }
        return { total, avg: (total/requests.length).toFixed(2), path: path.join(' → ') };
    }
}

// UI Controller
class UIController {
    static initialize() {
        this.updateTrack();
        this.setInitialPointer();
        
        // Add input listeners
        document.getElementById('disk').addEventListener('change', () => {
            this.updateTrack();
            this.setInitialPointer();
        });
        
        document.getElementById('head').addEventListener('change', () => {
            this.setInitialPointer();
        });
    }
    
    static updateTrack() {
        const diskSize = parseInt(document.getElementById('disk').value);
        document.getElementById('disk-size-label').textContent = diskSize;
        
        // Clear existing request dots
        document.querySelectorAll('.request-dot').forEach(dot => dot.remove());
    }
    
    static setInitialPointer() {
        const head = parseInt(document.getElementById('head').value);
        const diskSize = parseInt(document.getElementById('disk').value);
        const pointer = document.getElementById('pointer');
        const leftPos = Math.min((head / diskSize) * 100, 100);
        pointer.style.left = `calc(${leftPos}% - 16px)`;
    }
    
    static showRequestDots(requests) {
        const diskSize = parseInt(document.getElementById('disk').value);
        const track = document.getElementById('track');
        
        requests.forEach(req => {
            const dot = document.createElement('div');
            dot.className = 'request-dot';
            dot.style.left = `${(req / diskSize) * 100}%`;
            dot.style.backgroundColor = this.getColorForRequest(req);
            track.appendChild(dot);
        });
    }
    
    static getColorForRequest(req) {
        const colors = ['#ff3366', '#ffcc00', '#00ffcc', '#9966ff'];
        return colors[req % colors.length];
    }
    
    static async animateHeadMovement(path, algorithm) {
        const pointer = document.getElementById('pointer');
        const diskSize = parseInt(document.getElementById('disk').value);
        const algoBox = document.getElementById(`${algorithm}-box`);
        
        // Highlight algorithm box
        algoBox.style.transform = 'scale(1.05)';
        algoBox.style.boxShadow = '0 25px 50px rgba(0,0,0,0.4)';
        
        for (let i = 0; i < path.length - 1; i++) {
            const from = path[i];
            const to = path[i + 1];
            const leftPos = (to / diskSize) * 100;
            
            // Animate pointer movement
            pointer.style.left = `calc(${Math.min(leftPos, 100)}% - 16px)`;
            
            // Create movement trail
            this.createTrail(from, to, diskSize);
            
            // Add sparkle effect
            const trackRect = document.getElementById('track').getBoundingClientRect();
            const x = trackRect.left + (to / diskSize) * trackRect.width;
            const y = trackRect.top + trackRect.height / 2;
            Animations.createSparkle(x, y);
            
            await new Promise(r => setTimeout(r, 300));
        }
        
        // Reset algorithm box
        setTimeout(() => {
            algoBox.style.transform = '';
            algoBox.style.boxShadow = '';
        }, 500);
    }
    
    static createTrail(from, to, diskSize) {
        const track = document.getElementById('track');
        const trail = document.createElement('div');
        trail.style.position = 'absolute';
        trail.style.height = '8px';
        trail.style.background = 'linear-gradient(90deg, #00ffcc, transparent)';
        trail.style.top = '4px';
        trail.style.borderRadius = '4px';
        trail.style.opacity = '0.7';
        trail.style.zIndex = '5';
        
        const leftStart = Math.min((from / diskSize) * 100, 100);
        const leftEnd = Math.min((to / diskSize) * 100, 100);
        
        if (leftStart < leftEnd) {
            trail.style.left = `${leftStart}%`;
            trail.style.width = `${leftEnd - leftStart}%`;
        } else {
            trail.style.left = `${leftEnd}%`;
            trail.style.width = `${leftStart - leftEnd}%`;
        }
        
        track.appendChild(trail);
        
        // Fade out trail
        setTimeout(() => {
            trail.style.transition = 'opacity 0.5s ease';
            trail.style.opacity = '0';
            setTimeout(() => trail.remove(), 500);
        }, 300);
    }
    
    static updateResults(results) {
        // Update FCFS
        document.getElementById('fcfs-total').textContent = results.fcfs.total;
        document.getElementById('fcfs-avg').textContent = results.fcfs.avg;
        document.getElementById('fcfs-throughput').textContent = results.fcfs.path.split('→').length - 1;
        document.getElementById('fcfs-path').innerHTML = `<i class="fas fa-route"></i> ${results.fcfs.path}`;
        
        // Update SSTF
        document.getElementById('sstf-total').textContent = results.sstf.total;
        document.getElementById('sstf-avg').textContent = results.sstf.avg;
        document.getElementById('sstf-throughput').textContent = results.sstf.path.split('→').length - 1;
        document.getElementById('sstf-path').innerHTML = `<i class="fas fa-route"></i> ${results.sstf.path}`;
        
        // Update SCAN
        document.getElementById('scan-total').textContent = results.scan.total;
        document.getElementById('scan-avg').textContent = results.scan.avg;
        document.getElementById('scan-throughput').textContent = results.scan.path.split('→').length - 1;
        document.getElementById('scan-path').innerHTML = `<i class="fas fa-route"></i> ${results.scan.path}`;
        
        // Update C-SCAN
        document.getElementById('cscan-total').textContent = results.cscan.total;
        document.getElementById('cscan-avg').textContent = results.cscan.avg;
        document.getElementById('cscan-throughput').textContent = results.cscan.path.split('→').length - 1;
        document.getElementById('cscan-path').innerHTML = `<i class="fas fa-route"></i> ${results.cscan.path}`;
        
        // Animate numbers
        ['fcfs', 'sstf', 'scan', 'cscan'].forEach(algo => {
            const totalEl = document.getElementById(`${algo}-total`);
            const start = parseInt(totalEl.textContent) || 0;
            const end = results[algo].total;
            Animations.animateNumber(totalEl, start, end, 1000);
        });
        
        // Generate Gantt Chart
        this.generateGanttChart(results);
    }
    
    static generateGanttChart(results) {
        const ganttContainer = document.getElementById('ganttChart');
        if (!ganttContainer) return;
        
        // Clear previous content
        ganttContainer.innerHTML = '';
        
        const algorithms = [
            { key: 'fcfs', name: 'FCFS', color: '#00ffcc' },
            { key: 'sstf', name: 'SSTF', color: '#ff3366' },
            { key: 'scan', name: 'SCAN', color: '#ffcc00' },
            { key: 'cscan', name: 'C-SCAN', color: '#9966ff' }
        ];
        
        // Create Gantt chart for each algorithm
        algorithms.forEach(algo => {
            const result = results[algo.key];
            const path = result.path.split(' → ').map(Number);
            
            // Create algorithm row
            const algoRow = document.createElement('div');
            algoRow.className = 'gantt-algorithm';
            
            // Algorithm label
            const label = document.createElement('div');
            label.className = 'gantt-algo-label';
            label.textContent = algo.name;
            algoRow.appendChild(label);
            
            // Create bars container
            const barsContainer = document.createElement('div');
            barsContainer.className = 'gantt-bars';
            
            // Calculate max distance for scaling
            let maxDistance = 0;
            for (let i = 0; i < path.length - 1; i++) {
                const distance = Math.abs(path[i] - path[i + 1]);
                maxDistance = Math.max(maxDistance, distance);
            }
            
            // Create bars for each movement
            for (let i = 0; i < path.length - 1; i++) {
                const from = path[i];
                const to = path[i + 1];
                const distance = Math.abs(from - to);
                
                // Calculate width (proportional to distance)
                const widthPercent = (distance / maxDistance) * 100;
                const minWidth = 30; // Minimum width in pixels
                const width = Math.max(minWidth, widthPercent);
                
                // Create bar
                const bar = document.createElement('div');
                bar.className = 'gantt-bar';
                bar.style.width = `${width}%`;
                bar.style.backgroundColor = algo.color;
                bar.style.opacity = 0.7 + (i * 0.05);
                bar.title = `${from} → ${to} (Distance: ${distance})`;
                bar.style.animation = `barGrow 0.5s ease-out ${i * 0.1}s both`;
                
                // Add distance text for larger bars
                if (distance > 0) {
                    const distanceText = document.createElement('span');
                    distanceText.textContent = distance;
                    bar.appendChild(distanceText);
                }
                
                barsContainer.appendChild(bar);
            }
            
            algoRow.appendChild(barsContainer);
            ganttContainer.appendChild(algoRow);
        });
        
        // Add timeline explanation
        const timelineInfo = document.createElement('div');
        timelineInfo.style.marginTop = '20px';
        timelineInfo.style.padding = '15px';
        timelineInfo.style.background = 'rgba(255,255,255,0.05)';
        timelineInfo.style.borderRadius = '10px';
        timelineInfo.style.color = 'rgba(255,255,255,0.7)';
        timelineInfo.style.fontSize = '13px';
        timelineInfo.innerHTML = `
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span>Start of Execution</span>
                <span>← Bar width represents seek distance →</span>
                <span>End of Execution</span>
            </div>
            <div style="text-align: center; color: rgba(255,255,255,0.5);">
                Hover over bars to see detailed seek distances
            </div>
        `;
        ganttContainer.appendChild(timelineInfo);
    }
    
    static updateChart(results) {
        const totals = [
            results.fcfs.total,
            results.sstf.total,
            results.scan.total,
            results.cscan.total
        ];
        
        const maxTotal = Math.max(...totals);
        
        // Animate bars with delay
        ['fcfs', 'sstf', 'scan', 'cscan'].forEach((algo, index) => {
            setTimeout(() => {
                const bar = document.getElementById(`${algo}-bar`);
                const valueEl = document.getElementById(`${algo}-bar-value`);
                const height = maxTotal > 0 ? (results[algo].total / maxTotal) * 100 : 0;
                
                bar.style.height = `${height}%`;
                valueEl.textContent = results[algo].total;
                
                // Animate value
                Animations.animateNumber(valueEl, 0, results[algo].total, 800);
            }, index * 300);
        });
    }
    
    static reset() {
        // Reset inputs
        document.getElementById('req').value = '98, 183, 37, 122, 14, 124, 65, 67';
        document.getElementById('head').value = '53';
        document.getElementById('disk').value = '200';
        document.getElementById('dir').value = '1';
        
        // Reset results
        ['fcfs', 'sstf', 'scan', 'cscan'].forEach(algo => {
            document.getElementById(`${algo}-total`).textContent = '-';
            document.getElementById(`${algo}-avg`).textContent = '-';
            document.getElementById(`${algo}-throughput`).textContent = '-';
            document.getElementById(`${algo}-path`).innerHTML = `<i class="fas fa-route"></i> Path will appear here...`;
            document.getElementById(`${algo}-bar`).style.height = '0%';
            document.getElementById(`${algo}-bar-value`).textContent = '0';
        });
        
        // Clear request dots
        document.querySelectorAll('.request-dot').forEach(dot => dot.remove());
        
        // Reset Gantt chart
        const ganttContainer = document.getElementById('ganttChart');
        if (ganttContainer) {
            ganttContainer.innerHTML = `
                <div class="gantt-placeholder">
                    <i class="fas fa-chart-line"></i>
                    <p>Run simulation to view Gantt Chart</p>
                    <small>Shows execution sequence of each algorithm</small>
                </div>
            `;
        }
        
        // Reset pointer
        this.setInitialPointer();
        this.updateTrack();
        
        Animations.showNotification('Simulation reset to default values');
    }
}

// Main simulation function
async function runSimulation() {
    const requests = DiskScheduler.getRequests();
    const head = parseInt(document.getElementById('head').value);
    const diskSize = parseInt(document.getElementById('disk').value);
    const direction = parseInt(document.getElementById('dir').value);
    
    if (requests.length === 0) {
        Animations.showNotification('Please enter valid disk requests');
        return;
    }
    
    // Clear previous dots and update UI
    document.querySelectorAll('.request-dot').forEach(dot => dot.remove());
    UIController.showRequestDots(requests);
    
    // Calculate results
    const results = {
        fcfs: DiskScheduler.FCFS([...requests], head),
        sstf: DiskScheduler.SSTF([...requests], head),
        scan: DiskScheduler.SCAN([...requests], head, direction, diskSize),
        cscan: DiskScheduler.CSCAN([...requests], head, direction, diskSize)
    };
    
    // Update UI with results
    UIController.updateResults(results);
    UIController.updateChart(results);
    
    // Animate each algorithm
    const algorithms = ['fcfs', 'sstf', 'scan', 'cscan'];
    for (const algo of algorithms) {
        const path = results[algo].path.split(' → ').map(Number);
        await UIController.animateHeadMovement(path, algo);
        await new Promise(r => setTimeout(r, 800));
    }
    
    Animations.showNotification('All algorithms simulated successfully!');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    Animations.createParticles();
    
    // Add ripple effect to buttons
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', (e) => Animations.createRipple(e));
    });
    
    // Add sparkle effect on inputs focus
    document.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('focus', (e) => {
            const rect = e.target.getBoundingClientRect();
            Animations.createSparkle(rect.right - 10, rect.top + rect.height / 2);
        });
    });
    
    UIController.initialize();
    
    // Add event listeners
    document.getElementById('run-btn').addEventListener('click', runSimulation);
    document.getElementById('reset-btn').addEventListener('click', () => UIController.reset());
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            runSimulation();
        }
        if (e.key === 'Escape') {
            UIController.reset();
        }
    });
});
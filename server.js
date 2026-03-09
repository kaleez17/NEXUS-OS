const http = require('http');
const os = require('os');

http.createServer((req, res) => {
    // SENIOR TIP: This header is mandatory for the link to work
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    if (req.url === '/stats') {
        const total = os.totalmem();
        const free = os.freemem();
        const used = total - free;
        
        const data = {
            cpu: (os.loadavg()[0] * 10).toFixed(1), // Real CPU Load
            memPercent: ((used / total) * 100).toFixed(1),
            memGB: (used / 1024 / 1024 / 1024).toFixed(1)
        };

        res.end(JSON.stringify(data));
    }
}).listen(3000);

console.log("LINK ACTIVE: Server is broadcasting hardware data at port 3000");
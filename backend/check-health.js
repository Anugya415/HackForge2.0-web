import http from 'http';

const options = {
    hostname: 'localhost',
    port: 8080,
    path: '/api/jobs', // Public endpoint
    method: 'GET'
};

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    res.resume();
});

req.on('error', (e) => {
    console.error(`PROBLEM: ${e.message}`);
});

req.end();

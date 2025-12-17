import fs from 'fs';

const version = {
    version: Date.now().toString(),
    timestamp: new Date().toISOString()
};

fs.writeFileSync('public/version.json', JSON.stringify(version, null, 2));
console.log('Version generated:', version);

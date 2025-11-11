const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// Paths to watch
const CONTENT_DIR = path.join(__dirname, '../content');
const TEMPLATE_DIR = path.join(__dirname, '../template');

console.log('👀 Watching for changes...\n');
console.log('Watching:');
console.log('  - /content');
console.log('  - /template');
console.log('\nPress Ctrl+C to stop\n');

let isBuilding = false;
let buildQueued = false;

function runBuild() {
    if (isBuilding) {
        buildQueued = true;
        return;
    }

    isBuilding = true;
    console.log('🔨 Changes detected, rebuilding...');

    const build = spawn('npm', ['run', 'build'], {
        shell: true,
        stdio: 'inherit'
    });

    build.on('close', (code) => {
        isBuilding = false;
        if (code === 0) {
            console.log('✅ Build complete!\n👀 Watching for changes...\n');
        } else {
            console.log('❌ Build failed!\n👀 Watching for changes...\n');
        }

        if (buildQueued) {
            buildQueued = false;
            setTimeout(runBuild, 100);
        }
    });
}

// Watch content directory
fs.watch(CONTENT_DIR, { recursive: true }, (eventType, filename) => {
    if (filename && filename.endsWith('.md')) {
        console.log(`📝 ${filename} changed`);
        runBuild();
    }
});

// Watch template directory
fs.watch(TEMPLATE_DIR, { recursive: true }, (eventType, filename) => {
    if (filename) {
        console.log(`🎨 ${filename} changed`);
        runBuild();
    }
});

// Initial build
runBuild();

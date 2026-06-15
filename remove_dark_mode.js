import fs from 'fs';
import path from 'path';

const srcDir = './src';

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            walkDir(dirPath, callback);
        } else {
            callback(dirPath);
        }
    });
}

walkDir(srcDir, filePath => {
    const ext = path.extname(filePath);
    if (!['.js', '.jsx', '.css', '.html'].includes(ext)) return;

    let content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes('dark:')) return;

    console.log(`Processing: ${filePath}`);

    // Remove dark: classes
    let cleaned = content.replace(/\bdark:[a-zA-Z0-9\-/:\[\]#_~%]+/g, '');

    // Clean up classNames for simple quotes
    cleaned = cleaned.replace(/className=(["'])([\s\S]*?)\1/g, (match, quote, inner) => {
        const cleanedInner = inner.replace(/\s+/g, ' ').trim();
        return `className=${quote}${cleanedInner}${quote}`;
    });

    // Clean up classNames for template literals
    cleaned = cleaned.replace(/className=\{`([\s\S]*?)`\}/g, (match, inner) => {
        let lines = inner.split('\n');
        let cleanedLines = lines.map(line => {
            if (line.includes('${')) {
                return line;
            }
            return line.replace(/\s+/g, ' ').trim();
        });
        
        // Filter out completely empty lines
        cleanedLines = cleanedLines.filter(line => line.trim().length > 0 || line.includes('${'));
        
        let result = cleanedLines.join('\n  ');
        return `className={\`\n  ${result}\n\`} `;
    });

    fs.writeFileSync(filePath, cleaned, 'utf8');
});

console.log('Finished removing dark mode classes.');

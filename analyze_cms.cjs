const fs = require('fs');
const path = require('path');

const FRONTEND_DIR = path.join(__dirname, 'src', 'app', '(frontend)');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const pages = [];

walkDir(FRONTEND_DIR, (filePath) => {
    if (filePath.endsWith('page.tsx') || filePath.endsWith('page.js')) {
        const relativePath = path.relative(FRONTEND_DIR, filePath);
        let route = '/' + relativePath.replace(/\\/g, '/').replace('/page.tsx', '').replace('page.tsx', '').replace('/page.js', '').replace('page.js', '');
        if (route === '/') route = '/ (Home)';
        
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Find components rendered (capitalized tags)
        const componentMatches = content.match(/<([A-Z][a-zA-Z0-9]+)/g) || [];
        const components = [...new Set(componentMatches.map(m => m.slice(1)))];
        
        // Find loaders or specific data fetchers used
        const loaderMatches = content.match(/get[A-Z][a-zA-Z0-9]+/g) || [];
        const loaders = [...new Set(loaderMatches)];
        
        // Check for static slug generation
        const hasStaticParams = content.includes('generateStaticParams');
        
        pages.push({ route, components, loaders, hasStaticParams });
    }
});

pages.sort((a, b) => a.route.localeCompare(b.route));

let md = '# CMS Architecture Analysis\n\n';
md += 'This document outlines the current static site architecture to inform the design of the new CMS.\n\n';

md += '## 1. Page Layouts & Data Spread\n\n';

pages.forEach(p => {
    md += `### Route: \`${p.route}\`\n`;
    md += `- **Data Spread (Loaders):** ${p.loaders.length > 0 ? p.loaders.join(', ') : 'None'}\n`;
    md += `- **Components Used:** ${p.components.length > 0 ? p.components.join(', ') : 'None'}\n`;
    md += `- **Slug Management:** ${p.route.includes('[') ? (p.hasStaticParams ? 'Generated statically via `generateStaticParams`' : 'Dynamic runtime slug') : 'Static Route'}\n\n`;
});

fs.writeFileSync('cms-architecture-analysis.md', md);
console.log('Analysis written to cms-architecture-analysis.md');

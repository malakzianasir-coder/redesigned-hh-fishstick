const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, 'content');
const outputFile = path.join(__dirname, 'repetitions_report.md');

function flattenObject(ob) {
    let toReturn = {};
    for (let i in ob) {
        if (!ob.hasOwnProperty(i)) continue;
        if ((typeof ob[i]) == 'object' && ob[i] !== null) {
            let flatObject = flattenObject(ob[i]);
            for (let x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;
                toReturn[i + '.' + x] = flatObject[x];
            }
        } else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
}

function isSameContext(key1, key2) {
    const parts1 = key1.split('.');
    const parts2 = key2.split('.');
    
    // If the top-level keys are indices (array of objects), only compare within the same object
    if (/^\d+$/.test(parts1[0]) && /^\d+$/.test(parts2[0])) {
        if (parts1[0] !== parts2[0]) return false;
    }
    // You could also do this for nested arrays (e.g. sections.0... and sections.1...)
    // but top-level is the biggest source of noise.
    return true;
}

function isStructuralRedundancy(k1, k2) {
    k1 = k1.toLowerCase();
    k2 = k2.toLowerCase();
    
    const isHeader1 = k1.includes('kicker') || k1.includes('title') || k1.includes('heading');
    const isHeader2 = k2.includes('kicker') || k2.includes('title') || k2.includes('heading');
    
    const isBody1 = k1.includes('body') || k1.includes('lede') || k1.includes('description') || k1.includes('excerpt') || k1.includes('text');
    const isBody2 = k2.includes('body') || k2.includes('lede') || k2.includes('description') || k2.includes('excerpt') || k2.includes('text');
    
    // Repetition between two headers (e.g. kicker == title)
    if (isHeader1 && isHeader2) return true;
    
    // Repetition between header and body (e.g. kicker == body)
    if ((isHeader1 && isBody2) || (isHeader2 && isBody1)) return true;
    
    return false;
}

function checkRepetitionsInFile(filePath) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const flat = flattenObject(data);
    
    const strings = [];
    for (const key in flat) {
        if (typeof flat[key] === 'string') {
            const val = flat[key].trim();
            if (
                val.length > 5 &&
                !val.startsWith('/') &&
                !val.startsWith('http') &&
                !/^\d+$/.test(val) &&
                !val.includes('@') &&
                val.includes(' ')
            ) {
                strings.push({ key, val });
            }
        }
    }

    const exactMatches = [];
    const substringMatches = [];

    const reported = new Set();

    for (let i = 0; i < strings.length; i++) {
        for (let j = i + 1; j < strings.length; j++) {
            const a = strings[i];
            const b = strings[j];

            if (a.key === b.key) continue;
            if (!isSameContext(a.key, b.key)) continue;

            const valA = a.val.toLowerCase();
            const valB = b.val.toLowerCase();

            const pairKey = `${a.key}|${b.key}`;
            if (reported.has(pairKey)) continue;

            if (valA === valB) {
                // If exact match
                if (valA.length > 30 || isStructuralRedundancy(a.key, b.key)) {
                    exactMatches.push(`- **EXACT**: \`${a.key}\` and \`${b.key}\` => "${a.val}"`);
                    reported.add(pairKey);
                }
            } else {
                // If substring match
                // Only if it's a structural redundancy (like header in body)
                if (isStructuralRedundancy(a.key, b.key)) {
                    if (valA.length >= 15 && valB.includes(valA)) {
                        substringMatches.push(`- **SUBSTRING**: \`${a.key}\` ("${a.val}") is contained within \`${b.key}\``);
                        reported.add(pairKey);
                    } else if (valB.length >= 15 && valA.includes(valB)) {
                        substringMatches.push(`- **SUBSTRING**: \`${b.key}\` ("${b.val}") is contained within \`${a.key}\``);
                        reported.add(pairKey);
                    }
                }
            }
        }
    }
    
    return { exactMatches, substringMatches };
}

function main() {
    const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.json') && f !== 'lab-tests.json');
    let report = '# Content Repetitions Report\n\n';
    
    let totalIssues = 0;

    for (const file of files) {
        const filePath = path.join(contentDir, file);
        try {
            const { exactMatches, substringMatches } = checkRepetitionsInFile(filePath);
            
            if (exactMatches.length > 0 || substringMatches.length > 0) {
                report += `## ${file}\n\n`;
                if (exactMatches.length > 0) {
                    report += `### Exact Matches\n${exactMatches.join('\n')}\n\n`;
                }
                if (substringMatches.length > 0) {
                    report += `### Substring Matches\n${substringMatches.join('\n')}\n\n`;
                }
                totalIssues += exactMatches.length + substringMatches.length;
            }
        } catch (e) {
            console.error(`Error processing ${file}: ${e.message}`);
        }
    }

    if (totalIssues === 0) {
        report += 'No significant repetitions found.\n';
    }

    fs.writeFileSync(outputFile, report);
    console.log(`Report generated at ${outputFile} with ${totalIssues} potential repetitions found.`);
}

main();

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

function checkRepetitionsInFile(filePath) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const flat = flattenObject(data);
    
    const strings = [];
    for (const key in flat) {
        if (typeof flat[key] === 'string') {
            const val = flat[key].trim();
            // Ignore very short strings, URLs, file paths, numbers
            if (val.length > 3 && !val.startsWith('/') && !val.startsWith('http') && !/^\d+$/.test(val)) {
                strings.push({ key, val });
            }
        }
    }

    const exactMatches = [];
    const substringMatches = [];

    for (let i = 0; i < strings.length; i++) {
        for (let j = i + 1; j < strings.length; j++) {
            const a = strings[i];
            const b = strings[j];

            const valA = a.val.toLowerCase();
            const valB = b.val.toLowerCase();

            // Ignore if keys are somewhat similar (e.g. array items with same properties usually might have same values but we are interested in cross-field reps)
            // But let's log them anyway and user can filter

            if (valA === valB) {
                exactMatches.push(`- **EXACT MATCH**: \`${a.key}\` and \`${b.key}\` both contain: "${a.val}"`);
            } else if (valA.length > 10 && valB.includes(valA)) {
                substringMatches.push(`- **SUBSTRING**: \`${a.key}\` ("${a.val}") is contained within \`${b.key}\``);
            } else if (valB.length > 10 && valA.includes(valB)) {
                substringMatches.push(`- **SUBSTRING**: \`${b.key}\` ("${b.val}") is contained within \`${a.key}\``);
            }
        }
    }
    
    return { exactMatches, substringMatches };
}

function main() {
    const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.json'));
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

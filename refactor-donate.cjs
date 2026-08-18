const fs = require('fs');
const path = require('path');

const files = [
  'src/components/donate/HowToDonateHubContent.tsx',
  'src/components/donate/HowToDonateMethodContent.tsx',
  'src/components/donate/WhatYouCanSupportCauseContent.tsx',
  'src/components/donate/DonationMethodPanels.tsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${file}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf-8');
  let original = content;

  // Add import if needed
  if (!content.includes("import { InteractiveCard }")) {
    content = content.replace(/(import .* from '.*?')\n/, "$1\nimport { InteractiveCard } from '@/components/ui/InteractiveCard'\n");
  }

  // Replace <article className="card ...">
  content = content.replace(/<article(.*?)className="card(.*?)"/g, '<InteractiveCard as="article"$1className="$2"');
  content = content.replace(/<article(.*?)className="card-interactive(.*?)"/g, '<InteractiveCard as="article"$1className="$2"');
  content = content.replace(/<\/article>/g, '</InteractiveCard>');
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${file}`);
  }
});

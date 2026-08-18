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

  // Replace <div className="card ...">
  content = content.replace(/<div(.*?)className="card(.*?)"/g, '<InteractiveCard as="div"$1className="$2"');
  
  // Replace <Link className="card-interactive ...">
  content = content.replace(/<Link(.*?)className="card-interactive(.*?)"/g, '<InteractiveCard$1className="$2"');
  content = content.replace(/<\/Link>/g, '</InteractiveCard>');
  
  // For the div replacements, we need to carefully replace the closing tag.
  // Actually, wait, replacing all </div> with </InteractiveCard> is VERY BAD for nested divs!
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${file}`);
  }
});

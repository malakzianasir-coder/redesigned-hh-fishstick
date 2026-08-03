const fs = require('fs');
const path = 'C:\\Work\\hijaz-2026\\content\\services.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

data.forEach(service => {
  if (!service.sections) return;
  service.sections = service.sections.map(section => {
    if (!section.type) {
      if (section.content !== undefined && section.title === undefined && section.bullets === undefined) {
        section.type = 'content';
        section.heading = 'Overview';
        section.body = [section.content];
        delete section.content;
      } else if (section.title !== undefined && section.bullets !== undefined) {
        section.type = 'bullets';
        section.heading = section.title;
        section.items = section.bullets.map(item => {
          if (typeof item === 'object' && item !== null) {
            if (item.label) return item.label;
            if (item.text) return item.text;
          }
          return item;
        });
        delete section.title;
        delete section.bullets;
      }
    } else {
      if (section.type === 'serviceGroups') {
        if (section.title !== undefined) {
          section.heading = section.title;
          delete section.title;
        }
        if (section.groups) {
          section.groups.forEach(group => {
            if (group.title !== undefined) {
              group.heading = group.title;
              delete group.title;
            }
            if (group.items) {
              group.items = group.items.map(item => {
                if (typeof item === 'object' && item !== null && item.label) return item.label;
                return item;
              });
            }
          });
        }
      } else if (section.type === 'content') {
        if (section.title !== undefined) {
          section.heading = section.title;
          delete section.title;
        }
        if (section.content !== undefined) {
          if (typeof section.content === 'string') {
            section.body = [section.content];
          }
          delete section.content;
        }
      } else if (section.type === 'bullets') {
        if (section.title !== undefined) {
          section.heading = section.title;
          delete section.title;
        }
        if (section.items) {
          section.items = section.items.map(item => {
            if (typeof item === 'object' && item !== null) {
              if (item.label) return item.label;
              if (item.text) return item.text;
            }
            return item;
          });
        }
      } else if (section.type === 'iconGrid') {
        if (section.title !== undefined) {
          section.heading = section.title;
          delete section.title;
        }
      } else if (section.type === 'callout') {
        if (section.title !== undefined) {
          section.heading = section.title;
          delete section.title;
        }
        if (section.content !== undefined) {
          if (typeof section.content === 'string') {
            section.body = [section.content];
          }
          delete section.content;
        }
      }
    }
    return section;
  });
});

fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n', 'utf8');
console.log('Fixed services.json');

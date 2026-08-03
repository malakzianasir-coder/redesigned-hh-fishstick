const fs = require('fs');

const file = 'C:/Work/hijaz-2026/content/departments.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

data.forEach(dept => {
  if (dept.sections) {
    dept.sections.forEach(sec => {
      if (sec.type === 'serviceGroups') {
        if (sec.title !== undefined) {
          sec.heading = sec.title;
          delete sec.title;
        }
        if (sec.groups) {
          sec.groups.forEach(group => {
            if (group.title !== undefined) {
              group.heading = group.title;
              delete group.title;
            }
            if (group.items) {
              group.items = group.items.map(item => {
                return (item && typeof item === 'object' && item.label) ? item.label : item;
              });
            }
          });
        }
      } else if (sec.type === 'iconGrid') {
        if (sec.title !== undefined) {
          sec.heading = sec.title;
          delete sec.title;
        }
      } else if (sec.type === 'content') {
        if (sec.title !== undefined) {
          sec.heading = sec.title;
          delete sec.title;
        }
        if (sec.content !== undefined) {
          sec.body = [sec.content];
          delete sec.content;
        }
      } else if (sec.type === 'bullets') {
        if (sec.title !== undefined) {
          sec.heading = sec.title;
          delete sec.title;
        }
      }
    });
  }
});

fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
console.log('Done!');

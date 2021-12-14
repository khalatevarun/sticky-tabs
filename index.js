let myTabs = [
  {
    name: 'Favourite',
    links: [
      'https://roc8.my.stacker.app/your-profile#Cohort%20Submissions',
      'https://roc8.my.stacker.app/your-profile#Cohort%20Submissions',
    ],
  },
];
let currentGroup = 0; // index that points to current group object
const inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('input-btn');
const contentEl = document.getElementById('content-el');
const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myTabs'));
const deleteBtn = document.getElementById('delete-btn');
const tabBtn = document.getElementById('tab-btn');
const currentEl = document.getElementById('current-el');

currentEl.innerHTML = myTabs[currentGroup].name;

if (leadsFromLocalStorage) {
  myTabs = leadsFromLocalStorage;
  render(myTabs);
}

tabBtn.addEventListener('click', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myTabs[currentGroup].links.push(tabs[0].url);
    localStorage.setItem('myTabs', JSON.stringify(myTabs));
    render(myTabs);
  });
});

// deleteBtn.addEventListener('dblclick', function () {
//   localStorage.clear();
//   myTabs = [];
//   render(myTabs);
// });

render(myTabs);

inputBtn.addEventListener('click', function () {
  myTabs.push(inputEl.value);
  inputEl.value = '';
  localStorage.setItem('myTabs', JSON.stringify(myTabs));
  render(myTabs);
});

function render(groups) {
  let listItems = '';

  for (let i = 0; i < groups.length; i++) {
    console.log(groups);
    listItems += `<h3>${groups[i].name}</h3><ul id="ul-el">`;
    for (let j = 0; j < groups[i].links.length; j++) {
      listItems += `
      <li>
          <a target='_blank' href='${groups[i].links[j]}'>
              ${groups[i].links[j]}
          </a>
      </li>
  `;
    }
    listItems += '</ul>';
  }
  contentEl.innerHTML = listItems;
}

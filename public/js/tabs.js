/** @format */

const tabs = document.querySelector('.tabs');
const tabList = Array.from(document.querySelectorAll('.tab'));
const tabButtons = Array.from(document.querySelectorAll('.button--tab'));

function activateTab(tabList, activeID) {
	tabList.forEach((tab) => {
		tab.id == activeID ? tab.classList.add('tabs--active') : tab.classList.remove('tabs--active');
	});
	tabButtons.forEach((tabButton) => {
		tabButton.dataset.view == activeID
			? tabButton.classList.add('button--tab--active')
			: tabButton.classList.remove('button--tab--active');
	});
}

function toggleTabs(e) {
	const activeID = e.target.dataset.view;
	console.log(activeID);
	activeID !== undefined && activateTab(tabList, activeID);
}

tabs.addEventListener('click', (e) => toggleTabs(e));

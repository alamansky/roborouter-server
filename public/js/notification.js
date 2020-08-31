/** @format */

let dash = document.querySelector('#dash');

let handleCloseClick = (e) => {
	if (e.target.id) {
		let elem = document.querySelector(`#${e.target.id}`);
		if (elem.id == 'appts' || elem.id == 'timestamp') {
			elem.parentNode.classList.add('invisible');
		}
	}
};

dash.addEventListener('click', (e) => handleCloseClick(e));

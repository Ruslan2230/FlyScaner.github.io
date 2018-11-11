(function() {
	let changeDirections = document.querySelector('#change-directions');

	changeDirections.addEventListener('click', function() {
		const dataDeparture = getDepartureData();
		const keyDeparture = getDepartureKey();
		const dataDestination = getDestinationData();
		const keyDestination = getDestinationKey();
		const currentIndexDep = getCurrentIndexDep();
		const currentIndexDest = getCurrentIndexDest();

		if(keyDeparture && keyDestination) {
			updateDestination(keyDeparture, dataDeparture, currentIndexDep);
			updateDeparture(keyDestination, dataDestination, currentIndexDest);
		}
	}, true);
})();
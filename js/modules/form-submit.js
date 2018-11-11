(function() {
    const button = document.querySelector("#btn-submit");

    button.addEventListener('click', function() {
        const keyDeparture = getDepartureKey();
		const keyDestination = getDestinationKey();

        if(!keyDeparture) {
            document.querySelector('#input-from').classList.add('error');
        } else {
            document.querySelector('#input-from').classList.remove('error');
        }

        if(!keyDestination) {
            document.querySelector('#input-to').classList.add('error');
        } else {
            document.querySelector('#input-to').classList.remove('error');
        }

        if(keyDeparture && keyDestination) {
            api.getFlight(function(response) {
                hidePlaceholder();
                showTable();
                setData(response);
                sortByPrice();
                renderTable();
            }, function() {
                showPlaceholder();
                hideTable();
            });
        }
    }, false);

  })();
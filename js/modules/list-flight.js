(function() {
    let data = [];

    function showTable() {
        const container = document.querySelector('#result-search');

        container.classList.remove('hidden');
    }

    function hideTable() {
        const container = document.querySelector('#result-search');

        container.classList.add('hidden');
    }

    function setData(response) {
        data = response;
    }

    function renderTable() {
        const body = document.querySelector('#table-tbody');
        const fragment = document.createDocumentFragment();

        body.innerHTML = "";

        updateCount(data.length);

        data.forEach(({
            Aircraft,
            Airline,
            AirlineLogo,
            Arrival,
            CodeAircraft,
            Departure,
            Destination,
            GMT,
            Gate,
            Price,
            Transfer
        }) => {
            const tr = document.createElement('tr');

            tr.appendChild(getAirlineLogo(AirlineLogo, Airline));
            tr.appendChild(getAircraft(Aircraft));
            tr.appendChild(getCodeAircraft(CodeAircraft));
            tr.appendChild(getDestination(Destination));
            tr.appendChild(getDataCell(Departure));
            tr.appendChild(getDataCell(Arrival));
            tr.appendChild(getGate(Gate));
            tr.appendChild(getDuration(Departure, Arrival, GMT, Transfer));
            tr.appendChild(getPrice(Price));

            fragment.appendChild(tr);
        });

        
        body.appendChild(fragment);
    }

    

    function getAirlineLogo(logoSrc, airline) {
        let td = document.createElement('td');
        
        if(logoSrc) {
            let logo = document.createElement('div');
            logo.className = 'airline-logo';

            let img = document.createElement('img');
            img.src = logoSrc; 

            logo.appendChild(img);
            td.appendChild(logo);
        } else {
            let airlineElem = document.createElement('div');
            airlineElem.className = 'airline-name';

            airlineElem.innerHTML = airline;

            td.appendChild(airlineElem);
        }
     
        return td;    
    }

    function getAircraft(aircraft) {
        let td = document.createElement('td');
        let elem = document.createElement('div');

        elem.innerHTML = aircraft;

        td.appendChild(elem);
     
        return td;
    }

    function getCodeAircraft(code) {
        let td = document.createElement('td');
        let elem = document.createElement('div');

        elem.innerHTML = code;

        td.appendChild(elem);
     
        return td;
    }

    function getDestination(destination) {
        let td = document.createElement('td');
        let elem = document.createElement('div');

        elem.innerHTML = destination;

        td.appendChild(elem);
     
        return td;
    }

    function getGate(gate) {
        let td = document.createElement('td');
        let elem = document.createElement('div');

        elem.innerHTML = gate;

        td.appendChild(elem);
     
        return td;
    }

    function getDataCell(date) {
        let td = document.createElement('td');
        td.className = 'data-cell';
        
        let time = document.createElement('div');
        time.className = 'time';
        time.innerHTML = getTime(date);

        let dateElem = document.createElement('div');
        dateElem.className = 'date';
        dateElem.innerHTML = getDate(date);

        td.appendChild(time);
        td.appendChild(dateElem);
     
        return td;
    }

    function getTime(date) {
        const parsedDate = new Date(date);

        return ('0'+ parsedDate.getHours()).slice(-2) + ':' + ('0'+ parsedDate.getMinutes()).slice(-2);
    }

    function getDate(date) {
        const parsedDate = new Date(date);

        return parsedDate.toLocaleString("ru", { day : 'numeric', month: 'long', year: 'numeric' });
    }

    function getDuration(departure, arrival, gmt, transfer) {
        // console.log(departure, arrival)
        let diff = arrival - departure - 7200000;
        const cell = document.createElement("td");

        const textElem = document.createElement("span");
        textElem.innerText = getTime(diff);
        cell.appendChild(textElem);

        if (transfer) {
            const transferElem = document.createElement("div");
            transferElem.className = "transfer";
            cell.appendChild(transferElem);

            const countOfTransfer = document.createElement("span");
            countOfTransfer.className = "count-of-transfer";

            if (transfer.length === 1) {
                countOfTransfer.innerText = "1 пересадка";
            } else {
                countOfTransfer.innerText = transfer.length + " пересадки";
            }

            transferElem.appendChild(countOfTransfer);

            transfer.forEach(function(item, index) {
                const cityOfTransfer = document.createElement("span");
                const isLastIndex = transfer.length - 1 === index;

                cityOfTransfer.className = "city-of-transfer";
                cityOfTransfer.setAttribute("title", item.PlaceName + ", " + item.PlaceId);
                cityOfTransfer.innerText = " " + item.PlaceId + (!isLastIndex ? "," : "");

                transferElem.appendChild(cityOfTransfer);
            });
        }

        return cell;
    }

    function getPrice(price) {
        const cell = document.createElement("td");
        cell.className = "price-cell";
    
        const priceElem = document.createElement("div");
        priceElem.innerText = (price * getCurrentRate()).toFixed(0) + " " + getCurrentSymbol();
        priceElem.className = "price";
        cell.appendChild(priceElem);
    
        const countOfPassengers = document.querySelector("#passenger .selected").getAttribute("data-value");
    
        let priceTotal = document.createElement("div");
        priceTotal.innerText = "Итого: ";
        priceTotal.className = "price-total";
        cell.appendChild(priceTotal);
    
        let priceSingle = document.createElement("span");
        priceSingle.className = "price-total-block";
        priceSingle.innerText = (price * countOfPassengers * getCurrentRate()).toFixed(0) + " " + getCurrentSymbol();
    
        priceTotal.appendChild(priceSingle);
    
        let btn = document.createElement("button");
        btn.className = "ui button fluid green";
        btn.innerText = "Купить";
        cell.appendChild(btn);

        return cell;
    }

    function sortByPrice() {
        data = data.sort(function(a, b) {
            if (a.Price > b.Price) {
              return 1; 
            }

            if (a.Price < b.Price) {
              return -1;
            }

            return 0;
        });
    }

    function sortByDuration() {
        data = data.sort(function(a, b) {
            const aDur = a.Departure - a.Arrival;
            const bDur = b.Departure - b.Arrival;

            if (aDur < bDur) {
              return 1;
            }

            if (aDur > bDur) {
              return -1;
            }

            return 0;
        });
    }

    window.showTable = showTable;
    window.hideTable = hideTable;
    window.renderTable = renderTable;
    window.setData = setData;
    window.sortByPrice = sortByPrice;
    window.sortByDuration = sortByDuration;

})();
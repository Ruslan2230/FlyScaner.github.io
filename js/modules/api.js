(function() {
    function getAjax(url, cb, cbOnError) {
        const xhr = new XMLHttpRequest();
    
        xhr.onload = function() {
            if (xhr.status === 200) {
                cb(JSON.parse(xhr.responseText));
            } else if(xhr.status === 410 || xhr.status === 404) {
                cbOnError();
            }
        }
        
        xhr.open("GET", url);
        xhr.send(null);
    }

    function getCurrencies(cb) {
        getAjax("http://dump.metacode.in/flyscanner/api/exchange_rates.json", cb);
    };

    function getDeparture(cb) {
        getAjax("http://dump.metacode.in/flyscanner/api/departure.json", cb);
    };
    
    function getDestination(cb) {
        getAjax("http://dump.metacode.in/flyscanner/api/destination.json", cb);
    };

    function getFlight(cb, cbOnError) {
        const id = getDestinationId().toLowerCase();

        getAjax("http://dump.metacode.in/flyscanner/api/flights/" + id + ".json", cb, cbOnError);
    };
    
    window.api = {
        getCurrencies,
        getDeparture,
        getDestination,
        getFlight
    };
})();
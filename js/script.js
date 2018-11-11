// Откуда 
// https://www.skyscanner.ru/g/autosuggest-flights/RU/ru-RU/Ki?IsDestination=false&enable_general_search=true

// Куда
// https://www.skyscanner.ru/g/autosuggest-flights/RU/ru-RU/F?IsDestination=true&enable_general_search=true


document.addEventListener("click", (evt) => {
    const flyoutElement = document.getElementById("flyout-example");
    let targetElement = evt.target; // clicked element

    do {
        if (targetElement == flyoutElement) {
            // This is a click inside. Do nothing, just return.
            document.getElementById("flyout-debug").textContent = "Clicked inside!";
            return;
        }
        // Go up the DOM
        targetElement = targetElement.parentNode;
    } while (targetElement);

    // This is a click outside.
    document.getElementById("flyout-debug").textContent = "Clicked outside!";
});



// 1.3.b Data loading

var xhr = new XMLHttpRequest();

xhr.open('GET', 'http://dump.metacode.in/flyscanner/api/exchange_rates.json', true);

xhr.send(); // (1)

xhr.onreadystatechange = function() { // (3)
  if (xhr.readyState != 4){
    return;
  } 

  let container = document.querySelector("#dropdown-currency"); 
  container.classList.remove("loading");

  if (xhr.status != 200) {
    alert(xhr.status + ': ' + xhr.statusText);
  } else {
    alert(xhr.responseText);

    // callback

    function init() {
        attachAddTaskHandler();
    
        getTasks("https://next.json-generator.com/api/json/get/Vk3p1nQqS", function(data) {
            console.log(data);
            const fragment = document.createDocumentFragment();
    
            data.forEach(function(element) {
                fragment.appendChild(getItem(element.name, element.checked));
            });
    
            addItem(fragment);
        });
    }
    
    init();


  }

}

button.disabled = true;



  
  for (var key in obj.rates) {
      const value = obj.rates[key];
  
  
      const item = document.createElement('div');
      item.setAttribute('data-value', key.toLowerCase());
      item.innerText = key;
  }

  

  this.item.insertBefore(this.iFlag, this.item.firstChild);
(function() {
  const container = document.querySelector("#dropdown-currency");
  let currentIndex = 0;
  let isInit = false;
  let data = {
    rates: {},
    symbols: {},
  };

  function close() {
    const dropdown = container.querySelector(".dropdown");
    const menu = container.querySelector(".menu");

    dropdown.classList.remove("active");
    menu.classList.remove("transition");
    menu.classList.remove("visible");
  }
  
  function updateCurrentItem(key) {
    const currentItem = container.querySelector('.text');

    currentItem.innerHTML = '';

    let item = document.createElement("div");
    item.className = "item";
    item.innerText = key;

    let flag = document.createElement("i");
    flag.className = "flag " + getClassNameFlag(key);

    item.insertBefore(flag, item.firstChild);

    currentItem.appendChild(item);
  }

  function renderItems() {
    
    Object.keys(data.rates).forEach(function(key, index) {
      const menu = container.querySelector(".menu");

      let item = document.createElement("div");
      item.className = "item";
      item.setAttribute("data-value", key.toLocaleLowerCase());
      item.innerText = key;

      if(index === 0) {
        item.classList.add("selected");
      }

      let flag = document.createElement("i");
      flag.className = "flag " + getClassNameFlag(key);

      item.insertBefore(flag, item.firstChild);

      item.addEventListener("click", function() {
        let selectedItem = container.querySelector(".item.selected");

        selectedItem.classList.remove("selected");

        this.classList.add("selected");

        currentIndex = index;

        updateCurrentItem(key);

        close();
      }, true);

      menu.appendChild(item);
    });

  }

  function loadData() {
    container.classList.add("loading");

    api.getCurrencies(function(response) {
      data = response;

      container.classList.remove("loading");

      renderItems();
    });

    isInit = true;
  }

  // Open list

  container.addEventListener("click", function() {
    let dropdown = container.querySelector(".dropdown");
    let menu = container.querySelector(".menu");

    dropdown.classList.add("active");
    menu.classList.add("transition");
    menu.classList.add("visible");

    if (!isInit) {
        loadData();
    }
  }, true);

  // 1.2.d
  document.addEventListener("click", function(event) {
    let dropDown = document.getElementById("dropdown-currency");
    let targetElement = event.target;

    do {
        if (targetElement === dropDown) {
            return;
        }
        targetElement = targetElement.parentNode;
    } while (targetElement);

    close();
  });

  function getClassNameFlag(value) {
    if (value === "AUD") {
      return "au";
    } else if (value === "CNY") {
      return "cn";
    } else if (value === "EUR") {
      return "eu";
    } else if (value === "GBP") {
      return "gb uk";
    } else if (value === "HUF") {
      return "hu";
    } else if (value === "RUB") {
      return "ru";
    } else if (value === "UAH") {
      return "ua";
    } else if (value === "USD") {
      return "us";
    }
  }

  function getCurrentRate() {
    const values = Object.values(data.rates);

    return values.length > 0 ? values[currentIndex] : 1;
  }

  function getCurrentSymbol() {
    const values = Object.values(data.symbols);

    return values.length > 0 ? values[currentIndex] : "$";
  }

  window.getCurrentRate = getCurrentRate;
  window.getCurrentSymbol = getCurrentSymbol;

})();
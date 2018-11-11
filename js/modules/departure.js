(function() {
    const container = document.querySelector("#input-from .dropdown");
    let currentIndex = 0;
    let isInit = false;
    let data = {};
  
    function close() {
      const menu = container.querySelector(".menu");
  
      container.classList.remove("active");
      menu.classList.remove("transition");
      menu.classList.remove("visible");
    }
    
    function updateCurrentItem(name) {
      const currentItem = container.querySelector('.text');
  
      currentItem.innerHTML = '';

      currentItem.classList.remove('default');
  
      let item = document.createElement("div");
      item.className = "item";
      item.innerText = name;
  
      currentItem.appendChild(item);
    }

    function renderItems() {
        const menu = container.querySelector('.menu');
        menu.innerHTML = '';

        data.forEach(function({
            PlaceName,
            CityId,
            PlaceId
        }, index) {
            const menu = container.querySelector(".menu");

            let item = document.createElement("div");
            item.className = "item";
            item.setAttribute("data-value", CityId.toLocaleLowerCase());
            item.innerText = PlaceName + " (" + PlaceId + ")";

            if(index === 0) {
                item.classList.add("selected");
            }

            let icon = document.createElement("i");
            icon.className = "icon plane";

            item.insertBefore(icon, item.firstChild);

            item.addEventListener("click", function() {
                let selectedItem = container.querySelector(".item.selected");

                selectedItem.classList.remove("selected");

                this.classList.add("selected");

                currentIndex = index;

                updateCurrentItem(PlaceName);

                close();
            }, true);

            menu.appendChild(item);
        });
    }
  
    function loadData() {
      container.classList.add("loading");
  
      api.getDeparture(function(response) {
        data = response;
  
        container.classList.remove("loading");
  
        renderItems();
      });
  
      isInit = true;
    }
  
    // Open list
  
    container.addEventListener("click", function() {
      let menu = container.querySelector(".menu");
  
      container.classList.add("active");
      menu.classList.add("transition");
      menu.classList.add("visible");
  
      if (!isInit) {
          loadData();
      }
    }, true);
  
    // 1.2.d
    document.addEventListener("click", function(event) {
      let targetElement = event.target;
  
      do {
          if (targetElement === container) {
              return;
          }
          targetElement = targetElement.parentNode;
      } while (targetElement);
  
      close();
    });
  
    function getDepartureData() {
        return data;
    }

    function getDepartureKey() {
        return data.length > 0 ? data[currentIndex].PlaceName : null;
    }

    function getCurrentIndexDep() {
        return currentIndex;
    }

    function updateDeparture(key, collection, index) {
        currentIndex = index;
        data = collection;

        updateCurrentItem(key);
        renderItems();
    }

    window.getDepartureData = getDepartureData;
    window.getDepartureKey = getDepartureKey;
    window.getCurrentIndexDep = getCurrentIndexDep;
    window.updateDeparture = updateDeparture;
  
  })();
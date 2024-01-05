document.addEventListener('DOMContentLoaded', function () {
  var startDate = new Date(localStorage.getItem('startDate'));
  var endDate = new Date(localStorage.getItem('endDate'));
  var selectedProvince = localStorage.getItem('selectedProvince');

  var startDateElement = document.getElementById('startDate');
  var endDateElement = document.getElementById('endDate');
  var provinceElement = document.getElementById('selectedProvince');

  startDateElement.textContent = startDate.toDateString();
  endDateElement.textContent = endDate.toDateString();
  provinceElement.textContent = selectedProvince;

  var timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  if (selectedProvince) {
    fetch(`http://localhost:3000/All_Provinces`)
      .then(response => response.json())
      .then(data => {
        const selected = data.find(item => item.title === selectedProvince);
        if (selected) {
          const famousPlacesDiv = document.getElementById('content');
          let placesToDisplay = Math.min(diffDays + 1, 8);
          if (diffDays >= 1 && diffDays <= 7) {
            placesToDisplay = diffDays + 2;
          }
          const randomIndices = Array.from({ length: selected.famous_places.length }, (_, i) => i);
          shuffleArray(randomIndices);

          for (let i = 0; i < placesToDisplay; i++) {
            const placeIndex = randomIndices[i];
            const place = selected.famous_places[placeIndex];

            const div = document.createElement('div');
            const title = document.createElement('h2');
            const image = document.createElement('img');

            title.textContent = place.name;
            image.src = place.image;
            image.alt = place.name;

            div.dataset.description = place.description;
            div.dataset.mapURL = place.map;
            div.classList.add('famous-place');

            div.appendChild(title);
            div.appendChild(image);

            famousPlacesDiv.appendChild(div);
          }
        } else {
          console.log("Selected province not found!");
        }
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  } else {
    console.log("No selected province found!");
  }
});

document.addEventListener('click', function(event) {
  if (event.target.classList.contains('famous-place')) {
    const name = event.target.querySelector('h2').textContent;
    const imageSrc = event.target.querySelector('img').src;

    const description = event.target.dataset.description;
    const mapURL = event.target.dataset.mapURL;

    Swal.fire({
      title: 'Detail of the place',
      html: `
      <div>
        <h2>${name}</h2>
        <img src="${imageSrc}" alt="${name}" class="sweetalert_page">
        <p>${description}</p>
        <a href="${mapURL}" target="_blank">View Map</a>
      </div>
    `,
      confirmButtonText: 'Okay'
    });
  }
});
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

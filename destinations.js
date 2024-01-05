fetch('http://localhost:3000/Destinations')
    .then(response => response.json())
    .then(data => {
        const contentDiv = document.getElementById('content');
        data.forEach(item => {
            const div = document.createElement('div');
            const title = document.createElement('h2');
            const image = document.createElement('img');
            const description = document.createElement('p');

            title.textContent = item.title;
            image.src = item.image;
            image.alt = item.title;
            description.textContent = item.description;

            div.appendChild(title);
            div.appendChild(image);
            div.appendChild(description);

            contentDiv.appendChild(div);
        });
    })
    .catch(error => {
        console.log('Error fetching data:', error);
    });
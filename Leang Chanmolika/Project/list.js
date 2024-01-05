fetch('http://localhost:3000/All_Provinces')
    .then(response => response.json())
    .then(data => {
        const contentDiv = document.getElementById('content');
        data.forEach(item => {
            const div = document.createElement('div');
            const title = document.createElement('h2');
            const image = document.createElement('img');

            title.textContent = item.title;
            image.src = item.image;
            image.alt = item.title;

            div.appendChild(title);
            div.appendChild(image);
            contentDiv.appendChild(div);

            div.addEventListener('click', handleDivClick);
            image.addEventListener('click', handleImgClick);
        });

        function handleDivClick(event) {
            const selectedProvince = event.currentTarget.querySelector('h2').textContent;
            localStorage.setItem('selectedProvince', selectedProvince);
            window.location.href = '/Vith Vann/destination.html';
        }
        function handleImgClick(event) {
            const selectedProvince = event.currentTarget.parentElement.querySelector('h2').textContent;
            localStorage.setItem('selectedProvince', selectedProvince);
            window.location.href = '/Vith Vann/destination.html';
        }
    })
    .catch(error => {
        console.log('Error fetching data:', error);
    });
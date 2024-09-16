let imageName = document.getElementById("imageName");
let imageUrl = document.getElementById("imageUrl");
let btn = document.getElementById("btn");
let text = document.getElementById("text");
let container = document.getElementById("container");



function fetchingData() {
    fetch('https://66e7e6c1b17821a9d9da70a4.mockapi.io/Lab2-webserver')
        .then((response) => response.json())
        .then((data) => {
            data.map(content => {
                console.log(content);
                let div = document.createElement("div");
                let iname = document.createElement("p");
                let image = document.createElement("img");
                let deleteButton = document.createElement("button");

                div.classList.add("box");
                image.classList.add("image");
                deleteButton.classList.add("delButton");

                iname.textContent = content.name;
                image.src = content.url;
                deleteButton.textContent = "DELETE"

                div.appendChild(iname);
                div.appendChild(image);
                div.appendChild(deleteButton);
                container.appendChild(div);

                deleteButton.addEventListener("click", () => {
                    fetch(`https://66e7e6c1b17821a9d9da70a4.mockapi.io/Lab2-webserver/${content.id}`, {
                        method: 'DELETE',
                    })
                        .then(response => {
                            if (response.ok) {
                                div.remove();
                            };
                        })
                })
            });
        });

}

fetchingData();

btn.addEventListener("click", () => {
    let nameValue = imageName.value;
    let imageValue = imageUrl.value;
    if (nameValue == '' || imageValue == '') {
        text.textContent = 'Please fill the inputs!';
        text.style.color = 'red';
        return;
    }

    fetch('https://66e7e6c1b17821a9d9da70a4.mockapi.io/Lab2-webserver', {
        method: 'POST',
        body: JSON.stringify({
            name: nameValue,
            url: imageValue
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            text.textContent = `The image (${data.name}) is added successfully`;
            text.style.color = "black";
        });
});


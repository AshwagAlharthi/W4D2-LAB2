let imageName = document.getElementById("imageName");
let imageUrl = document.getElementById("imageUrl");
let btn = document.getElementById("btn");
let text = document.getElementById("text");
let container = document.getElementById("container");

function fetchingData(){
    fetch('https://66e7e6c1b17821a9d9da70a4.mockapi.io/Lab2-webserver')
  .then((response) => response.json())
  .then((data) => {
    data.map(content => {
        console.log(content);
        
        let div = document.createElement("div");
        let name = document.createElement("p");
        let image = document.createElement("img");
        let deleteButton = document.createElement("button");

        div.classList.add("box");
        image.classList.add("image");
        deleteButton.classList.add("delButton");

        name.textContent = content.name;
        image.src = content.url;
        deleteButton.textContent = "DELETE"

        div.appendChild(name);
        div.appendChild(image);
        div.appendChild(deleteButton);
        container.appendChild(div);

        deleteButton.addEventListener("click" , ()=>{
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
    fetch('https://66e7e6c1b17821a9d9da70a4.mockapi.io/Lab2-webserver', {
        method: 'POST',
        body: JSON.stringify({
            name: imageName.value,
            url: imageUrl.value
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            text.textContent =`The image (${data.name}) is added successfully`;
        });
});


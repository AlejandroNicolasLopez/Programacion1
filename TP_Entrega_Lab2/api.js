const d = document, 
    $table = d.querySelector(".table"),
    $from = d.querySelector(".form"),
    $template = d.getElementById(".template").content,
    $fragment = d.createDocumentFragment();

const getAllPersonas = async () => {
    try {
        let res = await fetch("http://localhost:3000/personas");
        json = await res.json();

        if (!res.ok) throw {status: res.status, statusTest: res.statusText}

        json.forEach(element =>{
            $template.querySelector(".nombres").textContent = element.nombres;
            $template.querySelector(".apellido").textContent = element.apellido;
            $template.querySelector(".edad").textContent = element.edad;
            $template.querySelector(".email").textContent = element.email;
            $template.querySelector(".edit").dataset.id = element.id;
            $template.querySelector(".edit").dataset.nombres = element.nombres;
            $template.querySelector(".edit").dataset.apellido = element.apellido;
            $template.querySelector(".edit").dataset.edad = element.edad;
            $template.querySelector(".edit").dataset.email = element.email;
            $template.querySelector(".delete").dataset.id = element.nombre;

            let $node = d.importNode($template,true);
            $fragment.appendChild($node);

        });
        $table.querySelector(".tbody").appendChild($fragment);

    }
    catch(err) {
        let message = err.statusText || "ocurrio un error";
        $table.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}: ${message} </b></p>`);

    }
    d.addEventListener("submit", async e =>{
        if (e.target === $from){
            e.preventDefault();
            if(!e.target.id.value){
                try {
                    let options ={
                        method:"POST",
                        headers:{
                            "Content-type":"application/json;charset =utf-8"
                        },
                        body:JSON.stringify({
                            nombres: e.target.nombres.value,
                            apellido: e.target.apellido.value,
                            edad: e.target.edad.value,
                            email: e.target.email.value,
                        })
                    }
                    let res = await fetch("http://localhost:3000/personas", options);
                    json = await res.json();

                    location.reload();
                    if (!res.ok) throw {status: res.status, statusTest:res.statusText}

                }
                catch(error) {
                    let message = err.statusText || "Ocurrio un error";
                    $from.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}: ${message} </b></p>`);
                }
            }
            else{
                try{
                    let options = {
                        method: "PUT",
                        headers:{
                            "Content-type":"application/json;charset =utf-8"
                        },
                        body:JSON.stringify({
                            nombres: e.target.nombres.value,
                            apellido: e.target.apellido.value,
                            edad: e.target.edad.value,
                            email: e.target.email.value,
                        })
                    }
                    let res = await fetch(`http://localhost:3000/personas${e.target.id.value}`, options);
                    json = await res.json();

                    if (!res.ok) throw {status: res.status, statusTest:res.statusText}

                    location.reload();
                }
                catch (err){
                    let message = err.statusText || "Ocurrio un error";
                    $from.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}: ${message} </b></p>`);
                }
            }
        }
    })
}
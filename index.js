console.log ("Pre-Entrega Curso Node.js - Horacio Javier Mayochi - Sep-2026")
console.log("Iniciando servidor con Node.js");
console.log ("CONSOLE.LOG de process.args: ",process.argv); // Muestra todos los argumentos que se pasaron al ejecutar el script
const args = process.argv.slice(2); //

async function obtenerProductos(ruta) {

     try{
        const response = await fetch(`https://fakestoreapi.com/${ruta}`)
        const data = await response.json()
        return data
    }catch(error){
        console.log(error)
    }


}


async function crearProducto(producto) {

    try{
        const response = await fetch("https://fakestoreapi.com/products",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(producto)
        })

        if(response.ok){
            const data = await response.json();
            console.log(data)
            console.log("Producto creado: ", data.id)
        }


        }catch(error){
        console.log(error)
    }




}


async function eliminarProducto(producto){
    try{
        const response = await fetch(`https://fakestoreapi.com/${producto}`,{
            method: "DELETE"
        })
        const data = await response.json()
        return data
    }catch(error){
        console.log(error)
    }
}


switch(args[0]){
    case "GET":
        console.log("Ingreso a GET");
        console.log("Toma un dato")
        if(args[1] && args[1].startsWith("products")){

            // Obtengo el ID del producto
            const id = Number(args[1].split("/")[1]);

            if (id >= 1 && id <= 20) {


            const productos = await obtenerProductos(args[1])
            console.log(productos)

            } else {
                console.log("El ID debe estar entre 1 y 20 - Ingrese un ID válido");
            }

        }else{
            console.log("Comando incorrecto");
        }
        break;



    case "POST":
        console.log("Ingreso a POST");
       if(args[1] && args[2] && args[3] && args[4] && args[1] == "products"){
            await crearProducto({title: args[2], price: args[3], category: args[4]})
            console.log("Prodcuto creado Satisfactoriamente")
        }else{
            console.log("Comando incompleto o incorrecto")
        }
        break;




    // case "PUT":
    //     console.log("Ingreso a PUT");
    //     if(args[1]){
    //         console.log(`Editamos dato con id: ${args[1]} satisfactoriamente`)
    //     }else{
    //         console.log("Comando PUT incompleto, el id es necesario")
    //     }
    //     break;
   case "DELETE":
        console.log(args[0]);

        if (args[1] && args[1].startsWith("products/") && args[1].length > 9) {

            // Obtengo el ID del producto
            const id = Number(args[1].split("/")[1]);

            // Valido que el ID esté entre 1 y 20
            if (id >= 1 && id <= 20) {

                const response = await eliminarProducto(args[1]);

                console.log("Producto eliminado ", response);

            } else {

                console.log("Error: el ID del producto debe estar entre 1 y 20" + "- Ingrese un ID válido" - DELETE);
            }

        } else {

            console.log("Comando incompleto o incorrecto");
        }

        break;
    default:
        console.log("Comando incompleto, incorrecto o invalido")
}

console.log("Finalizando servidor con Node.js");



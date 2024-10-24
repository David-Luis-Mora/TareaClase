$(document).ready(function() {

    $("#agregar-tarea").click(function() {
        let tarea = $("#nueva-tarea").val(); 
        if (tarea.trim() !== "") {
            
            let nuevaTarea = `
                <li>
                    <span class="nombre-tarea">${tarea}</span>
                    <button class="editar-tarea">Editar</button>
                    <button class="eliminar-tarea">Eliminar</button>
                </li>`;
            
            
            $("#lista-tareas").append(nuevaTarea);
          
            $("#nueva-tarea").val("");
        }
    });

  
    $(document).on("click", ".eliminar-tarea", function() {
        $(this).parent().remove(); 
    });

   
    $(document).on("click", ".editar-tarea", function() {
        let tarea = $(this).siblings(".nombre-tarea");
        let nuevoNombre = prompt("Editar la tarea:", tarea.text());
        if (nuevoNombre && nuevoNombre.trim() !== "") {
            tarea.text(nuevoNombre); 
        }
    });

  
    $("#limpiar-tareas").click(function() {
        $("#lista-tareas").empty(); 
    });

});

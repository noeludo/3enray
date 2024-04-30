$(document).ready(function() {
    var playerXName = prompt("Nombre del jugador X:");
    var playerOName = prompt("Nombre del jugador O:");

    var currentPlayer = "X";
    var cells = $(".cell");

    // Función para reiniciar el juego
    function resetGame() {
        cells.text(""); // Limpiar el contenido de todas las celdas
    }

    // Función para verificar si hay un ganador
    function checkWinner() {
        // Combinaciones ganadoras
        var winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontales
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticales
            [0, 4, 8], [2, 4, 6] // Diagonales
        ];

        for (var i = 0; i < winningCombinations.length; i++) {
            var combo = winningCombinations[i];
            var cell1 = $("#cell-" + combo[0]).text();
            var cell2 = $("#cell-" + combo[1]).text();
            var cell3 = $("#cell-" + combo[2]).text();

            if (cell1 !== "" && cell1 === cell2 && cell1 === cell3) {
                var winnerName = currentPlayer === "X" ? playerXName : playerOName;
                alert("¡El jugador " + winnerName + " ha ganado!");
                return true; // Devolver true si hay un ganador
            }
        }

        return false; // No hay ganador
    }

    // Función para manejar el clic en una celda
    function cellClickHandler() {
        if ($(this).text() === "") { // Verificar si la celda está vacía
            $(this).text(currentPlayer); // Colocar el símbolo del jugador actual en la celda
            var winner = checkWinner(); // Verificar si hay un ganador

            if (winner) {
                // Detener el juego si hay un ganador
                cells.off('click');
            } else {
                // Cambiar al siguiente jugador
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                $("#currentPlayerIndicator").text(currentPlayer); // Actualizar el indicador de turno
            }
        }
    }

    // Asignar el manejador de clic a todas las celdas
    cells.click(cellClickHandler);

    // Asignar el manejador de clic al botón de reiniciar
    $("#resetButton").click(function() {
        resetGame(); // Reiniciar el juego
        // Volver a asignar el manejador de clic a todas las celdas
        cells.click(cellClickHandler);
    });
});

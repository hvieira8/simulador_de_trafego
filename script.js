document.getElementById("traffic-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Obtém os valores dos campos de entrada
    const density = parseInt(document.getElementById("traffic-density").value); // Densidade de tráfego (veículos/km)
    const length = parseInt(document.getElementById("road-length").value); // Comprimento da estrada (km)

    // Calcula o número de veículos na estrada
    const totalVehicles = density * length;

    // Atualiza o resultado da simulação
    document.getElementById("simulation-result").textContent = `Total de veículos na estrada: ${totalVehicles}`;

    // Chama a função para iniciar a simulação de tráfego
    simulateTraffic(density, length, totalVehicles);
});

function simulateTraffic(density, length, totalVehicles) {
    const canvas = document.getElementById("traffic-canvas");
    const ctx = canvas.getContext("2d");

    // Ajusta o tamanho do canvas de acordo com o comprimento da estrada
    canvas.width = length * 100; // Cada km será representado por 100 pixels
    canvas.height = 300;

    // Desenha a estrada
    ctx.fillStyle = "#555";
    ctx.fillRect(0, canvas.height / 2 - 20, canvas.width, 40); // Estrada

    // Array para armazenar a posição dos veículos
    const vehicles = [];

    // Cria os veículos com posições iniciais aleatórias
    for (let i = 0; i < density; i++) {
        vehicles.push({
            x: Math.random() * canvas.width, // Posição inicial aleatória
            y: canvas.height / 2 - 10, // Alinha os veículos na estrada
            speed: Math.random() * 2 + 1, // Velocidade aleatória dos veículos
        });
    }

    // Função para atualizar a posição dos veículos e desenhar
    function update() {
        // Limpa o canvas para desenhar a próxima frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Desenha a estrada
        ctx.fillStyle = "#555";
        ctx.fillRect(0, canvas.height / 2 - 20, canvas.width, 40);

        // Desenha os veículos e move-os
        vehicles.forEach((vehicle, index) => {
            vehicle.x += vehicle.speed; // Move o veículo para a direita

            // Se o veículo alcançar o final da estrada, ele volta para o início
            if (vehicle.x > canvas.width) {
                vehicle.x = -20; // Começa novamente da esquerda
            }

            // Desenha o veículo
            ctx.fillStyle = "blue";
            ctx.fillRect(vehicle.x, vehicle.y, 20, 10); // Desenha o veículo como um quadrado
        });

        // Chama a função de animação novamente para criar o loop
        requestAnimationFrame(update);
    }

    // Inicia o loop de animação
    update();
}

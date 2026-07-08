// ==========================================
// Airport Canvas Animation
// Airport Operations Control Center
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById("airportCanvas");

    if (!canvas)
        return;

    const ctx = canvas.getContext("2d");

    let planeX = -120;
    let busX = 150;
    let busDirection = 1;

    function drawBackground() {

        ctx.fillStyle = "#0d1b2a";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

    }

    function drawTerminal() {

        ctx.fillStyle = "#3d4d63";

        ctx.fillRect(120, 70, 260, 90);

        ctx.fillStyle = "#2a394d";

        ctx.fillRect(140, 90, 220, 50);

        ctx.fillStyle = "#67c7ff";

        for (let i = 0; i < 7; i++) {

            ctx.fillRect(155 + (i * 28), 102, 18, 24);

        }

        ctx.fillStyle = "#ffffff";
        ctx.font = "18px Poppins";

        ctx.fillText("Terminal 3", 185, 58);

    }

    function drawGates() {

        const gates = ["A1", "A2", "A3", "A4"];

        for (let i = 0; i < gates.length; i++) {

            const x = 150 + (i * 55);

            ctx.strokeStyle = "#9eb7d1";

            ctx.beginPath();
            ctx.moveTo(x, 160);
            ctx.lineTo(x, 220);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(x, 225, 6, 0, Math.PI * 2);

            ctx.fillStyle = (i % 2 === 0)
                ? "#3cff92"
                : "#ffcb4d";

            ctx.fill();

            ctx.fillStyle = "#ffffff";
            ctx.font = "13px Poppins";
            ctx.fillText(gates[i], x - 10, 245);

        }

    }

    function drawRunway() {

        ctx.fillStyle = "#2f3947";

        ctx.fillRect(60, 340, 1080, 70);

        ctx.strokeStyle = "#ffffff";

        ctx.lineWidth = 2;

        for (let x = 90; x < 1120; x += 45) {

            ctx.beginPath();
            ctx.moveTo(x, 375);
            ctx.lineTo(x + 20, 375);
            ctx.stroke();

        }

        ctx.fillStyle = "#ffffff";

        ctx.font = "18px Poppins";

        ctx.fillText("RUNWAY 28", 520, 332);

    }

    function drawTaxiway() {

        ctx.fillStyle = "#3d4956";

        ctx.fillRect(120, 275, 820, 28);

        ctx.fillStyle = "#ffd54f";

        for (let x = 140; x < 920; x += 35) {

            ctx.fillRect(x, 287, 10, 3);

        }

    }

    function drawPlane(x, y) {

        ctx.save();

        ctx.translate(x, y);

        // Body
        ctx.fillStyle = "#dfe9f4";

        ctx.fillRect(-28, -5, 56, 10);

        // Nose
        ctx.beginPath();
        ctx.arc(30, 0, 6, 0, Math.PI * 2);
        ctx.fill();

        // Wings
        ctx.fillStyle = "#9bb2c7";

        ctx.fillRect(-6, -18, 12, 36);

        // Tail
        ctx.fillRect(-28, -12, 8, 18);

        ctx.restore();

    }

    function drawBus(x, y) {

        ctx.fillStyle = "#3cb8ff";

        ctx.fillRect(x, y, 48, 22);

        ctx.fillStyle = "#cdefff";

        ctx.fillRect(x + 8, y + 5, 30, 9);

        ctx.fillStyle = "#111";

        ctx.beginPath();
        ctx.arc(x + 10, y + 24, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x + 38, y + 24, 4, 0, Math.PI * 2);
        ctx.fill();

    }

    function drawInfo() {

        ctx.fillStyle = "#d7e7f6";

        ctx.font = "16px Poppins";

        ctx.fillText("Wind : 12 kt", 760, 45);

        ctx.fillText("Visibility : 8 km", 760, 70);

        ctx.fillText("Temperature : 32°C", 760, 95);

    }

    function animate() {

        drawBackground();

        drawTerminal();

        drawGates();

        drawTaxiway();

        drawRunway();

        drawPlane(175, 220);

        drawPlane(planeX, 375);

        drawBus(busX, 285);

        drawInfo();

        planeX += 2;

        if (planeX > canvas.width + 100)
            planeX = -100;

        busX += (1.5 * busDirection);

        if (busX > 880)
            busDirection = -1;

        if (busX < 140)
            busDirection = 1;

        requestAnimationFrame(animate);

    }

    animate();

});

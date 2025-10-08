function generateWish() {
    const name = document.getElementById('nameInput').value.trim();
    const occasion = document.getElementById('occasionInput').value;
    const output = document.getElementById('output');

    if (!name) {
        output.textContent = "Please enter a name!";
        output.classList.add('show');
        return;
    }

    let wishText = "";
    switch (occasion) {
        case "birthday":
            wishText = `🎂 Happy Birthday ${name}! 🎉`;
            break;
        case "anniversary":
            wishText = `💞 Happy Anniversary ${name}! 💐`;
            break;
        case "retairment":
            wishText = `🎓 Congratulations ${name} on your Retairment! `;
            break;
        case "graduation":
            wishText = `🎓 Congratulations ${name} on your Graduation! 🏆`;
            break;
        case "newyear":
            wishText = `🎆 Happy New Year ${name}! ✨`;
            break;
        default:
            wishText = `🎉 Best Wishes ${name}!`;
    }

    output.textContent = wishText;
    output.classList.remove('show');
    void output.offsetWidth;
    output.classList.add('show');
    launchConfetti();
}

/* Confetti Effect */
function launchConfetti() {
    const duration = 2 * 1000;
    const end = Date.now() + duration;
    const colors = ['#bb0000', '#ffffff', '#00ff99', '#ffcc00', '#ff66ff'];

    (function frame() {
        const timeLeft = end - Date.now();
        if (timeLeft <= 0) return;
        const particleCount = 50 * (timeLeft / duration);
        confetti({
            particleCount,
            spread: 70,
            origin: { y: 0.6 },
            colors
        });
        requestAnimationFrame(frame);
    }());
}

/* Confetti library */
(function () {
    var confetti = function (opts) {
        const canvas = document.getElementById('confetti');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = Array.from({ length: opts.particleCount }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 4 + 1,
            d: Math.random() * opts.spread + 10,
            color: opts.colors[Math.floor(Math.random() * opts.colors.length)],
            tilt: Math.random() * 10 - 10
        }));

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                ctx.beginPath();
                ctx.fillStyle = p.color;
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
                ctx.fill();
            });
            update();
        };

        const update = () => {
            particles.forEach(p => {
                p.y += Math.cos(p.d) + 1;
                p.x += Math.sin(p.d);
                if (p.y > canvas.height) p.y = 0;
            });
        };

        let animationId;
        const loop = () => {
            draw();
            animationId = requestAnimationFrame(loop);
            if (Date.now() > opts.end) cancelAnimationFrame(animationId);
        };

        loop();
    };
    window.confetti = confetti;
})();

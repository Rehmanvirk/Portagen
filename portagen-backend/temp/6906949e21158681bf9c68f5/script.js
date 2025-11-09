
// Minimal Dark Template JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Add typing effect to headers
    const headers = document.querySelectorAll('h1, h2');
    headers.forEach(header => {
        const text = header.textContent;
        header.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                header.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                header.innerHTML += '<span class="cursor"></span>';
            }
        }
        
        typeWriter();
    });

    // Add terminal-like hover effects
    const items = document.querySelectorAll('.item');
    items.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#222';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#1a1a1a';
        });
    });

    // Add code syntax highlighting effect
    const codeElements = document.querySelectorAll('pre');
    codeElements.forEach(code => {
        code.style.color = '#00ff00';
        code.style.textShadow = '0 0 3px rgba(0, 255, 0, 0.3)';
    });

    // Console log message for developers
    console.log('%c Portfolio loaded successfully! ', 'background: #00ff00; color: #000; font-weight: bold;');
});
      
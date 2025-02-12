export function initializeBubbleInteraction() {
    const interBubble = document.querySelector<HTMLDivElement>('.interactive');
    if (!interBubble) return;

    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;
    let lastUpdate = performance.now();
    let animationFrameId: number;

    const lerp = (start: number, end: number, factor: number) => {
        return start * (1 - factor) + end * factor;
    };

    const moveBubble = (timestamp: number) => {
        const deltaTime = (timestamp - lastUpdate) / 16;
        lastUpdate = timestamp;
        
        const easeAmount = Math.min(0.075 * deltaTime, 1);
        curX = lerp(curX, tgX, easeAmount);
        curY = lerp(curY, tgY, easeAmount);
        
        // Calculate position relative to bubble size
        const bubbleSize = interBubble.offsetWidth / 2;
        const transformX = curX - bubbleSize;
        const transformY = curY - bubbleSize;
        
        const matrix = `matrix3d(1,0,0,0, 0,1,0,0, 0,0,1,0, ${transformX},${transformY},0,1)`;
        interBubble.style.transform = matrix;
        
        animationFrameId = requestAnimationFrame(moveBubble);
    };

    const handleMouseMove = (event: MouseEvent) => {
        // Use direct mouse coordinates
        tgX = event.clientX;
        tgY = event.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(moveBubble);

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(animationFrameId);
    };
}

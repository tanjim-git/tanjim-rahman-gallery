import { useEffect } from 'react';

export function useCustomCursor() {
  useEffect(() => {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(animate);
    };

    const interactiveSelector = 'a, button, [role="button"], input, textarea, select, .cursor-hover';
    const portfolioSelector = '.masonry [class*="group"], .masonry img';

    const onEnterInteractive = () => {
      dot.classList.add('cursor-active');
      ring.classList.add('cursor-active');
    };
    const onLeaveInteractive = () => {
      dot.classList.remove('cursor-active', 'cursor-view');
      ring.classList.remove('cursor-active', 'cursor-view');
    };
    const onEnterPortfolio = () => {
      dot.classList.add('cursor-view');
      ring.classList.add('cursor-view');
    };
    const onLeavePortfolio = () => {
      dot.classList.remove('cursor-view');
      ring.classList.remove('cursor-view');
    };

    const addListeners = () => {
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.addEventListener('mouseenter', onEnterInteractive);
        el.addEventListener('mouseleave', onLeaveInteractive);
      });
      document.querySelectorAll(portfolioSelector).forEach((el) => {
        el.addEventListener('mouseenter', onEnterPortfolio);
        el.addEventListener('mouseleave', onLeavePortfolio);
      });
    };

    // Observe DOM changes to rebind on new elements
    const observer = new MutationObserver(() => addListeners());
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', onMouseMove);
    addListeners();
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
      dot.remove();
      ring.remove();
    };
  }, []);
}

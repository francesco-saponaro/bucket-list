import { useEffect, useRef } from 'react';
import { animate } from "framer-motion"

type AnimatedNumberProps = {
    from: number;
    to: number | undefined;
    delay?: number;
    setState: (value: boolean) => void;
}

const AnimatedNumber = ({ from, to, delay, setState }: AnimatedNumberProps) => {
    const nodeRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const node = nodeRef.current;
        if (node) {
            node.textContent = from?.toFixed(0) || '';
        }

        console.log(to, "to");
        console.log(node, "node");

        if (to != undefined && node) {
            setTimeout(() => {

                const controls = animate(from, to, {
                    type: "spring",
                    stiffness: 50,
                    damping: 20,
                    mass: 1,
                    onUpdate(value) {
                        if (node) {
                            node.textContent = value?.toFixed(0) || '';
                        }
                    },
                    onComplete() {
                        if (node) {
                            setTimeout(() => {
                                const euroSpan = document.createElement('span');
                                euroSpan.textContent = '€';
                                euroSpan.style.opacity = '0';
                                euroSpan.style.transition = 'opacity 0.4s ease-out';
                                node.appendChild(euroSpan);
                                requestAnimationFrame(() => {
                                    euroSpan.style.opacity = '1';
                                    setState(false);
                                });
                            }, 300);
                        }
                    },
                });

                return () => controls.stop();
            }, delay || 0);
        }
    }, [from, to]);

    return (
        <span ref={nodeRef}></span>
    );
};

export default AnimatedNumber;

//€
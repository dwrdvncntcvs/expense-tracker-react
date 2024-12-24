import { useEffect, useRef, useState } from "react";

const usePieChartResize = () => {
    const ref = useRef<HTMLDivElement | null>(null);

    const [outerRadius, setOuterRadius] = useState<number>(0);
    const [cx, setCx] = useState<number>(0);
    const [cy, setCy] = useState<number>(0);

    useEffect(() => {
        const currentRef = ref.current;

        if (!currentRef) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;

                setOuterRadius(Math.min(width, height) / 2 - 30);
                setCx(width / 2);
                setCy(height / 2);
            }
        });

        resizeObserver.observe(currentRef);

        return () => {
            resizeObserver.disconnect();
        };
    }, [outerRadius]);

    const resizeData = {
        outerRadius,
        cx,
        cy,
    };

    return { ref, resizeData };
};

export default usePieChartResize;

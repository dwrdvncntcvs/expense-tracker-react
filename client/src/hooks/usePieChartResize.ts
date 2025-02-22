import { useEffect, useRef, useState } from "react";

const usePieChartResize = () => {
    const ref = useRef<HTMLDivElement | null>(null);

    const [outerRadius, setOuterRadius] = useState<number>(0);
    const [cx, setCx] = useState<number>(0);
    const [cy, setCy] = useState<number>(0);
    const [subtractOuterRadiusVal, setSubtractOuterRadiusVal] =
        useState<number>(0);

    useEffect(() => {
        const currentRef = ref.current;

        if (!currentRef) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;

                setOuterRadius(Math.min(width, height) / 2 - 40);
                setCx(width / 2);
                setCy(height / 2);
                setSubtractOuterRadiusVal(Math.min(width, height) / 2 - 65);
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
        subtractOuterRadiusVal,
    };

    return { ref, resizeData };
};

export default usePieChartResize;

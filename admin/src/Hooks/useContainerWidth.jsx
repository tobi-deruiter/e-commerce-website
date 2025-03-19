import { useEffect, useState } from "react";

export const useContainerWidth = (element, triggers) => {
    const [containerWidth, setContainerWidth] = useState(false);
    const effectTriggers = [element];
    for (const item in triggers) {
        effectTriggers.push(triggers[item]);
    }

    useEffect(() => {
        const current = element?.current;

        if (current) {
            setContainerWidth(current.offsetWidth);
        }
        
        const handleResize = () => {
            setContainerWidth(current.offsetWidth);
        }

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, effectTriggers);

    return containerWidth;
};
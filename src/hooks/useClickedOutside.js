import { useEffect, useRef } from "react";

export default function useClickedOutside(close, listenCapturing = true) {
    const ref = useRef();
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                close();
            }
        }
        document.addEventListener("click", handleClickOutside, listenCapturing);
        return () => document.removeEventListener("click", handleClickOutside, listenCapturing);
    }, [ref, close]);
    return [ref]

}


interface DropShadowProps {
    abortController?: AbortController;
    element: HTMLElement;
}

const MAX_OFFSET = 15;
const DROP_SHADOW_CLASS = "drop-shadow-effect";

export const initDropShadow = ({ abortController, element }: DropShadowProps) => {
    addStyleSheet();
    element.classList.add(DROP_SHADOW_CLASS);

    element.style.setProperty('--shadowX', "0");
    element.style.setProperty('--shadowY', "0");

    let latestMouse: { x: number; y: number } | null = null;
    let animationFrameId: number | null = null;

    const updateShadow = () => {
        if (!latestMouse) return;

        const inputRect = element.getBoundingClientRect();
        const elementCenterX = inputRect.left + inputRect.width / 2;
        const elementCenterY = inputRect.top + inputRect.height / 2;

        const percentX = (latestMouse.x - elementCenterX) / (inputRect.width / 2);
        const percentY = (latestMouse.y - elementCenterY) / (inputRect.height / 2);

        let shadowX = percentX * MAX_OFFSET;
        let shadowY = percentY * MAX_OFFSET;

        shadowX = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, shadowX));
        shadowY = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, shadowY));

        element.style.setProperty('--shadowX', shadowX.toString());
        element.style.setProperty('--shadowY', shadowY.toString());

        animationFrameId = null;
    };

    const onMouseMove = (e: MouseEvent) => {
        latestMouse = { x: e.clientX, y: e.clientY };
        if (animationFrameId === null) {
            animationFrameId = requestAnimationFrame(updateShadow);
        }
    };

    document.addEventListener("mousemove", onMouseMove, { signal: abortController?.signal });
};

export const destroyDropShadow = (props: DropShadowProps) => {

    const { abortController, element } = props;

    if (abortController) {
        abortController.abort();
    }

    element.classList.remove(DROP_SHADOW_CLASS);
    removeStyleSheet();

}

const addStyleSheet = () => {
    const oldLink = document.querySelector('link[data-drop-shadow="true"]');

    if (oldLink) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/dropShadow.css";
    link.setAttribute("data-drop-shadow", "true");
    document.head.appendChild(link);
};


const removeStyleSheet = () => {
    const link = document.querySelector('link[data-drop-shadow="true"]');
    if (link) {
        document.head.removeChild(link);
    }
};

interface DropShadowProps {
    abortController?: AbortController;
    element: HTMLElement;
}

const MAX_OFFSET = 30;
const DROP_SHADOW_CLASS = "drop-shadow-effect";

export const initDropShadow = ( {abortController, element}: DropShadowProps) => {
    addStyleSheet();

    element.classList.add(DROP_SHADOW_CLASS);


    element.style.setProperty('--shadowX', "0");
    element.style.setProperty('--shadowY', "0");

    document.addEventListener("mousemove", (e) => {

        const inputRect = element.getBoundingClientRect();

        const xElement = inputRect.left;
        const yElement = inputRect.top;

        const elementCenterX = xElement + inputRect.width / 2;
        const elementCenterY = yElement + inputRect.height / 2;

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        let shadowX = elementCenterX - mouseX;
        let shadowY = elementCenterY - mouseY;


        shadowX = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, shadowX));
        shadowY = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, shadowY));

        element.style.setProperty('--shadowX', shadowX.toString());
        element.style.setProperty('--shadowY', shadowY.toString());


    }, { signal: abortController?.signal });


}

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
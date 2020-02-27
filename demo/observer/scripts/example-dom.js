// DOM

{
    // Mouse-related
    document.addEventListener('click', handleMouseClick);
    document.addEventListener('click', handleMouseClick);
    document.addEventListener('click', handleMouseClick);
    document.addEventListener('click', handleMouseClick);

    // General
    window.addEventListener('error', handleGeneral);
    window.addEventListener('load', handleGeneral);

    // Keyboard-related
    document.addEventListener('keypress', handleKeyboard);
    document.addEventListener('keydown', handleKeyboard);

    function handleMouseClick() {}
    function handleKeyboard() {}
    function handleGeneral() {}
}

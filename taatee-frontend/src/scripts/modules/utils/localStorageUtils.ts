// Manipulate  local storage to save and retrieve data
// --------------------------------------------------------------------------------------------


export const setLocalStorage = (key: string, value: string) => {
    localStorage[key] = value;
}

export const getLocalStorage = (key: string) => {
    return localStorage[key];
}
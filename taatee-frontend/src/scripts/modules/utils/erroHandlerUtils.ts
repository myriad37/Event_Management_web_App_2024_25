export function displayError(container: HTMLElement, message: string, title?: string): void {
    container.innerHTML =   `<div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
    <p class="font-bold">${title ? title : "Error"}</p>
    <p>${message}</p>
  </div>`;
    setTimeout(() => hideError(container), 3000); // Adjust the timeout as needed
  }
  
  export function displaySuccess(container: HTMLElement, message: string): void {
    container.innerHTML =   `<div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
    <p class="font-bold">Success</p>
    <p>${message}</p>
  </div>`;
    setTimeout(() => hideError(container), 3000); // Adjust the timeout as needed
  }
  
  export function hideError(container: HTMLElement): void {
    container.innerHTML = "";
  }
  
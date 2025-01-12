export const navCollapsible = () => {
const userMenu = document.querySelector<HTMLDivElement>('#user-menu');
const userMenuList = document.querySelector<HTMLDivElement>('#user-menu-list');

if (userMenu && userMenuList) {
  userMenu.addEventListener('click', () => {
    userMenuList.classList.toggle('hidden');
  });
}

const mobileMenuList = document.querySelector<HTMLDivElement>('#mobile-menu');
const mobileMenu = document.querySelector<HTMLButtonElement>('#menu-toggle');
const mobileMenuClose = document.querySelector<HTMLButtonElement>('#menu-close-btn');
const mobileMenuShow = document.querySelector<HTMLButtonElement>('#menu-show-btn');

if (mobileMenu && mobileMenuList && mobileMenuClose && mobileMenuShow) {
  mobileMenu.addEventListener('click', () => {
    mobileMenuList.classList.toggle('hidden');
    mobileMenuClose.classList.toggle('hidden');
    mobileMenuShow.classList.toggle('hidden');
  });
}
}
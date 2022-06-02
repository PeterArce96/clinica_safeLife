    const header = () => {
        const headerNavThemeIconContainer = document.getElementById('headerNavThemeIconContainer');

        const headerNavMenuIcon = document.getElementById('headerNavMenuIcon');
        const headerNavMenuLinkList = document.querySelector('.header-nav__menu-link-list');
        
        const openMenu = () => {
        headerNavMenuLinkList.classList.toggle('header-nav__menu-link-list--open');
        };
        const toggleMenu = () => {
            const body = document.querySelector('.body');
            body.classList.toggle('body--dark');
            headerNavThemeIconContainer.classList.toggle('header-nav__theme-icon-container--active');
        };
        
        headerNavThemeIconContainer.addEventListener('click', toggleMenu);
        headerNavMenuIcon.addEventListener('click', openMenu);
        
    }
    
    export default header;
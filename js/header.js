    const header = () => {
        const headerNavThemeIconContainer = document.getElementById('headerNavThemeIconContainer');

        const headerNavMenuIcon = document.getElementById('headerNavMenuIcon');
        const headerNavMenuLinkList = document.querySelector('.header-nav__menu-link-list');
        const headerNavMenuLinkItems = document.querySelectorAll('.header-nav__menu-link-item');
        
        const openMenu = () => {
        headerNavMenuLinkList.classList.toggle('header-nav__menu-link-list--open');
        };
        const toggleMenu = () => {
            const body = document.querySelector('.body');
            body.classList.toggle('body--dark');
            headerNavThemeIconContainer.classList.toggle('header-nav__theme-icon-container--active');
        };
        const closeMenu = () => {
            headerNavMenuLinkList.classList.remove('header-nav__menu-link-list--open');
        };
        
        headerNavThemeIconContainer.addEventListener('click', toggleMenu);
        headerNavMenuIcon.addEventListener('click', openMenu);
        headerNavMenuLinkItems.forEach((element) =>{
            element.addEventListener('click', closeMenu);
        });
        
    }
    
    export default header;
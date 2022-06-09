    const header = () => {
        const header = document.querySelector('.header');

        const headerNavThemeIconContainer = document.getElementById('headerNavThemeIconContainer');

        const headerNavMenuIcon = document.getElementById('headerNavMenuIcon');
        const headerNavMenuLinkList = document.querySelector('.header-nav__menu-link-list');
        const headerNavMenuLinkItems = document.querySelectorAll('.header-nav__menu-link-item');
        

        const documentScroll = () => {
            header.classList.toggle('header--scroll', window.scrollY > 0);
            headerNavMenuLinkList.classList.toggle('header-nav__menu-link-list--scroll', window.scrollY > 0);
        };

        const toggleMenu = () => {
            const body = document.querySelector('.body');
            body.classList.toggle('body--dark');
            headerNavThemeIconContainer.classList.toggle('header-nav__theme-icon-container--active');
            
            if (body.classList.contains('body--dark')) {
                localStorage.setItem('lightMode', 'false');
            } else {
                localStorage.setItem('lightMode', 'true');
            }
        };

        const openMenu = () => {
        headerNavMenuLinkList.classList.toggle('header-nav__menu-link-list--open');
        };
        

        const closeMenu = () => {
            headerNavMenuLinkList.classList.remove('header-nav__menu-link-list--open');
        };
        
        if (localStorage.getItem('lightMode') === 'true' || localStorage.getItem('lightMode') === null) {
            document.querySelector('.body').classList.remove('body--dark');
            headerNavThemeIconContainer.classList.remove('header-nav__theme-icon-container--active');
        } else {
            document.querySelector('.body').classList.add('body--dark');
            headerNavThemeIconContainer.classList.add('header-nav__theme-icon-container--active');
        }


        document.addEventListener('scroll', documentScroll);
        headerNavThemeIconContainer.addEventListener('click', toggleMenu);
        headerNavMenuIcon.addEventListener('click', openMenu);
        headerNavMenuLinkItems.forEach((element) =>{
            element.addEventListener('click', closeMenu);
        });
        
    }
    
    export default header;
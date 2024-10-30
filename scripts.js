document.addEventListener('DOMContentLoaded', function() {

    // Initialize Swiper
    if (typeof Swiper !== 'undefined') {
        const swiper = new Swiper('.swiper-container', {
            effect: 'coverflow',
            coverflowEffect: {
                rotate: 30,
                slideShadows: true,
                stretch: 0,
                depth: 100,
                modifier: 1,
                centerSlides: true
            },
            direction: 'horizontal',
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: {
                delay: 6000,
                disableOnInteraction: false
            }
        });
    }

    // Fonction d'animation du compteur
    function animateValue(id, start, end, duration) {
        let obj = document.getElementById(id);
        if (!obj) return; // Return if the element doesn't exist
        let startTime = Date.now();
        let endTime = startTime + duration;
        let step = (end - start) / duration * 10;

        let updateValue = () => {
            let now = Date.now();
            let timeDiff = now - startTime;
            let newValue = start + (step * timeDiff);

            if (start < end) {
                newValue = Math.min(newValue, end);
            } else {
                newValue = Math.max(newValue, end);
            }

            obj.textContent = Math.round(newValue);

            if (now >= endTime) {
                clearInterval(interval);
            }
        };

        let interval = setInterval(updateValue, 1);
    }

    // Vérifier si les statistiques sont visibles
    let countersAnimated = false;
    const animateStats = () => {
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            const rect = statsSection.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight) && (rect.bottom >= 0);

            if (isVisible && !countersAnimated) {
                countersAnimated = true;
                animateValue("counter1", 0, 4396, 35000);
                animateValue("counter2", 0, 1020, 35000);
                animateValue("counter3", 0, 7, 35000);
                animateValue("counter4", 0, 164, 35000);
            }
        }
    }

    window.addEventListener('scroll', animateStats);
    animateStats();

    // Navigation dropdown logic
    let navItems = document.querySelectorAll('.nav-links-mobile .nav-item');
    let clickTimer; // pour stocker le timer

    function updateDropdownPosition(navItem) {
        let dropdown = navItem.querySelector('.dropdown_mobile');
        if (dropdown) {
            let rect = navItem.getBoundingClientRect();
            dropdown.dataset.initialLeft = rect.left;
            dropdown.dataset.initialTop = rect.bottom;
            dropdown.style.left = rect.left + "px";
            dropdown.style.top = rect.bottom + "px";
        }
    }

    navItems.forEach(function(navItem) {
        let mainLink = navItem.querySelector('a');
        
        if (mainLink) {
            mainLink.addEventListener('click', function(event) {
                event.preventDefault(); // empêche la navigation
                
                if (clickTimer) {
                    clearTimeout(clickTimer);
                    window.location.href = mainLink.getAttribute('href');
                } else {
                    clickTimer = setTimeout(function() {
                        updateDropdownPosition(navItem);
                        let dropdown = navItem.querySelector('.dropdown_mobile');
                        if (dropdown) {
                            if (dropdown.style.display === 'block') {
                                dropdown.style.display = 'none';
                            } else {
                                document.querySelectorAll('.nav-links-mobile .dropdown_mobile').forEach(function(d) {
                                    d.style.display = 'none';
                                });
                                dropdown.style.display = 'block';
                            }
                        }
                        clickTimer = null;
                    }, 250);
                }
            });
        }
    });

    function hideDropdowns() {
        document.querySelectorAll('.nav-links-mobile .dropdown_mobile').forEach(function(dropdown) {
            dropdown.style.display = 'none';
        });
    }

    window.addEventListener('scroll', hideDropdowns);
    const navLinksMobile = document.querySelector('.nav-links-mobile');
    if (navLinksMobile) {
        navLinksMobile.addEventListener('scroll', hideDropdowns);
    }
});
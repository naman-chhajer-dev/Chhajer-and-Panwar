// ============================================================
//  index.js  —  Burger menu + navbar height fix
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

    const burger   = document.getElementById('burger-btn');
    const navMenu  = document.getElementById('nav-menu');
    const heading  = document.querySelector('.heading');
    const heroBanner = document.getElementById('hero-banner');

    // ----------------------------------------------------------
    // FIX 1: Push hero banner below the fixed navbar dynamically
    // Runs on load and on every resize so it always stays correct
    // ----------------------------------------------------------
    function adjustHeroOffset() {
        var navHeight = heading.offsetHeight;
        heroBanner.style.marginTop = navHeight + 'px';
    }

    adjustHeroOffset();
    window.addEventListener('resize', adjustHeroOffset);


    // ----------------------------------------------------------
    // FIX 2: Burger menu — toggle open/close
    // ----------------------------------------------------------
    burger.addEventListener('click', function () {
        navMenu.classList.toggle('open');
        burger.classList.toggle('active');

        // Re-calculate hero offset when menu opens/closes
        // because the navbar height changes on mobile
        adjustHeroOffset();
    });


    // ----------------------------------------------------------
    // FIX 3: Close menu when any nav link is clicked (mobile)
    // ----------------------------------------------------------
    var navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(function (link) {
        // Skip the dropdown toggle button itself
        if (link.classList.contains('dropbtn')) return;

        link.addEventListener('click', function () {
            navMenu.classList.remove('open');
            burger.classList.remove('active');
            adjustHeroOffset();
        });
    });


    // ----------------------------------------------------------
    // FIX 4: Mobile dropdown — tap to toggle (instead of hover)
    // ----------------------------------------------------------
    var dropbtn = document.querySelector('.dropbtn');
    if (dropbtn) {
        dropbtn.addEventListener('click', function (e) {
            e.preventDefault();
            var dropContent = this.nextElementSibling;
            var isOpen = dropContent.style.display === 'block';
            // Close all dropdowns first
            document.querySelectorAll('.dropdown-content').forEach(function (d) {
                d.style.display = 'none';
            });
            // Toggle this one
            dropContent.style.display = isOpen ? 'none' : 'block';
        });
    }


    // ----------------------------------------------------------
    // FIX 5: Close dropdown when clicking outside
    // ----------------------------------------------------------
    document.addEventListener('click', function (e) {
        if (!e.target.matches('.dropbtn')) {
            document.querySelectorAll('.dropdown-content').forEach(function (d) {
                d.style.display = 'none';
            });
        }
    });

});
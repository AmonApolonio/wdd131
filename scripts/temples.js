document.addEventListener("DOMContentLoaded", function() {
    const mobileMenuButton = document.querySelector('#mobile-menu');
    const navigation = document.querySelector('.navigation');

    mobileMenuButton.addEventListener('click', () => {
        navigation.classList.toggle('open');
        mobileMenuButton.classList.toggle('open');
    });
});
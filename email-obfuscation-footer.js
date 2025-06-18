document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.footer-text_section-wrapper.is-contact');
    if (!container) return;

    const links = container.querySelectorAll('.footer-hero-text-grey-link.is-email');
    if (!links.length) return;

    const domain = 'lewismediapartners.com';

    links.forEach(link => {
        let encoded = true;

        function decode() {
            if (!encoded) return;
            const user = link.getAttribute('href');
            link.setAttribute('href', user + '@' + domain);
            encoded = false;
        }

        function encode() {
            if (!encoded) return;
            const fullEmail = link.getAttribute('href');
            const base = fullEmail.slice(0, -1 * (domain.length + 1));
            link.setAttribute('href', base);
            encoded = true;
        }

        link.addEventListener('mouseover', decode);
        link.addEventListener('focus', decode);
        link.addEventListener('mouseout', encode);
        link.addEventListener('blur', encode);
    });
});
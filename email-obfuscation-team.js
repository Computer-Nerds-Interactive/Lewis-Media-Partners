document.addEventListener('DOMContentLoaded', function () {
    const containers = document.querySelectorAll('.team-member_popup-half');
    if (!containers.length) return;

    const domain = 'lewismediapartners.com';

    containers.forEach(container => {
        const links = container.querySelectorAll('.email');
        if (!links.length) return;

        links.forEach(link => {
            let encoded = true;

            function decode() {
                if (!encoded) return;
                const user = link.getAttribute('href');
                link.setAttribute('href', user + '@' + domain);
                encoded = false;
            }

            function encode() {
                if (encoded) return;
                const full = link.getAttribute('href');
                const base = full.slice(0, -1 * (domain.length + 1));
                link.setAttribute('href', base);
                encoded = true;
            }

            link.addEventListener('mouseover', decode);
            link.addEventListener('focus', decode);
            link.addEventListener('mouseout', encode);
            link.addEventListener('blur', encode);
        });
    });
});

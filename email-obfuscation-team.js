(function () {
    const domain = 'lewismediapartners.com';
    const selector = '.team-member_popup-half';
    const linkSelector = '.email';
    const processedAttr = 'data-email-script-attached';

    function attachHandlersToLinks(container) {
        const links = container.querySelectorAll(linkSelector);
        links.forEach(link => {
            if (link.hasAttribute(processedAttr)) return;

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

            link.setAttribute(processedAttr, 'true');
        });
    }

    function observeCMSContent() {
        const observer = new MutationObserver(() => {
            document.querySelectorAll(selector).forEach(attachHandlersToLinks);
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        // Run once initially just in case they're already in DOM
        requestAnimationFrame(() => {
            document.querySelectorAll(selector).forEach(attachHandlersToLinks);
        });
    }

    document.addEventListener('DOMContentLoaded', observeCMSContent);
})();

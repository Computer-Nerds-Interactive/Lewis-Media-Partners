document.addEventListener('DOMContentLoaded', function () {
  const host = 'lewismediapartners.com';
  const container = document.querySelector('.footer-text_section-wrapper.is-contact');

  if (!container) return;

  const links = container.querySelectorAll('.footer-hero-text-grey-link.is-email');

  links.forEach(link => {
    let encoded = true;

    // Initial obfuscation
    const email = link.getAttribute('href');
    const username = email.split('@')[0];
    link.setAttribute('href', username);

    // Decode on hover/focus
    const decode = () => {
      if (encoded) {
        link.setAttribute('href', username + '@' + host);
        encoded = false;
      }
    };

    // Encode on mouseout/blur
    const encode = () => {
      if (!encoded) {
        link.setAttribute('href', username);
        encoded = true;
      }
    };

    link.addEventListener('mouseover', decode);
    link.addEventListener('mouseout', encode);
    link.addEventListener('focus', decode);
    link.addEventListener('blur', encode);
  });
});

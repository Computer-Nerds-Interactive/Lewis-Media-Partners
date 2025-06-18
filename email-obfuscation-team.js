document.addEventListener('DOMContentLoaded', function () {
  const host = 'lewismediapartners.com';
  const links = document.querySelectorAll('.team-member_popup-half a.email');

  links.forEach(link => {
    let encoded = true;

    // Initial obfuscation
    const email = link.getAttribute('href');
    const username = email.split('@')[0];
    link.setAttribute('href', username);

    // Toggle on hover/focus
    const decode = () => {
      if (encoded) {
        link.setAttribute('href', username + '@' + host);
        encoded = false;
      }
    };

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

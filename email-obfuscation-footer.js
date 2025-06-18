// Wait for the DOM content to be fully loaded before executing the code
document.addEventListener('DOMContentLoaded', function () {
    const appender = new Appender('lewismediapartners.com');
    const linkAppender = new LinkCoder(appender);

    // Scope listener to links inside .footer-hero_right-text only
    Listener.listen('.footer-hero-text-grey-link.is-email', linkAppender);
});

// Appender Class
function Appender(host) {
    this.host = host;
}

Appender.prototype.decode = function (user) {
    return user + '@' + this.host;
}

Appender.prototype.encode = function (email) {
    const end = -1 * (this.host.length + 1);
    return email.slice(0, end);
}

// LinkCoder Class
function LinkCoder(coder) {
    this.coder = coder;
}

LinkCoder.prototype.encode = function (a) {
    this.apply('encode', a);
}

LinkCoder.prototype.decode = function (a) {
    this.apply('decode', a);
}

LinkCoder.prototype.apply = function (action, a) {
    const input = a.getAttribute('href');
    const output = this.coder[action](input);
    a.setAttribute('href', output);
}

// Listener Class
function Listener(node, coder) {
    this.node = node;
    this.coder = coder;
    this.encoded = true;

    node.addEventListener('mouseover', this.decode.bind(this));
    node.addEventListener('mouseout', this.encode.bind(this));
    node.addEventListener('focus', this.decode.bind(this));
    node.addEventListener('blur', this.encode.bind(this));
}

Listener.prototype.decode = function () {
    if (this.encoded) {
        this.coder.decode(this.node);
        this.encoded = false;
    }
}

Listener.prototype.encode = function () {
    if (!this.encoded) {
        this.coder.encode(this.node);
        this.encoded = true;
    }
}

// Static method to attach event listeners to scoped elements
Listener.listen = function (selector, coder) {
    const container = document.querySelector('.footer-hero_right-text');
    if (!container) return;

    const nodes = container.querySelectorAll(selector);
    for (let i = 0; i < nodes.length; ++i) {
        new Listener(nodes[i], coder);
    }
}

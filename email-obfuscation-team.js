// Wait for the DOM content to be fully loaded before executing the code
document.addEventListener('DOMContentLoaded', function () {
    // Create an instance of the Appender class with the specified host
    const appender = new Appender('lewismediapartners.com');
    // Create an instance of the LinkCoder class, passing the appender instance
    const linkAppender = new LinkCoder(appender);

    // Listen for events on elements with the 'email' class and apply the linkAppender
    Listener.listen('.email', linkAppender);
});


// Appender Class

function Appender(host) {
    // Initialize the Appender instance with a host property
    this.host = host;
}

// Method to decode a user email address by appending the host
Appender.prototype.decode = function (user) {
    return user + '@' + this.host;
}

// Method to encode an email address by removing the host part
Appender.prototype.encode = function (email) {
    // Calculate the end index to slice off the host part
    const end = -1 * (this.host.length + 1);

    // Slice the email address to remove the host part
    return email.slice(0, end);
}


// LinkCoder Class

function LinkCoder(coder) {
    // Initialize the LinkCoder instance with a coder property
    this.coder = coder;
}

// Method to encode a link by applying the encode method of the coder object
LinkCoder.prototype.encode = function (a) {
    this.apply('encode', a);
}

// Method to decode a link by applying the decode method of the coder object
LinkCoder.prototype.decode = function (a) {
    this.apply('decode', a);
}

// Method to apply encode/decode methods to a link element
LinkCoder.prototype.apply = function (action, a) {
    // Get the href attribute of the link element
    const input = a.getAttribute('href');
    // Apply the specified action (encode/decode) to the input and get the output
    const output = this.coder[action](input);

    // Set the href attribute of the link element to the output
    a.setAttribute('href', output);
}


// Listener Class

function Listener(node, coder) {
    // Initialize the Listener instance with node and coder properties
    this.node = node;
    this.coder = coder;
    // Initially, the link is encoded
    this.encoded = true;

    // Add event listeners for mouseover, mouseout, focus, and blur events
    node.addEventListener('mouseover', this.decode.bind(this));
    node.addEventListener('mouseout', this.encode.bind(this));
    node.addEventListener('focus', this.decode.bind(this));
    node.addEventListener('blur', this.encode.bind(this));
}

// Method to decode the link when triggered by events
Listener.prototype.decode = function () {
    // If the link is currently encoded
    if (this.encoded) {
        // Decode the link using the coder object
        this.coder.decode(this.node);
        // Update the state to indicate that the link is decoded
        this.encoded = false;
    }
}

// Method to encode the link when triggered by events
Listener.prototype.encode = function () {
    // If the link is currently decoded
    if (this.encoded) {
        // Encode the link using the coder object
        this.coder.encode(this.node);
        // Update the state to indicate that the link is encoded
        this.encoded = true;
    }
}

// Static method to attach event listeners to elements matching the selector
Listener.listen = function (selector, coder) {
    // Select all elements matching the selector
    const nodes = document.querySelectorAll(selector);

    // Iterate over the selected nodes
    for (let i = 0; i < nodes.length; ++i) {
        // Create a new Listener instance for each node with the specified coder
        new Listener(nodes[i], coder);
    }
}

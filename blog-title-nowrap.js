const heading = document.querySelector('.blog_preview-heading');

if (heading) {
  const words = heading.innerText.trim().split(' ');

  // Clone the heading to measure line breaks
  const clone = heading.cloneNode(false);
  clone.style.position = 'absolute';
  clone.style.visibility = 'hidden';
  clone.style.pointerEvents = 'none';
  clone.style.whiteSpace = 'normal';
  clone.style.width = heading.offsetWidth + 'px';
  document.body.appendChild(clone);

  const lines = [];
  let currentLine = [];
  let lastTop = null;

  words.forEach(word => {
    const span = document.createElement('span');
    span.innerText = word + ' ';
    clone.appendChild(span);

    const top = span.offsetTop;

    if (lastTop !== null && top !== lastTop) {
      lines.push([...currentLine]);
      currentLine = [];
    }

    currentLine.push(word);
    lastTop = top;
  });

  if (currentLine.length) lines.push(currentLine);
  clone.remove();

  // If the last line has only one word, wrap it and the one before it
  if (lines.length >= 2 && lines.at(-1).length === 1) {
    const lastWord = lines.at(-1)[0];
    const wordBeforeLast = lines.at(-2).pop();

    const pattern = new RegExp(`(${wordBeforeLast})\\s+(${lastWord})([.,!?"]?)`);
    heading.innerHTML = heading.innerHTML.replace(
      pattern,
      `<span class="text-style-nowrap">$1 $2</span>$3`
    );
  }
}
const Event = require('simply-pub-sub').Event;

function Messenger(opts) {
  const body = document.querySelector('body');
  const bodyObserver = new MutationObserver(bodyCallback);
  const chatObserver = new MutationObserver(chatCallback);
  const msgEvent = Event();
  let chatBtn;
  let textarea;
  let sendBtn;
  let endBtn;

  function init() {
    if (isInConvo()) {
      startChat();
    }

    startBody();
    console.log('Messenger initiated');
  }

  function isInConvo() {
    return body.classList.contains('inconversation');
  }

  function startBody() {
    bodyObserver.observe(body, { attributes: true, attributeFilter: ['class'] });
  }

  function startChat() {
    chatBtn = document.querySelector('.logbox div');
    textarea = document.querySelector('.chatmsg');
    sendBtn = document.querySelector('.sendbtn');
    endBtn = document.querySelector('.disconnectbtn');

    chatObserver.observe(chatBtn, { childList: true });
  }

  function stopChat() {
    chatObserver.disconnect();
  }

  function stop() {
    bodyObserver.disconnect();
    stopChat();
    console.log('Messenger Stopped');
  }

  function bodyCallback(recordList) {
    recordList.forEach((record) => isInConvo() ? startChat() : stopChat());
  }

  function chatCallback(recordList) {
    recordList.forEach((record) => {
      record.addedNodes.forEach((node) => {
        if (!node.className == 'logItem') return;
        const child = node.childNodes[0];

        if (child.className == 'strangermsg' || child.className == 'youmsg') {
          msgEvent({ elem: child, class: child.className, msg: child.childNodes[2].textContent });
        }
      });
    });
  }

  function send(msg) {
    document.querySelector('.chatmsg').value = msg;
    sendBtn.click();
  }
  

  function endChat() {
    if (!endBtn) throw new Error('End button isn\'t set');
    if (!isInConvo()) return;
    endBtn.click();

    if (!isInConvo()) return;
    endBtn.click();
  }

  return {
    init,
    stop,
    send,
    endChat,
    msgEvent,
  };
}

module.exports = Messenger;
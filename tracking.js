/* ANU SURPRISE — PRIVACY-RESPECTING INTERACTION TRACKING
   Only records clicks on the explicitly listed visible buttons.
   Set the Apps Script Web App URL below after deployment. */
const ANU_TRACKING_ENDPOINT = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";

(function () {
  const events = {
    openLetterBtn: "letter_opened",
    surpriseBtn: "surprise_opened",
    likeYesBtn: "like_yes",
    likeNoBtn: "like_no",
    mineYesBtn: "mine_yes",
    mineNoBtn: "mine_think"
  };

  function sendEvent(eventName) {
    if (!ANU_TRACKING_ENDPOINT || ANU_TRACKING_ENDPOINT.includes("PASTE_YOUR")) return;
    const payload = JSON.stringify({
      event: eventName,
      timestamp: new Date().toISOString()
    });
    try {
      fetch(ANU_TRACKING_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: payload,
        keepalive: true
      }).catch(() => {});
    } catch (_) {}
  }

  Object.entries(events).forEach(([id, eventName]) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("click", () => sendEvent(eventName), { passive: true });
  });
})();

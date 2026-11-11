// Deeplink hand-off for /qr-code and /scan-tournament: try to open the app at the
// same path + query, then fall back to the store if it isn't installed.
(function () {
  var ua = navigator.userAgent || navigator.vendor || window.opera;
  var target = location.pathname.replace(/\/$/, '') + location.search;
  var timer;

  if (/android/i.test(ua)) {
    location.href = 'intent://pickleduels.com' + target + '#Intent;scheme=https;package=com.capsulekaiba.pickleduels;end;';
    timer = setTimeout(function () {
      location.href = 'https://play.google.com/store/apps/details?id=com.capsulekaiba.pickleduels';
    }, 2000);
  } else if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
    location.href = 'pickleduels://app' + target;
    timer = setTimeout(function () {
      location.href = 'https://apps.apple.com/us/app/pickle-duels/id6745139136';
    }, 2000);
  }

  // The app opened and took over the screen, so don't redirect to the store.
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') clearTimeout(timer);
  });
})();

(function () {
  var storedTheme = localStorage.getItem('theme') || 'system';
  var resolvedTheme =
    storedTheme === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : storedTheme;

  if (resolvedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  }
})();

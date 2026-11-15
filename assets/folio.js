(() => {
  // Route existing bookmarks to the corresponding chapter.
  if (window.location.pathname === '/') {
    const chapters = {
      '#experience': '/experience/',
      '#work': '/work/',
      '#profiles': '/about/',
    };
    const chapter = chapters[window.location.hash];
    if (chapter) window.location.replace(chapter);
  }

})();

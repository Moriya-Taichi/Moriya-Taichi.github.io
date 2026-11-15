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

  const employers = document.querySelector('.employers');
  if (!employers) return;

  const tabs = [...employers.querySelectorAll('[data-company]')];
  const panels = tabs.map(tab => document.getElementById(tab.dataset.company));

  const show = (selected, updateLocation = false) => {
    tabs.forEach((tab, index) => {
      const active = index === selected;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      panels[index].hidden = !active;
    });
    if (updateLocation) {
      window.history.replaceState(null, '', tabs[selected].hash);
    }
  };

  employers.setAttribute('role', 'tablist');
  tabs.forEach((tab, index) => {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panels[index].id);
    panels[index].setAttribute('role', 'tabpanel');
    panels[index].setAttribute('aria-labelledby', tab.id);
    panels[index].tabIndex = 0;

    tab.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      show(index, true);
    });

    tab.addEventListener('keydown', event => {
      const navigation = {
        ArrowRight: (index + 1) % tabs.length,
        ArrowLeft: (index - 1 + tabs.length) % tabs.length,
        Home: 0,
        End: tabs.length - 1,
        ' ': index,
      };
      const next = navigation[event.key];
      if (next === undefined) return;
      event.preventDefault();
      show(next, true);
      tabs[next].focus();
    });
  });

  const restore = () => {
    const selected = tabs.findIndex(tab => tab.hash === window.location.hash);
    if (selected >= 0) show(selected);
  };
  window.addEventListener('hashchange', restore);
  show(0);
  restore();
})();

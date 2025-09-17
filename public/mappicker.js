// ==UserScript==
// @name         Smart Map Picker + Scoped Green Buttons + Fix Server Links
// @namespace    http://tampermonkey.net/
// @version      2025-09-17
// @description  Search maps, favorite buttons with green gradient style (scoped), and fix server links
// @author       You
// @match        https://play-cs.com/en/myservers
// @grant        none
// ==/UserScript==

(() => {
  'use strict';

  // --- Inject scoped button styles ---
  const style = document.createElement('style');
  style.textContent = `
    .map-fav-btn {
      --green: #1BFD9C;
      font-size: 13px;
      padding: 0.5em 1.5em;
      letter-spacing: 0.04em;
      position: relative;
      font-family: inherit;
      border-radius: 0.4em;
      overflow: hidden;
      transition: all 0.3s;
      line-height: 1.2em;
      border: 2px solid var(--green);
      background: linear-gradient(to right, rgba(27, 253, 156, 0.1) 1%, transparent 40%, transparent 60%, rgba(27, 253, 156, 0.1) 100%);
      color: var(--green);
      box-shadow: inset 0 0 8px rgba(27, 253, 156, 0.4), 0 0 6px 2px rgba(27, 253, 156, 0.1);
      margin-bottom: 3px;
      cursor: pointer;
    }

    .map-fav-btn:hover {
      color: #82ffc9;
      box-shadow: inset 0 0 10px rgba(27, 253, 156, 0.6), 0 0 8px 3px rgba(27, 253, 156, 0.2);
    }

    .map-fav-btn:before {
      content: "";
      position: absolute;
      left: -3em;
      width: 3em;
      height: 100%;
      top: 0;
      transition: transform .4s ease-in-out;
      background: linear-gradient(to right, transparent 1%, rgba(27, 253, 156, 0.1) 40%, rgba(27, 253, 156, 0.1) 60%, transparent 100%);
    }

    .map-fav-btn:hover:before {
      transform: translateX(10em);
    }
  `;
  document.head.appendChild(style);

  const servers = document.querySelectorAll('tr.myserver[data-server]');
  const favoriteMaps = ['de_mirage', 'de_nuke', 'de_tuscan', 'de_dust2', 'de_inferno',];

  servers.forEach(server => {
    const serverID = server.dataset.server;
    const mapSelect = server.querySelector(`select[name="server[${serverID}][map]"]`);
    if (!mapSelect) return;

    // --- Smart map picker container ---
    const container = document.createElement('div');
    container.style.marginTop = '5px';
    mapSelect.parentElement.insertBefore(container, mapSelect);

    // --- Favorite maps buttons ---
    favoriteMaps.forEach(map => {
      if ([...mapSelect.options].some(opt => opt.value === map)) {
        const btn = document.createElement('button');
        btn.textContent = map;
        btn.className = 'map-fav-btn'; // scoped class
        btn.addEventListener('click', () => {
          mapSelect.value = map;
          mapSelect.dispatchEvent(new Event('change'));
        });
        container.appendChild(btn);
      }
    });

    // --- Search input ---
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Type to search map...';
    searchInput.style.marginLeft = '5px';
    searchInput.style.padding = '2px 4px';
    searchInput.style.width = '150px';
    container.appendChild(searchInput);

    // Filter maps in real-time
    searchInput.addEventListener('input', () => {
      const filter = searchInput.value.toLowerCase();
      let firstMatch = null;
      Array.from(mapSelect.options).forEach(opt => {
        const match = opt.value.toLowerCase().includes(filter);
        opt.style.display = match ? '' : 'none';
        if (!firstMatch && match) firstMatch = opt;
      });
      if (firstMatch) mapSelect.value = firstMatch.value;
    });

    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') mapSelect.focus();
    });
  });

  // --- Fix server links ---
  const serverLinks = document.querySelectorAll('td a');
  serverLinks.forEach(link => {
    if (link.href.startsWith('://')) {
      link.href = 'https' + link.href;
    }
  });
})();

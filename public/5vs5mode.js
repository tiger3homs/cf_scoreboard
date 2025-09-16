(() => {
  'use strict';
  const servers = document.querySelectorAll('[data-server]');
  for (let i = 0; i < servers.length; i++) {
    const server = servers[i];
    const serverID = server.dataset.server;
    const settings = server.nextElementSibling.nextElementSibling;

    // Force settings
    server.querySelector(`input[id="server[${serverID}][public]"]`).checked = false;
    const varsCheckboxes = settings.querySelectorAll('input');
    for (let k = 0; k < varsCheckboxes.length; k++) {
      varsCheckboxes[k].checked = false;
    }
    settings.querySelector(`input[id="server[${serverID}][cvars][mp_clanwar]"]`).checked = true;
    settings.querySelector(`input[id="server[${serverID}][cvars][bonus_slot]"]`).checked = true;
    settings.querySelector(`input[id="server[${serverID}][cvars][mp_friendlyfire]"]`).checked = true;

    settings.querySelector(`select[name="server[${serverID}][cvars][minimal_skill]"]`).value = '0';
    settings.querySelector(`select[name="server[${serverID}][cvars][ping_limit]"]`).value = '1000';
    settings.querySelector(`select[name="server[${serverID}][cvars][mp_roundtime]"]`).value = '1.75';
    settings.querySelector(`select[name="server[${serverID}][cvars][mp_buytime]"]`).value = '0.25';
    settings.querySelector(`select[name="server[${serverID}][cvars][mp_c4timer]"]`).value = '35';
    settings.querySelector(`select[name="server[${serverID}][cvars][mp_freezetime]"]`).value = '15';
    settings.querySelector(`select[name="server[${serverID}][cvars][mp_startmoney]"]`).value = '800';
    settings.querySelector(`select[name="server[${serverID}][cvars][csem_sank_cd]"]`).value = '300';
    settings.querySelector(`select[name="server[${serverID}][cvars][limit_hegren]"]`).value = '1';
    settings.querySelector(`select[name="server[${serverID}][cvars][limit_sgren]"]`).value = '1';
    settings.querySelector(`select[name="server[${serverID}][cvars][limit_flash]"]`).value = '2';
  }
})();

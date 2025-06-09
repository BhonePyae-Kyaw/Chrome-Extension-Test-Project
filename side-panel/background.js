const GOOGLE_ORIGIN = "https://www.google.com";

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (!tab.url) return;
  const url = new URL(tab.url);

  if (url.origin === GOOGLE_ORIGIN) {
    await chrome.sidePanel;
    chrome.sidePanel
      .setPanelBehavior({ openPanelOnActionClick: true })
      .catch((error) => console.error(error))
      .setOptions({
        tabId,
        path: "sidepanel.html",
        enabled: true,
      });
  } else {
    // Disables the side panel on all other sites
    await chrome.sidePanel.chrome.sidePanel
      .setPanelBehavior({ openPanelOnActionClick: true })
      .catch((error) => console.error(error))
      .setOptions({
        tabId,
        enabled: false,
      });
  }
});

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.contextMenus.create({
//     id: "openSidePanel",
//     title: "Open side panel",
//     contexts: ["all"],
//   });
// });

// chrome.contextMenus.onClicked.addListener((info, tab) => {
//   if (info.menuItemId === "openSidePanel") {
//     // This will open the panel in all the pages on the current window.
//     chrome.sidePanel.open({ windowId: tab.windowId });
//   }
// });

// const welcomePage = "sidepanels/welcome-sp.html";
// const mainPage = "sidepanels/main-sp.html";

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.sidePanel.setOptions({ path: welcomePage });
//   chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
// });

// chrome.tabs.onActivated.addListener(async ({ tabId }) => {
//   const { path } = await chrome.sidePanel.getOptions({ tabId });
//   if (path === welcomePage) {
//     chrome.sidePanel.setOptions({ path: mainPage });
//   }
// });

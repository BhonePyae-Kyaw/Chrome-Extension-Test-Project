// Save default API suggestions
chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    chrome.storage.local.set({
      apiSuggestions: ["tabs", "storage", "scripting"],
    });
  }

  const URL_CHROME_EXTENSIONS_DOC =
    "https://developer.chrome.com/docs/extensions/reference/";
  const NUMBER_OF_PREVIOUS_SEARCHES = 4;

  // Display the suggestions after user starts typing
  chrome.omnibox.onInputChanged.addListener(async (input, suggest) => {
    await chrome.omnibox.setDefaultSuggestion({
      description: "Enter a Chrome API or choose from past searches",
    });
    const { apiSuggestions } = await chrome.storage.local.get("apiSuggestions");
    const suggestions = apiSuggestions.map((api) => {
      return { content: api, description: `Open chrome.${api} API` };
    });
    suggest(suggestions);
  });
});


  // A dictionary keyed off of tabId that keeps track of data per tab (for
  // example what feedUrl was detected in the tab).
  var feedData = {};

  chrome.extension.onRequest.addListener(function(request, sender) {
    if (request.msg == "feedIcon") {
      // We have received a list of feed urls found on the page.
      // Enable the page action icon.
      feedData[sender.tab.id] = request.feeds;
      chrome.pageAction.setTitle(
        { tabId: sender.tab.id,
          title: chrome.i18n.getMessage("rss_subscription_action_title")});
      chrome.pageAction.show(sender.tab.id);
    } else if (request.msg == "feedDocument") {
      // We received word from the content script that this document
      // is an RSS feed (not just a document linking to the feed).
      // So, we go straight to the subscribe page in a new tab and
      // navigate back on the current page (to get out of the xml page).
      // We don't want to navigate in-place because trying to go back
      // from the subscribe page takes us back to the xml page, which
      // will redirect to the subscribe page again (we don't support a
      // location.replace equivalant in the Tab navigation system).
      chrome.tabs.executeScript(sender.tab.id,
          {code: "if (history.length > 1) " +
                   "history.go(-1); else window.close();"});
      var url = "subscribe.html?" + encodeURIComponent(request.href);
      url = chrome.extension.getURL(url);
      chrome.tabs.create({url: url, index: sender.tab.index});
    }
  });

  chrome.tabs.onRemoved.addListener(function(tabId) {
    delete feedData[tabId];
  });

  // On Linux, popups aren't supported yet, so Chrome will call into us
  // when the user clicks on the icon in the OmniBox.
  chrome.pageAction.onClicked.addListener(function(tab) {
    chrome.windows.get(tab.windowId, function(window) {
      // We need to know if we are the active window, because the tab may
      // have moved to another window and we don't want to execute this
      // action multiple times.
      if (window.focused) {
        // Create a new tab showing the subscription page with the right
        // feed URL.
        var url = "subscribe.html?" +
            encodeURIComponent(feedData[tab.id][0].href);
        chrome.tabs.create({url: url, windowId: window.id});
      }
    });
  });

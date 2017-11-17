chrome.app.runtime.onLaunched.addListener(
  function( data ) {
      chrome.app.window.create(
        'index.html',
        {
          id:'fenster',
          bounds:{ width:500, height:500}
        }
      );
  }
);

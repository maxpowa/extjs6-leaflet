// enable Ext autoloader
Ext.Loader.setConfig({
  enabled: true
});

Ext.Loader.setPath({
  'Ext.ux': '.',
  'LeafletMapDemo': '.'
});

Ext.application({
  name: 'LeafletMapDemo',

  statusBarStyle: 'black',
  viewport: {
    // hide navigation bar of browser
    autoMaximize: true
  },

  views: [
    'LeafletMapDemo.view.Main'
  ],

  controllers: [
    'LeafletMapDemo.controller.Map'
  ],

  // launch function is called as soon as app is ready
  launch: function() {
    this.setMainView('LeafletMapDemo.view.Main');
  }
});

Ext.define('LeafletMapDemo.view.Main', {
  extend: 'Ext.tab.Panel',
  xtype: 'main',
  id: 'mainTabPanel',
  requires: [
    'Ext.ux.LeafletMap'
  ],

  config: {
    tabBar: {
      docked: 'bottom'
    },

    items: [{
      title: 'Leaflet Map',
      iconCls: 'maps',
      layout: 'fit',

      items: [{
        // Ext.ux.LeafletMap Component
        xtype: 'leafletmap',
        id: 'map1',
        margin: '7px',
        useLocation: true,
        autoCenter: true,
        enableOwnPositionMarker: false,
        mapOptions: {
          zoom: 14
        }
      }]
    },{
      title: 'Google Map in Leaflet',
      iconCls: 'maps',
      layout: 'fit',

      items: [{
        // Ext.ux.LeafletMap Component
        xtype: 'leafletmap',
        id: 'map2',
        margin: '7px',
        useLocation: true,
        // autoCenter: true,
        // enableOwnPositionMarker: false,
        mapOptions: {
          zoom: 14,
          tileLayerOptions: {
            attribution: 'Google Maps'
          },
          layers: [
            L.gridLayer.googleMutant({
              type: 'roadmap' // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
            })
          ]
        }
      }]
    }]
  }
});

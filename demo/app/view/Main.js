Ext.define('LeafletMapDemo.view.Main', {
  extend: 'Ext.Panel',
  xtype: 'main',
  id: 'mainPanel',
  requires: [
    'Ext.ux.LeafletMap'
  ],

  layout: {
      type: 'fit',
      // pack: 'center',
      // align: 'middle'
  },

  config: {
    //layout: 'vbox',

    items: [{
      xtype: 'tabpanel',
      tabBar: {
        dock: 'bottom'
      },
      //margin: '7px',
      layout: 'fit',
      title: 'Map Demo',

      items: [{
        title: 'Leaflet Map',
        iconCls: 'maps',
        layout: 'fit',

        items: [{
          // Ext.ux.LeafletMap Component
          xtype: 'leafletmap',
          id: 'map1',
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
          useLocation: true,
          // autoCenter: true,
          // enableOwnPositionMarker: false,,
          tileLayers: [
            L.gridLayer.googleMutant({
              type: 'roadmap' // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
            })
          ],
          // tileLayerOptions: {
          //   attribution: 'Google Maps'
          // },
          mapOptions: {
            zoom: 14,
          }
        }]
      },{
        title: 'Google Routing',
        iconCls: 'maps',
        layout: 'fit',

        items: [{
          xtype: 'leafletmap',
          id: 'map3',
          useLocation: false,
          tileLayers: [
            L.gridLayer.googleMutant({
              type: 'hybrid'
            })
          ],
          mapOptions: {
            zoom: 14,
          },
          listeners: {
            maprender: function(cmp, map, layers) {
              var DS = new google.maps.DirectionsService();
              DS.route({
                origin: 'sfo',
                destination: 'sjc',
                travelMode: 'DRIVING'
              }, function(res, stat) {
                if (res.routes && res.routes.length > 0) {
                  var leg = res.routes[0].legs[0];
                  var marker1 = L.marker([leg.start_location.lat(), leg.start_location.lng()], {title: leg.start_address}).addTo(map);
                  marker1.bindPopup(leg.start_address);
                  var marker2 = L.marker([leg.end_location.lat(), leg.end_location.lng()], {title: leg.end_address}).addTo(map);
                  marker2.bindPopup(leg.end_address);
                  var route = L.Polyline.fromEncoded(res.routes[0].overview_polyline);
                  route.setStyle({
                    weight: 6
                  });
                  route.addTo(map);
                  map.fitBounds(L.featureGroup([marker1, marker2, route]).getBounds());
                }
              });
            }
          }
        }]
      }]
    }]
  }
});

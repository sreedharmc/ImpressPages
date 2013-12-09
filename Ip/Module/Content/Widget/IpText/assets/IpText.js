/**
 * @package ImpressPages
 *
 *
 */

function IpWidget_IpText() {
    "use strict";

    this.init = function($widgetObject, data) {
        var customTinyMceConfig = ipTinyMceConfig();
        customTinyMceConfig.setup = function(ed, l) {ed.on('change', function(e) {
            $widgetObject.save({text: $widgetObject.find('.ipsContent').html()});
        })};

        $widgetObject.find('.ipsContent').tinymce(customTinyMceConfig);
    };


};


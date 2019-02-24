//JavaScript Document
/**
 * @author <a href="https://encrypt.to/0x2191C1D8">LHUILLERY Matthieu</a> 
 */

/** @constructor generator
 * @desc Artisant du css
 * @returns {generator}
 */
function generator() {

    var $css_root = $("<style>");
    $css_root.prop("type", "text/css");
    $css_root.html("\
    :root {\
        --cellHeight: 50px;\
        --cellWidth: 50px;\
    }");

    var $css_body = $("<style>");
    $css_body.prop("type", "text/css");
    $css_body.html("\
    body {\
        display: flex;\
        min-height: 100vh;\
        max-height:100vh;\
        flex-direction: column;\
    }");

    $css_main = $("<style>");
    $css_main.prop("type", "text/css");
    $css_main.html("\
    main {\
        margin: 0;\
        flex: 1 0 auto;\
    }");

/** @method generator#insertInPage
 * @desc Insert le CSS dans la page
 */
    this.insertInPage = function () {
        $css_root.appendTo("head");
        $css_body.appendTo("head");
        $css_main.appendTo("head");
    };
}
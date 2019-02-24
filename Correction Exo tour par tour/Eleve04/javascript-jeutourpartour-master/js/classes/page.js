//JavaScript Document
/**
 * @author <a href="https://encrypt.to/0x2191C1D8">LHUILLERY Matthieu</a> 
 */

/**
 * @constructor
 * @return {Page}
 */
function Page() {

    // ##############################################################################

    /** 
     * @desc Composition des éléments HTML du "header" 
     * @returns {Object} 
     */
    var header = (function () {
        var $nav = $('<nav>');
        var $BigTitle = $('<span>').attr('id', 'BigTitle');
        $BigTitle.addClass('brand-title');
        $BigTitle.text("DualBeatWin");
        $BigTitle.appendTo($nav);
        return $nav;
    })();

    // ##############################################################################

    /**  
     * @desc Composition des éléments HTML du "footer"
     * @returns {Object} 
     */
    var footer = (function () {
        var $footer = $('<footer>').addClass("page-footer");
        var $creator = $("<div>").attr("id", "mail");
        $creator.html("Site web réalisé par <a href='mailto:beatwinthewave@gmail.com?Subject=DualBeatWin%20Game'>BeatWinTheWave</a>");
        $creator.appendTo($footer);

        return $footer;
    })();

    // ##############################################################################

    /** 
     * @desc Composition de la section "board_controls" 
     * @return {Object}
    */
    var boardcontrols = (function () {
        var $boardcontrols = $("<div>");
        var $main = $("main").addClass("row");
        $boardcontrols.attr("id", "board_controls");
        $boardcontrols.addClass("col l4 m12");
        $boardcontrols.css({
            'justify-content': 'center',
            'text-align': 'center'
        })
        return $boardcontrols;
    })();

    // ##############################################################################

    /** Composition de la section "game_controls" */
    var gameControls = (function () {
        var $boardcontrols = $("#board_controls");
        var $game_controls = $("<div>");
        $game_controls.attr("id", "game_controls");
        $game_controls.addClass('col s12');
        $game_controls.css({
            'align-content': 'center',
        });

        var $btnstarteasy = $("<button>").attr("id", "button_start_easy");
        $btnstarteasy.attr("type", "button").addClass("btn waves-effect waves-purple");
        $btnstarteasy.text("Easy").addClass("col s4");
        $btnstarteasy.appendTo($game_controls);

        var $btnstartmedium = $("<button>").attr("id", "button_start_medium");
        $btnstartmedium.attr("type", "button").addClass("btn waves-effect waves-purple");
        $btnstartmedium.text("Medium").addClass("col s4");
        $btnstartmedium.appendTo($game_controls);

        var $btnstarthard = $("<button>").attr("id", "button_start_hard");
        $btnstarthard.attr("type", "button").addClass("btn waves-effect waves-purple");
        $btnstarthard.text("Hard").addClass("col s4");
        $btnstarthard.appendTo($game_controls);

        return $game_controls;
    })();

    // ##############################################################################

    /** */
    this.gameConsole = new consoleGame();



    // ##############################################################################

    /** */
    this.display = function () {
        header.prependTo('body');
        footer.insertAfter('main');
        gameControls.prependTo(boardcontrols);
        boardcontrols.appendTo('main');
        generatorCSS.insertInPage();
        this.gameConsole.display();

        //debug console
        console.log('%cStartPage.diplay()', styleFunction);
        //Ingame Console
        this.gameConsole.showmsg(message = "msg_bienvenue");
    }

    // ##############################################################################

}
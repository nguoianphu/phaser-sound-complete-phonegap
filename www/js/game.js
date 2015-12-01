var game = new Phaser.Game(600, 800, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

/*
        function getPath() {
            var str = location.pathname;
            var i = str.lastIndexOf('/');
            return str.substring(0,i+1);
        }
        
        function playAudio(src) {
           // var src = 'lions.mp3';
            var media = new Media (getPath() + src , onSuccess, onError, onStatus);
            //Play the audio. You can set number of the replaying time here.
            //media.play({numberOfLoops:"infinite"});
            media.play();
        }
*/

function preload() {

	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    
    //have the game centered horizontally
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;

    game.stage.backgroundColor = '#414040';


    game.load.audio('explosion', 'assets/audio/SoundEffects/explosion.mp3');
    game.load.audio('fanfare', 'assets/audio/SoundEffects/fanfare3.ogg');

/*
var explosion = new Media('/android_asset/www/assets/audio/SoundEffects/explosion.mp3');
var sword= new Media('/android_asset/www/assets/audio/SoundEffects/sword.mp3');
var blaster= new Media('/android_asset/www/assets/audio/SoundEffects/blaster.mp3');
*/
}

var explosion;
var fanfare;

var text;

var text1;
var text2;

function create() {



    var style = { font: "65px Arial", fill: "#52bace", align: "center" };
    text = game.add.text(game.world.centerX, 100, "decoding", style);
    text.anchor.set(0.5);


    explosion = game.add.audio('explosion');
    fanfare = game.add.audio('fanfare');

    //  Being mp3 files these take time to decode, so we can't play them instantly
    //  Using setDecodedCallback we can be notified when they're ALL ready for use.
    //  The audio files could decode in ANY order, we can never be sure which it'll be.

    game.sound.setDecodedCallback([ explosion, fanfare ], start, this);

}

var keys;

function start() {

    text.text = 'Press on text\n for sound';

    var style = { font: "48px Arial", fill: "#cdba52", align: "center" };


    text1 = game.add.text(game.world.centerX, 250, "Explosion (.mp3): Stopped", style);
    text1.anchor.set(0.5);

    text2 = game.add.text(game.world.centerX, 450, "Fanfare (.ogg): Stopped", style);
    text2.anchor.set(0.5);

    explosion.onStop.add(soundStopped, this);
    fanfare.onStop.add(soundStopped, this);

    keys = game.input.keyboard.addKeys({ explosion: Phaser.Keyboard.ONE, fanfare: Phaser.Keyboard.TWO });

    keys.fanfare.onDown.add(playFx, this);
    keys.explosion.onDown.add(playFx, this);

    //  And for touch devices you can also press the top, middle or bottom of the screen
    game.input.onDown.add(onTouch, this);

}

function onTouch(pointer) {

    var b = game.height / 2;

    if (pointer.y > b)
    {
        playFx(keys.fanfare);
    }
    else
    {
        playFx(keys.explosion);
    }

}



function playFx(key) {

    switch (key.keyCode)
    {
        case Phaser.Keyboard.ONE:
            text1.text = "Explosion (.mp3): Playing";
            explosion.play();
            break;

        case Phaser.Keyboard.TWO:
            text2.text = "Fanfare (.ogg): Playing";
            fanfare.play();
            break;

    }

}

function soundStopped(sound) {

	if (sound === explosion)
    {
        text1.text = "Explosion (.mp3): Complete";
    }
	else if (sound === fanfare)
    {
        text2.text = "Fanfare (.ogg): Complete";
    }


}


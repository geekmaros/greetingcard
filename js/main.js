/*  Autumn Greeting Card -- js */

(function ($) {
  "use strict";

  // declare actors here
  let $backFallingLeaves = $("#brownLeaf, #orangeLeaf, #redLeaf"),
    $textLine1 = $(".text-line-1"),
    $textLine2 = $(".text-line-2"),
    $textGreeting = $(".text-greeting"),
    $treeLeaves = $("[id^=treeleaf]"),
    $floorLeaves = $("[id^=floorleaf]"),
    $bird = $("#Bird"),
    $birdHat = $bird.find("#BirdHat"),
    $birdEyes = $bird.find("#leftEye, #rightEye"),
    $nest = $("#NestAndLeaves"),
    $tree = $("#tree_trunk"),
    $cardContainer = $(".card.container");

  // clear stage
  function clearStage() {
    let clearTl = new TimelineMax();

    clearTl
      .set($backFallingLeaves, { autoAlpha: 0 })
      .set($textLine1, { autoAlpha: 0 })
      .set($textLine2, { autoAlpha: 0 })
      .set($textGreeting, { autoAlpha: 0 })
      .set($treeLeaves, { autoAlpha: 0 })
      .set($bird, { y: "+=65", autoAlpha: 1 })
      .set($nest, { autoAlpha: 0 })
      .set($tree, { autoAlpha: 0 })
      .set($floorLeaves, { y: "+=270", onComplete: showContainer() });

    function showContainer() {
      $cardContainer.css("display", "block");
    }

    return clearTl;
  }

  // enter floor vegetation
  function enterFloorVegetation() {
    let fleavesTl = new TimelineMax();

    fleavesTl
      .staggerTo($floorLeaves, 1, { y: 0, ease: Back.easeInOut }, 0.01)
      .fromTo(
        $tree,
        1.1,
        { transformOrigin: "center bottom", scaleY: 0.2, autoAlpha: 0 },
        { transformOrigin: 'center bottom', scaleY: 1, autoAlpha: 1, ease: Back.easeInOut }
      )
      .fromTo(
        $tree,
        0.9,
        { transformOrigin: "center bottom", scaleX: 0.2, autoAlpha: 0 },
        { transformOrigin: 'center bottom', scaleX: 1, autoAlpha: 1, ease: Back.easeInOut,  }, '-=0.9'
      );

    return fleavesTl;
  }

  // enter tree
  function enterTreeStuff(){
    let treeStuffTl = new TimelineMax();
    
    treeStuffTl.staggerFromTo($treeLeaves, 0.5,{scale: 0.2, autoAlpha:0, transformOrigin: 'center bottom'},
    {scale: 1, autoAlpha:1, transformOrigin: 'center bottom'}, 0.02)
    .fromTo($nest, 1 , {y:0, scale:0.2, autoAlpha:0, transformOrigin: 'center center'},
    {y:"-=15", scale:1, autoAlpha:1, transformOrigin: 'center center', ease: Elastic.easeOut}, '+=0.1')
    .to($nest, 0, {y:'+=15', ease:Bounce.easeOut}, '-=0.2')
    .add('nest-pop-in')
    .set($birdHat, {rotation: 12, x:'+=6'})
    .to($bird, 1.4, {y:'-=39', autoAlpha: 1, ease: Power4.easeInOut}, 'nest-pop-in+=0.1')
    .add('bird-peeking')
    .set($birdEyes, {autoAlpha: 0})
    .set($birdEyes, {autoAlpha: 1}, '+=0.2')
    .set($birdEyes, {autoAlpha: 0}, '+=0.3')
    .set($birdEyes, {autoAlpha: 1}, '+=0.2')
    .to($bird, 0.8, {y: '-=34', ease:Power4.easeInOut})
    .to($bird, 0.8, {y: '+=8', ease:Power4.easeOut})
    .to($birdHat, 0.4, {y:'-=12'}, '-=0.6')
    .to($birdHat, 0.4, {y:0, rotation: 0, x:0, onComplete: startBlinking}, '-=0.2')

    function startBlinking(){
      let birdBlinksTl = new TimelineMax({repeat: -1, repeatDelay: 5})

      birdBlinksTl
      .set($birdEyes, {autoAlpha: 0})
      .set($birdEyes, {autoAlpha: 1}, '+=0.2')
      .set($birdEyes, {autoAlpha: 0}, '+=1.3')
      .set($birdEyes, {autoAlpha: 1}, '+=0.2')
    }

    return treeStuffTl
  }

  // enter the greeting text

  // the GO function ...to kick things all off

  function start() {
    console.log("Animation Started");

    let masterTl = new TimelineMax();

    //TODO: add childtimelines to master
    masterTl
      .add(clearStage(), "scene-clear-stage")
      .add(enterFloorVegetation(), "scene-floor-vegitation")
      .add(enterTreeStuff(), "tree-stuff");
  }
  start();
})(jQuery);

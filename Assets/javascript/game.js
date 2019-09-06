$(document).ready(function() {
  var vaders = [
    {
      name: "Wimpy Vader",
      identification: "0",
      image: "assets/images/wimpy.jpg",
      health: 10,
      baseAttack: 5,
      currentAttack: 5,
      counterAttack: 5
    },
    {
      name: "Whiny Vader",
      identification: "1",
      image: "assets/images/whiny.jpg",
      health: 20,
      baseAttack: 10,
      currentAttack: 10,
      counterAttack: 10
    },
    {
      name: "Wicked Vader",
      identification: "2",
      image: "assets/images/wicked.jpg",
      health: 50,
      baseAttack: 20,
      currentAttack: 20,
      counterAttack: 20
    },
    {
      name: "Wise Vader",
      identification: "3",
      image: "assets/images/wise.jpg",
      health: 100,
      baseAttack: 1,
      currentAttack: 1,
      counterAttack: 1
    }
  ];

  var playerVader = {};
  var playerSelected = false;
  var enemyVader = {};

  // Reorder identification numbers of vaders array to acommodate any changes to which vaders were added/removed
  function reorderVaderIDs() {
    for (var i = 0; i < vaders.length; i++) {
      vaders[i].identification.replace(vaders[i].identification, i);
    }
  }

  // Update a card with the necessay vader info
  function updateCard(cardID, vader) {}

  // Redraw all cards with updated info
  function redrawAllCards() {}

  // Select an enemy to pull out of the vaders array to the defender area
  function selectEnemyVader() {}

  // Initiate one fight between the player and the current enemy vader
  function fight() {
      // Subtract the enemyVader's HP by playerVader's currentAttack
      // Defeat enemyVader if its HP is <= 0
      // Add playerVader's baseAttack to its currentAttack
      // If the enemyVader wasn't defeated, subtract the playerVader's HP by enemyVader's counterAttack
  }

  console.log(vaders);
  // When any of the vader cards are click at the beginning of the game, assign that vader to the player
  $(".selectable").click(function() {
    if (playerSelected === false) {
      console.log(vaders);
      console.log("These are current vaders ^")
      $(".selectable").removeClass(".selectable");
      var id = $(this).attr("id");
      playerVader = vaders[id];
      vaders.splice(id, 1);
      reorderVaderIDs();
      console.log(playerVader);
      console.log(vaders);
    }
  });
});

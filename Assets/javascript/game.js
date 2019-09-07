$(document).ready(function() {
  var vaders = [
    {
      name: "Wimpy",
      identification: "0",
      image: "assets/images/wimpy.jpg",
      baseHealth: 32,
      currentHealth: 32,
      baseAttack: 10,
      currentAttack: 10,
      counterAttack: 5
    },
    {
      name: "Whiny",
      identification: "1",
      image: "assets/images/whiny.jpg",
      baseHealth: 25,
      currentHealth: 25,
      baseAttack: 12,
      currentAttack: 12,
      counterAttack: 12
    },
    {
      name: "Wicked",
      identification: "2",
      image: "assets/images/wicked.jpg",
      baseHealth: 33,
      currentHealth: 33,
      baseAttack: 12,
      currentAttack: 12,
      counterAttack: 10
    },
    {
      name: "Wise",
      identification: "3",
      image: "assets/images/wise.jpg",
      baseHealth: 60,
      currentHealth: 60,
      baseAttack: 5,
      currentAttack: 5,
      counterAttack: 2
    }
  ];

  var playerVader = {};
  var playerSelected = false;
  var enemyVader = {};
  var enemySelected = false;

  // Reorder identification numbers of vaders array to acommodate any changes to which vaders were added/removed
  function reorderVaderIDs() {
    for (var i = 0; i < vaders.length; i++) {
      vaders[i].identification.replace(vaders[i].identification, i);
    }
  }

  // Update a card with the necessay vader info
  function updateCard(cardID, vader) {
    // get card with cardID and populate it with vader object data
    $("#" + cardID).html(
      '<img src="' +
        vader.image +
        '" class="card-img-top" alt="Vader Image" /><div class="card-body"><h5 class="card-title">' +
        vader.name +
        ' </h5><p class="card-text"><span class="label">Attack: </span><span>' +
        vader.currentAttack +
        '</span><br /><span class="label">Counter-attack: </span><span>' +
        vader.counterAttack +
        '</span><br /><span class="label">Health: </span><span>' +
        vader.currentHealth +
        "/" +
        vader.baseHealth +
        '</span></p><div class="progress"><div class="progress-bar progress-bar-striped bg-danger progress-bar-animated" role="progressbar" style="width: ' +
        (vader.currentHealth / vader.baseHealth) * 100 +
        '%"></div></div></div>'
    );

    $("#" + cardID).addClass("selectable");
  }

  // Redraw all cards with updated info
  function redrawAllCards() {
    $("#top-deck").empty();
    for (var i = 0; i < vaders.length; i++) {
      $("#top-deck").append('<div class="card" id="' + i + '"></div>');
      updateCard(i, vaders[i]);
    }
    if (playerSelected === true) {
      updateCard("player-vader", playerVader);
      $("#player-vader").removeClass("selectable");
    }
    if (enemySelected === true) {
      updateCard("enemy-vader", enemyVader);
      $("#attack-button").html(
        '<button class="btn"><img src="assets/images/clash.png" /></button>'
      );
      $("#enemy-vader").removeClass("selectable");
    }
  }

  // Select an enemy to pull out of the vaders array to the defender area
  function selectEnemyVader() {}

  // Initiate one fight between the player and the current enemy vader
  function fight() {
    // Subtract the enemyVader's HP by playerVader's currentAttack
    // Defeat enemyVader if its HP is <= 0
    // Add playerVader's baseAttack to its currentAttack
    // If the enemyVader wasn't defeated, subtract the playerVader's HP by enemyVader's counterAttack
  }

  redrawAllCards();

  // When any of the vader cards are click at the beginning of the game, assign that vader to the player
  $(document).on("click", ".selectable", function(event) {
    if (playerSelected === false) {
      var id = $(this).attr("id");
      playerVader = vaders[id];
      playerVader.identification.replace(
        playerVader.identification,
        "player-vader"
      );
      playerSelected = true;
      vaders.splice(id, 1);
      reorderVaderIDs();
      redrawAllCards();
    } else if (playerSelected === true) {
      var id = $(this).attr("id");
      enemyVader = vaders[id];
      enemyVader.identification.replace(
        enemyVader.identification,
        "enemy-vader"
      );
      enemySelected = true;
      vaders.splice(id, 1);
      reorderVaderIDs();
      redrawAllCards();
      console.log("Enemy Vader is " + enemyVader.name);
    }
  });

  $(document).on("click", "#attack-button", function(event) {
    enemyVader.currentHealth -= playerVader.currentAttack;
    playerVader.currentAttack += playerVader.baseAttack;
    playerVader.currentHealth -= enemyVader.counterAttack;
    if (enemyVader.currentHealth <= 0) {
      $("#enemy-vader").empty();
      enemyVader = null;
      $("#attack-button").empty();
      enemySelected = false;
    }
    redrawAllCards();

    if (playerVader.currentHealth <= 0) {
      $("#bottom-row").empty();
      $("#bottom-row").html('<h1 style="text-align:center;">Game Over!<h1>');
      $(".card").removeClass("selectable");
    } else if (vaders.length === 0 && enemyVader === null) {
      $("#attack-button").empty();
      switch (playerVader.name) {
        case "Wimpy":
          $("#attack-button").html("<h1>You're a person, and you're name is Anakin!<h1>");
          break;
        case "Whiny":
          $("#attack-button").html("<h1>You hate sand!<h1>");
          break;
        case "Wicked":
          $("#attack-button").html("<h1>You know the power of the dark side!<h1>");
          break;
        case "Wise":
          $("#attack-button").html("<h1>Luke was right about you!<h1>");
          break;
      }
      $(".card").removeClass("selectable");
    }
  });
});

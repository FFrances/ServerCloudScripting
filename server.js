///////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Welcome to your first Cloud Script revision. 
// The examples here provide a quick introduction to using Cloud Script and some
// ideas about how you might use it in your game.
//
// There are two approaches for invoking Cloud Script: calling handler functions directly 
// from the game client using the "RunCloudScript" API, or triggering Photon Webhooks associated with
// room events. Both approaches are demonstrated in this file. You can use one or the other, or both. 
//
// Feel free to use this as a starting point for your game server logic, or to replace it altogether. 
// If you have any questions or need advice on where to begin, 
// check out the resources at https://playfab.com/cloud-script or check our forums at
// https://support.playfab.com. For issues which are confidential (involving sensitive intellectual
// property, for example), please contact our Developer Success team directly at devrel@playfab.com.
//
// - The PlayFab Team
//
///////////////////////////////////////////////////////////////////////////////////////////////////////


// This is a Cloud Script handler function. It runs in the PlayFab cloud and 
// has full access to the PlayFab Game Server API 
// (https://api.playfab.com/Documentation/Server). You can invoke the function 
// from your game client by calling the "RunCloudScript" API 
// (https://api.playfab.com/Documentation/Client/method/RunCloudScript) and 
// specifying "helloWorld" for the "ActionId" field.
handlers.helloWorld = function (args) {

    // "currentPlayerId" is initialized to the PlayFab ID of the player logged-in on the game client. 
    // Cloud Script handles authenticating the player automatically.
    var message = "Hello !";

    // You can use the "log" object to write out debugging statements. The "log" object has
    // three functions corresponding to logging level: debug, info, and error.
    log.info(message);
	var now = Date.now();
    // Whatever value you return from a CloudScript handler function is passed back 
    // to the game client. It is set in the "Results" property of the object returned by the 
    // RunCloudScript API. Any log statments generated by the handler function are also included 
    // in the "ActionLog" field of the RunCloudScript result, so you can use them to assist in
    // debugging and error handling.
    return { messageValue: message, timestamp: now };
}

function getPlayerDataForMap(mapKey)
{
	var playerData = server.GetUserReadOnlyData({
        PlayFabId: currentPlayerId,
        Keys: [mapKey, "nextID"]
    });
	
	return playerData;
}


function createEmptyMap()
{
	return {entitiesOnMap:new Array()};
}

handlers.startNewGame = function(args)
{
	var city = "{\"entitiesOnMap\":[{\"id\":2,\"gameDefinitionId\":\"townhall\",\"timestamp\":635985561401099000,\"currentNode\":\"\",\"coordonates\":{\"i\":21,\"j\":18}},{\"id\":5,\"gameDefinitionId\":\"prod_2\",\"timestamp\":635985779060062700,\"currentNode\":\"242617f92a41e\",\"coordonates\":{\"i\":27,\"j\":29}},{\"id\":9,\"gameDefinitionId\":\"rock_3\",\"timestamp\":635985564259871500,\"currentNode\":\"242665b4d27de\",\"coordonates\":{\"i\":7,\"j\":11}},{\"id\":15,\"gameDefinitionId\":\"tree_5\",\"timestamp\":635985564960166000,\"currentNode\":\"2426b8f8d6c25\",\"coordonates\":{\"i\":2,\"j\":2}},{\"id\":17,\"gameDefinitionId\":\"tree_4\",\"timestamp\":635985565159455600,\"currentNode\":\"2426b8f79f740\",\"coordonates\":{\"i\":8,\"j\":22}},{\"id\":18,\"gameDefinitionId\":\"tree_3\",\"timestamp\":635985566206005000,\"currentNode\":\"242664b758371\",\"coordonates\":{\"i\":18,\"j\":33}},{\"id\":19,\"gameDefinitionId\":\"rock_3\",\"timestamp\":635985566409301200,\"currentNode\":\"242665b4d27de\",\"coordonates\":{\"i\":1,\"j\":20}},{\"id\":20,\"gameDefinitionId\":\"rock_5\",\"timestamp\":635985566448452000,\"currentNode\":\"2426b9112d265\",\"coordonates\":{\"i\":15,\"j\":19}},{\"id\":21,\"gameDefinitionId\":\"tree_2\",\"timestamp\":635985566760665600,\"currentNode\":\"242664b60ab7d\",\"coordonates\":{\"i\":14,\"j\":33}},{\"id\":22,\"gameDefinitionId\":\"tree_5\",\"timestamp\":635985566905693200,\"currentNode\":\"2426b8f8d6c25\",\"coordonates\":{\"i\":28,\"j\":2}},{\"id\":24,\"gameDefinitionId\":\"tree_1\",\"timestamp\":635985567456351900,\"currentNode\":\"242664b48a772\",\"coordonates\":{\"i\":6,\"j\":2}},{\"id\":25,\"gameDefinitionId\":\"tree_2\",\"timestamp\":635985567782034700,\"currentNode\":\"242664b60ab7d\",\"coordonates\":{\"i\":16,\"j\":11}},{\"id\":26,\"gameDefinitionId\":\"tree_2\",\"timestamp\":635985567869389300,\"currentNode\":\"242664b60ab7d\",\"coordonates\":{\"i\":27,\"j\":14}},{\"id\":27,\"gameDefinitionId\":\"rock_5\",\"timestamp\":635985567951416800,\"currentNode\":\"2426b9112d265\",\"coordonates\":{\"i\":21,\"j\":10}},{\"id\":28,\"gameDefinitionId\":\"tree_1\",\"timestamp\":635985568091935200,\"currentNode\":\"242664b48a772\",\"coordonates\":{\"i\":2,\"j\":6}},{\"id\":29,\"gameDefinitionId\":\"tree_1\",\"timestamp\":635985568190068500,\"currentNode\":\"242664b48a772\",\"coordonates\":{\"i\":6,\"j\":6}},{\"id\":30,\"gameDefinitionId\":\"tree_4\",\"timestamp\":635985568317015700,\"currentNode\":\"2426b8f79f740\",\"coordonates\":{\"i\":2,\"j\":14}},{\"id\":31,\"gameDefinitionId\":\"tree_4\",\"timestamp\":635985568377054200,\"currentNode\":\"2426b8f79f740\",\"coordonates\":{\"i\":15,\"j\":2}},{\"id\":32,\"gameDefinitionId\":\"tree_5\",\"timestamp\":635985568683888300,\"currentNode\":\"2426b8f8d6c25\",\"coordonates\":{\"i\":11,\"j\":16}},{\"id\":34,\"gameDefinitionId\":\"tree_1\",\"timestamp\":635985569276853100,\"currentNode\":\"242664b48a772\",\"coordonates\":{\"i\":10,\"j\":2}},{\"id\":35,\"gameDefinitionId\":\"tree_1\",\"timestamp\":635985569379662200,\"currentNode\":\"242664b48a772\",\"coordonates\":{\"i\":2,\"j\":10}},{\"id\":36,\"gameDefinitionId\":\"tree_3\",\"timestamp\":635985569589264900,\"currentNode\":\"242664b758371\",\"coordonates\":{\"i\":14,\"j\":25}},{\"id\":37,\"gameDefinitionId\":\"tree_3\",\"timestamp\":635985569835115000,\"currentNode\":\"242664b758371\",\"coordonates\":{\"i\":10,\"j\":33}},{\"id\":38,\"gameDefinitionId\":\"tree_4\",\"timestamp\":635985570112991500,\"currentNode\":\"2426b8f79f740\",\"coordonates\":{\"i\":2,\"j\":33}},{\"id\":39,\"gameDefinitionId\":\"tree_3\",\"timestamp\":635985570169984400,\"currentNode\":\"242664b758371\",\"coordonates\":{\"i\":6,\"j\":33}},{\"id\":41,\"gameDefinitionId\":\"tree_3\",\"timestamp\":635985570879403800,\"currentNode\":\"242664b758371\",\"coordonates\":{\"i\":2,\"j\":29}},{\"id\":42,\"gameDefinitionId\":\"rock_3\",\"timestamp\":635985571319931500,\"currentNode\":\"242665b4d27de\",\"coordonates\":{\"i\":19,\"j\":4}},{\"id\":43,\"gameDefinitionId\":\"tree_4\",\"timestamp\":635985571522799000,\"currentNode\":\"2426b8f79f740\",\"coordonates\":{\"i\":26,\"j\":7}},{\"id\":44,\"gameDefinitionId\":\"rock_5\",\"timestamp\":635985572181946400,\"currentNode\":\"2426b9112d265\",\"coordonates\":{\"i\":11,\"j\":6}},{\"id\":45,\"gameDefinitionId\":\"rock_5\",\"timestamp\":635985572389375900,\"currentNode\":\"2426b9112d265\",\"coordonates\":{\"i\":7,\"j\":26}}]}";
	var def = "{\"entitiesOnMap\":[{\"id\":8,\"gameDefinitionId\":\"rock_1\",\"timestamp\":635985564219134000,\"currentNode\":\"242665b3c56c2\",\"coordonates\":{\"i\":1,\"j\":29}},{\"id\":10,\"gameDefinitionId\":\"rock_2\",\"timestamp\":635985564305398300,\"currentNode\":\"242665b464238\",\"coordonates\":{\"i\":1,\"j\":1}},{\"id\":12,\"gameDefinitionId\":\"rock_4\",\"timestamp\":635985564489110500,\"currentNode\":\"2426b910451a2\",\"coordonates\":{\"i\":2,\"j\":33}},{\"id\":14,\"gameDefinitionId\":\"rock_1\",\"timestamp\":635985564736515200,\"currentNode\":\"242665b3c56c2\",\"coordonates\":{\"i\":2,\"j\":5}}]}";
	var whale = "{\"entitiesOnMap\":[{\"id\":7,\"gameDefinitionId\":\"attack_whale\",\"timestamp\":635985564039079800,\"currentNode\":\"242617d2329ba\",\"coordonates\":{\"i\":3,\"j\":3}},"{\"entitiesOnMap\":[{\"id\":7,\"gameDefinitionId\":\"attack_whale\",\"timestamp\":635985564039079800,\"currentNode\":\"242617d2329ba\",\"coordonates\":{\"i\":10,\"j\":2}}]}";
	var updateUserDataResult = server.UpdateUserReadOnlyData({
        PlayFabId: currentPlayerId,
        Data: {
			"nextID":"45",
			"cityMap": city,
			"defMap": def,
			"whaleMap": whale,
			"mineMap": JSON.stringify(createEmptyMap())
        },
		Permission:"Public"
    });
	
	updateUserDataResult = server.UpdateUserData({
		PlayFabId: currentPlayerId,
        Data: {
			"name":"$no_name",
			"missile_att":"",
			"missile_def":"",
			"missile_niv":""
        },
		Permission:"Public"
	});
	
	
	updateUserDataResult = server.UpdateUserData({
		PlayFabId: currentPlayerId,
        Data: {
			"tuto":"true",
			"missile_prod_timestamp":"0",
			"missile_prod_list":""
        },
		Permission:"Private"
	});
}

handlers.getPlayerStatistics = function(args)
{
	var playfabID = args.playerID;
	var playerStatistics = server.GetPlayerStatistics({
		PlayFabId: playfabID
	});
	return {Stats:playerStatistics.UserStatistics};
}

handlers.addCityBuilding =function(args)
{
	var entity = args;
	var playerData = getPlayerDataForMap("cityMap")
	
	var playerDataCityMap;
	if(playerData.Data["cityMap"] == undefined)
		playerDataCityMap = createEmptyMap();
	else
		playerDataCityMap = JSON.parse(playerData.Data["cityMap"].Value);
	
	playerDataCityMap.entitiesOnMap.push(entity);
	
	var nextID = parseInt(playerData.Data["nextID"].Value);
	nextID++;
	
	var updateUserDataResult = server.UpdateUserReadOnlyData({
        PlayFabId: currentPlayerId,
        Data: {
            "cityMap": JSON.stringify(playerDataCityMap),
			"nextID": nextID + ""
        },
		Permission:"Public"
    });
	return {idcheck:nextID};
}

handlers.removeCityBuilding =function(args)
{
	var entityID = args;
	var playerData = getPlayerDataForMap("cityMap")
	
	var playerDataMap = JSON.parse(playerData.Data["cityMap"].Value);
	
	var found = false;
	for(var i = playerDataMap.entitiesOnMap.length -1 ; i>=0; i--)
	{
		if(playerDataMap.entitiesOnMap[i].id == entityID.id)
		{
			playerDataMap.entitiesOnMap.splice(i, 1);
			found = true;
			break;
		}
	}
	if(found)
	{
		var updateUserDataResult = server.UpdateUserReadOnlyData({
			PlayFabId: currentPlayerId,
			Data: {
			    "cityMap": JSON.stringify(playerDataMap)
			},
			Permission:"Public"
		});
	}
    
	return {hasBeenRemoved:found};
}
handlers.addDefBuilding =function(args)
{
	var entity = args;
	var playerData = getPlayerDataForMap("defMap")
	
	var playerDataCityMap;
	if(playerData.Data["defMap"] == undefined)
		playerDataCityMap = createEmptyMap();
	else
		playerDataCityMap = JSON.parse(playerData.Data["defMap"].Value);
	
	playerDataCityMap.entitiesOnMap.push(entity);
	
	var nextID = parseInt(playerData.Data["nextID"].Value); 
	nextID++;
	
	var updateUserDataResult = server.UpdateUserReadOnlyData({
        PlayFabId: currentPlayerId,
        Data: {
            "defMap": JSON.stringify(playerDataCityMap),
			"nextID": nextID + ""
        },
		Permission:"Public"
    });
	return {idcheck:nextID};
}
handlers.removeDefBuilding =function(args)
{
	var entityID = args;
	var playerData = getPlayerDataForMap("defMap")
	
	var playerDataMap = JSON.parse(playerData.Data["defMap"].Value);
	
	var found = false;
	for(var i = playerDataMap.entitiesOnMap.length -1 ; i>=0; i--)
	{
		if(playerDataMap.entitiesOnMap[i].id == entityID.id)
		{
			playerDataMap.entitiesOnMap.splice(i, 1);
			found = true;
			break;
		}
	}
	if(found)
	{
		var updateUserDataResult = server.UpdateUserReadOnlyData({
			PlayFabId: currentPlayerId,
			Data: {
			    "defMap": JSON.stringify(playerDataMap)
			},
			Permission:"Public"
		});
	}
    
	return {hasBeenRemoved:found};
}
handlers.addWhaleBuilding =function(args)
{
	var entity = args;
	var playerData = getPlayerDataForMap("whaleMap")
	
	var playerDataCityMap;
	if(playerData.Data["whaleMap"] == undefined)
		playerDataCityMap = createEmptyMap();
	else
		playerDataCityMap = JSON.parse(playerData.Data["whaleMap"].Value);
	
	playerDataCityMap.entitiesOnMap.push(entity);
	
	var nextID = parseInt(playerData.Data["nextID"].Value);
	nextID++;
	
	var updateUserDataResult = server.UpdateUserReadOnlyData({
        PlayFabId: currentPlayerId,
        Data: {
            "whaleMap": JSON.stringify(playerDataCityMap),
			"nextID": nextID + ""
        },
		Permission:"Public"
    });
	return {idcheck:nextID};
}
handlers.removeWhaleBuilding =function(args)
{
	var entityID = args;
	var playerData = getPlayerDataForMap("whaleMap")
	
	var playerDataMap = JSON.parse(playerData.Data["whaleMap"].Value);
	
	var found = false;
	for(var i = playerDataMap.entitiesOnMap.length -1 ; i>=0; i--)
	{
		if(playerDataMap.entitiesOnMap[i].id == entityID.id)
		{
			playerDataMap.entitiesOnMap.splice(i, 1);
			found = true;
			break;
		}
	}
	if(found)
	{
		var updateUserDataResult = server.UpdateUserReadOnlyData({
			PlayFabId: currentPlayerId,
			Data: {
			    "whaleMap": JSON.stringify(playerDataMap)
			},
			Permission:"Public"
		});
	}
    
	return {hasBeenRemoved:found};
}
handlers.addMineBuilding =function(args)
{
	var entity = args;
	var playerData = getPlayerDataForMap("mineMap")
	
	var playerDataCityMap;
	if(playerData.Data["mineMap"] == undefined)
		playerDataCityMap = createEmptyMap();
	else
		playerDataCityMap = JSON.parse(playerData.Data["mineMap"].Value);
	
	playerDataCityMap.entitiesOnMap.push(entity);
	
	var nextID = parseInt(playerData.Data["nextID"].Value);
	nextID++;
	
	var updateUserDataResult = server.UpdateUserReadOnlyData({
        PlayFabId: currentPlayerId,
        Data: {
            "mineMap": JSON.stringify(playerDataCityMap),
			"nextID": nextID + ""
        },
		Permission:"Public"
    });
	return {idcheck:nextID};
}
handlers.removeMineBuilding =function(args)
{
	var entityID = args;
	var playerData = getPlayerDataForMap("mineMap")
	
	var playerDataMap = JSON.parse(playerData.Data["mineMap"].Value);
	
	var found = false;
	for(var i = playerDataMap.entitiesOnMap.length -1 ; i>=0; i--)
	{
		if(playerDataMap.entitiesOnMap[i].id == entityID.id)
		{
			playerDataMap.entitiesOnMap.splice(i, 1);
			found = true;
			break;
		}
	}
	if(found)
	{
		var updateUserDataResult = server.UpdateUserReadOnlyData({
			PlayFabId: currentPlayerId,
			Data: {
			    "mineMap": JSON.stringify(playerDataMap)
			},
			Permission:"Public"
		});
	}
    
	return {hasBeenRemoved:found};
}
handlers.changeStateEntity =function(args)
{
	var mapKey = "cityMap";
	if (args.mapType == 1)//MapType.Defense)
		mapKey = "defMap";
	if (args.mapType == 2)//MapType.Whale)
		mapKey = "whaleMap";
	if (args.mapType == 3)//MapType.Mine)
		mapKey = "mineMap";
	
	var playerData = getPlayerDataForMap(mapKey);
	
	var isUpdateOk = false;
	var playerDataMap = JSON.parse(playerData.Data[mapKey].Value);
	for(var i=0; i<playerDataMap.entitiesOnMap.length; i++)
	{
		if(playerDataMap.entitiesOnMap[i].id == args.id)
		{
			playerDataMap.entitiesOnMap[i].currentNode = args.newStateNodeID;
			playerDataMap.entitiesOnMap[i].timestamp = args.timestamp;
			isUpdateOk = true;
			
			break;
		}
	}
	if(isUpdateOk)
	{
		var value = JSON.stringify(playerDataMap);
		var data = {};
		data[mapKey] = value;
		var updateUserDataResult = server.UpdateUserReadOnlyData({
			PlayFabId: currentPlayerId,
			Data: data,
			Permission:"Public"
		});
		return true;
	}
	return false;
}

handlers.moveEntity =function(args)
{
	var mapKey = "cityMap";
	if (args.mapType == 1)//MapType.Defense)
		mapKey = "defMap";
	if (args.mapType == 2)//MapType.Whale)
		mapKey = "whaleMap";
	if (args.mapType == 3)//MapType.Mine)
		mapKey = "mineMap";
	
	var playerData = server.GetUserReadOnlyData({
        PlayFabId: currentPlayerId,
        Keys: [mapKey]
    });
	
	var isUpdateOk = false;
	var playerDataMap = JSON.parse(playerData.Data[mapKey].Value);
	for(var i=0; i<playerDataMap.entitiesOnMap.length; i++)
	{
		if(playerDataMap.entitiesOnMap[i].id == args.id)
		{
			playerDataMap.entitiesOnMap[i].coordonates = args.coordonates;
			isUpdateOk = true;
			break;
		}
	}
	
	if(isUpdateOk)
	{
		var value = JSON.stringify(playerDataMap);
		var data = {};
		data[mapKey] = value;
		var updateUserDataResult = server.UpdateUserReadOnlyData({
			PlayFabId: currentPlayerId,
			Data: data,
			Permission:"Public"
		});
		return true;
	}
	return false;
}

// Photon Webhooks Integration
//
// The following functions are examples of Photon Cloud Webhook handlers. 
// When you enable Photon integration in the Game Manager, your Photon applications 
// are automatically configured to authenticate players using their PlayFab accounts 
// and to fire events that trigger your CloudScript Webhook handlers, if defined. 
// This makes it easier than ever to incorporate server logic into your game.
//
//  For more information, see https://playfab.com/using-photon-playfab

// Triggered automatically when a Photon room is first created
handlers.RoomCreated = function (args) {
    log.debug("Room Created - Game: " + args.GameId + " MaxPlayers: " + args.CreateOptions.MaxPlayers);
}

// Triggered automatically when a player joins a Photon room
handlers.RoomJoined = function (args) {
    log.debug("Room Joined - Game: " + args.GameId + " PlayFabId: " + args.UserId);
}

// Triggered automatically when a player leaves a Photon room
handlers.RoomLeft = function (args) {
    log.debug("Room Left - Game: " + args.GameId + " PlayFabId: " + args.UserId);
}

// Triggered automatically when a Photon room closes
// Note: currentPlayerId is undefined in this function
handlers.RoomClosed = function (args) {
    log.debug("Room Closed - Game: " + args.GameId);
}

// Triggered automatically when a Photon room game property is updated.
// Note: currentPlayerId is undefined in this function
handlers.RoomPropertyUpdated = function (args) {
    log.debug("Room Property Updated - Game: " + args.GameId);
}

// Triggered by calling "OpRaiseEvent" on the Photon client. The "args.Data" property is 
// set to the value of the "customEventContent" HashTable parameter, so you can use
// it to pass in arbitrary data.
handlers.RoomEventRaised = function (args) {
    var eventData = args.Data;
    log.debug("Event Raised - Game: " + args.GameId + " Event Type: " + eventData.eventType);

    switch (eventData.eventType) {
        case "fightOver":
			
			//rewardPlayer(currentPlayerId, eventData.hasWon);
			//rewardPlayer(eventData.opponentID, !eventData.hasWon);
			break;

        default:
            break;
    }
}

handlers.onFightOver = function (args) {
	rewardPlayer(currentPlayerId, args.hasWon, args.isDefender);
	if(args.opponentID != "")
		rewardPlayer(args.opponentID, !args.hasWon, !args.isDefender);
	return 0;
}

function rewardPlayer(playerId, hasWon, isDefending)
{
	var playerEquippedMissile = server.GetUserData({
		PlayFabId: playerId,
		Keys:["missile_att", "missile_def"]
		});

	var splitted
	if(isDefending)
	{
		splitted = playerEquippedMissile.Data["missile_def"].Value.split(",");
	}
	else 
	{
		splitted = playerEquippedMissile.Data["missile_att"].Value.split(",");
	}
	var stats = [
			"score",
			"win_streak",
			"total_win",
			"defeat_streak",
			"total_fight",
			"Rank"
		  ];
	
	var playerStats = server.GetPlayerStatistics({
		PlayFabId: playerId,
		StatisticNames: stats.concat(splitted)
		});
	
	var score = 0;
	var winStreak =0; //playerStats.Statistics["win_streak"];
	var totalWin = 0;//playerStats.Statistics["total_win"];
	var defeatStreak = 0;//playerStats.Statistics["defeat_streak"];
	var totalFight = 0;//playerStats.Statistics["total_fight"];
	var rank = 0;
	var missiles = new Array();
	for(var i=0; i<playerStats.Statistics.length; i++)
	{
		if(playerStats.Statistics[i].StatisticName == "score")
		{
			score =playerStats.Statistics[i].Value;
		}
		else if(playerStats.Statistics[i].StatisticName == "win_streak")
		{
			winStreak =playerStats.Statistics[i].Value;
		}
		else if(playerStats.Statistics[i].StatisticName == "defeat_streak")
		{
			defeatStreak =playerStats.Statistics[i].Value;
		}
		else if(playerStats.Statistics[i].StatisticName == "total_fight")
		{
			totalFight =playerStats.Statistics[i].Value;
		}
		else if(playerStats.Statistics[i].StatisticName == "total_win")
		{
			totalWin =playerStats.Statistics[i].Value;
		}
		else if(playerStats.Statistics[i].StatisticName == "Rank")
		{
			totalWin =playerStats.Statistics[i].Value;
		}
		else if(playerStats.Statistics[i].StatisticName.startsWith("missile_amount"))
		{
			var name = playerStats.Statistics[i].StatisticName;
			var value = playerStats.Statistics[i].Value;
			if(value>0)
				value -= 1;
			missiles.push({StatisticName: name, Value: value });
		}
	}
	
	totalFight+=1;
	
	if( hasWon )
	{
		totalWin+=1;
		winStreak+=1;
		defeatStreak=0;
		score+= 1000;
		rank += rank>=11?2:1; //cost was paid at the start of the fight if rank was >= 12
		if(winStreak >=5)
			score += 250;
	}
	else
	{
		winStreak=0;
		defeatStreak+=1;
		score += -250;
		if(defeatStreak >=5)
			score += -250;
		if(score < 0 )
			score = 0;
	}
	
	var toUpdate = [
		{
		  StatisticName: "score",
		  Value: score
		},
		{
		  StatisticName: "win_streak",
		  Value: winStreak
		},
		{
		  StatisticName: "total_win",
		  Value: totalWin
		},
		{
		  StatisticName: "defeat_streak",
		  Value: defeatStreak
		},
		{
		  StatisticName: "total_fight",
		  Value: totalFight
		}
	];
	
	server.UpdatePlayerStatistics(
	{
	  PlayFabId: playerId,
	  Statistics: toUpdate.concat(missiles)
	});
}

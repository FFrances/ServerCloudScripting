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
	var city = "{\"entitiesOnMap\":[{\"id\":81,\"gameDefinitionId\":\"tree_1\",\"timestamp\":635979055342072400,\"currentNode\":\"242664b48a772\",\"coordonates\":{\"i\":25,\"j\":10}},{\"id\":82,\"gameDefinitionId\":\"tree_2\",\"timestamp\":635979055437078800,\"currentNode\":\"242664b60ab7d\",\"coordonates\":{\"i\":9,\"j\":31}},{\"id\":83,\"gameDefinitionId\":\"tree_3\",\"timestamp\":635979055855851600,\"currentNode\":\"242664b758371\",\"coordonates\":{\"i\":10,\"j\":15}},{\"id\":84,\"gameDefinitionId\":\"tree_2\",\"timestamp\":635979055967651500,\"currentNode\":\"242664b60ab7d\",\"coordonates\":{\"i\":6,\"j\":14}},{\"id\":1,\"gameDefinitionId\":\"townhall\",\"timestamp\":0,\"currentNode\":\"\",\"coordonates\":{\"i\":15,\"j\":19}},{\"id\":86,\"gameDefinitionId\":\"tree_5\",\"timestamp\":635979620538653400,\"currentNode\":\"2426b8f8d6c25\",\"coordonates\":{\"i\":5,\"j\":30}},{\"id\":87,\"gameDefinitionId\":\"tree_4\",\"timestamp\":635979620851926900,\"currentNode\":\"2426b8f79f740\",\"coordonates\":{\"i\":2,\"j\":22}},{\"id\":89,\"gameDefinitionId\":\"rock_3\",\"timestamp\":635979626605979400,\"currentNode\":\"242665b4d27de\",\"coordonates\":{\"i\":1,\"j\":31}},{\"id\":91,\"gameDefinitionId\":\"rock_5\",\"timestamp\":635979647042649900,\"currentNode\":\"2426b9112d265\",\"coordonates\":{\"i\":13,\"j\":10}},{\"id\":97,\"gameDefinitionId\":\"prod_1\",\"timestamp\":635979659067752000,\"currentNode\":\"242617d2329ba\",\"coordonates\":{\"i\":28,\"j\":21}},{\"id\":99,\"gameDefinitionId\":\"prod_2\",\"timestamp\":635979747967789800,\"currentNode\":\"242617d2329ba\",\"coordonates\":{\"i\":22,\"j\":22}},{\"id\":101,\"gameDefinitionId\":\"missile_factory\",\"timestamp\":635979661981301400,\"currentNode\":\"242617d2329ba\",\"coordonates\":{\"i\":20,\"j\":27}},{\"id\":102,\"gameDefinitionId\":\"tree_1\",\"timestamp\":635979662676733000,\"currentNode\":\"242664b48a772\",\"coordonates\":{\"i\":13,\"j\":31}},{\"id\":103,\"gameDefinitionId\":\"tree_1\",\"timestamp\":635979662705973900,\"currentNode\":\"242664b48a772\",\"coordonates\":{\"i\":29,\"j\":14}},{\"id\":104,\"gameDefinitionId\":\"tree_1\",\"timestamp\":635979662760569100,\"currentNode\":\"242664b48a772\",\"coordonates\":{\"i\":10,\"j\":19}},{\"id\":105,\"gameDefinitionId\":\"tree_1\",\"timestamp\":635979662809217700,\"currentNode\":\"242664b48a772\",\"coordonates\":{\"i\":25,\"j\":14}},{\"id\":106,\"gameDefinitionId\":\"tree_1\",\"timestamp\":635979662854391600,\"currentNode\":\"242664b48a772\",\"coordonates\":{\"i\":17,\"j\":14}},{\"id\":107,\"gameDefinitionId\":\"tree_2\",\"timestamp\":635979662915877100,\"currentNode\":\"242664b60ab7d\",\"coordonates\":{\"i\":21,\"j\":14}},{\"id\":108,\"gameDefinitionId\":\"tree_2\",\"timestamp\":635979662961825900,\"currentNode\":\"242664b60ab7d\",\"coordonates\":{\"i\":6,\"j\":2}},{\"id\":111,\"gameDefinitionId\":\"rock_3\",\"timestamp\":635979663311594200,\"currentNode\":\"242665b4d27de\",\"coordonates\":{\"i\":10,\"j\":11}},{\"id\":112,\"gameDefinitionId\":\"rock_3\",\"timestamp\":635979663353910500,\"currentNode\":\"242665b4d27de\",\"coordonates\":{\"i\":21,\"j\":10}},{\"id\":117,\"gameDefinitionId\":\"tree_5\",\"timestamp\":635979666594645400,\"currentNode\":\"2426b8f8d6c25\",\"coordonates\":{\"i\":16,\"j\":2}},{\"id\":118,\"gameDefinitionId\":\"tree_3\",\"timestamp\":635979667751141100,\"currentNode\":\"242664b758371\",\"coordonates\":{\"i\":10,\"j\":27}},{\"id\":119,\"gameDefinitionId\":\"tree_3\",\"timestamp\":635979672729662100,\"currentNode\":\"242664b758371\",\"coordonates\":{\"i\":29,\"j\":31}},{\"id\":120,\"gameDefinitionId\":\"tree_3\",\"timestamp\":635979673151099900,\"currentNode\":\"242664b758371\",\"coordonates\":{\"i\":25,\"j\":31}},{\"id\":121,\"gameDefinitionId\":\"tree_3\",\"timestamp\":635979673359870700,\"currentNode\":\"242664b758371\",\"coordonates\":{\"i\":29,\"j\":10}},{\"id\":122,\"gameDefinitionId\":\"tree_1\",\"timestamp\":635979677480020000,\"currentNode\":\"242664b48a772\",\"coordonates\":{\"i\":10,\"j\":23}},{\"id\":123,\"gameDefinitionId\":\"rock_5\",\"timestamp\":635979678378875900,\"currentNode\":\"2426b9112d265\",\"coordonates\":{\"i\":14,\"j\":25}},{\"id\":124,\"gameDefinitionId\":\"tree_3\",\"timestamp\":635979682570877200,\"currentNode\":\"242664b758371\",\"coordonates\":{\"i\":18,\"j\":10}},{\"id\":125,\"gameDefinitionId\":\"tree_2\",\"timestamp\":635979682833764200,\"currentNode\":\"242664b60ab7d\",\"coordonates\":{\"i\":23,\"j\":6}},{\"id\":126,\"gameDefinitionId\":\"tree_2\",\"timestamp\":635979683934307200,\"currentNode\":\"242664b60ab7d\",\"coordonates\":{\"i\":28,\"j\":6}},{\"id\":127,\"gameDefinitionId\":\"tree_1\",\"timestamp\":635979684016109800,\"currentNode\":\"242664b48a772\",\"coordonates\":{\"i\":15,\"j\":6}},{\"id\":128,\"gameDefinitionId\":\"tree_3\",\"timestamp\":635979685012866200,\"currentNode\":\"242664b758371\",\"coordonates\":{\"i\":19,\"j\":6}},{\"id\":129,\"gameDefinitionId\":\"tree_1\",\"timestamp\":635979685562251300,\"currentNode\":\"242664b48a772\",\"coordonates\":{\"i\":10,\"j\":6}},{\"id\":130,\"gameDefinitionId\":\"tree_5\",\"timestamp\":635979687315926900,\"currentNode\":\"2426b8f8d6c25\",\"coordonates\":{\"i\":2,\"j\":18}},{\"id\":131,\"gameDefinitionId\":\"tree_3\",\"timestamp\":635979687792746100,\"currentNode\":\"242664b758371\",\"coordonates\":{\"i\":6,\"j\":18}},{\"id\":132,\"gameDefinitionId\":\"rock_5\",\"timestamp\":635979688405109200,\"currentNode\":\"2426b9112d265\",\"coordonates\":{\"i\":18,\"j\":31}},{\"id\":133,\"gameDefinitionId\":\"tree_3\",\"timestamp\":635979719666231300,\"currentNode\":\"242664b758371\",\"coordonates\":{\"i\":29,\"j\":2}},{\"id\":134,\"gameDefinitionId\":\"tree_4\",\"timestamp\":635979719828092800,\"currentNode\":\"2426b8f79f740\",\"coordonates\":{\"i\":25,\"j\":2}},{\"id\":135,\"gameDefinitionId\":\"tree_1\",\"timestamp\":635979720285864300,\"currentNode\":\"242664b48a772\",\"coordonates\":{\"i\":20,\"j\":2}},{\"id\":136,\"gameDefinitionId\":\"tree_4\",\"timestamp\":635979720731412100,\"currentNode\":\"2426b8f79f740\",\"coordonates\":{\"i\":11,\"j\":2}},{\"id\":137,\"gameDefinitionId\":\"tree_4\",\"timestamp\":635979721368711700,\"currentNode\":\"2426b8f79f740\",\"coordonates\":{\"i\":2,\"j\":14}},{\"id\":138,\"gameDefinitionId\":\"tree_4\",\"timestamp\":635979721479274000,\"currentNode\":\"2426b8f79f740\",\"coordonates\":{\"i\":2,\"j\":10}},{\"id\":139,\"gameDefinitionId\":\"tree_4\",\"timestamp\":635979721595077400,\"currentNode\":\"2426b8f79f740\",\"coordonates\":{\"i\":2,\"j\":6}},{\"id\":140,\"gameDefinitionId\":\"tree_5\",\"timestamp\":635979721820035500,\"currentNode\":\"2426b8f8d6c25\",\"coordonates\":{\"i\":2,\"j\":2}},{\"id\":141,\"gameDefinitionId\":\"tree_2\",\"timestamp\":635979722303688000,\"currentNode\":\"242664b60ab7d\",\"coordonates\":{\"i\":6,\"j\":6}},{\"id\":142,\"gameDefinitionId\":\"tree_1\",\"timestamp\":635979722465389600,\"currentNode\":\"242664b48a772\",\"coordonates\":{\"i\":6,\"j\":10}},{\"id\":145,\"gameDefinitionId\":\"tree_2\",\"timestamp\":635979742217964800,\"currentNode\":\"242664b60ab7d\",\"coordonates\":{\"i\":2,\"j\":26}},{\"id\":146,\"gameDefinitionId\":\"tree_2\",\"timestamp\":635979742669217900,\"currentNode\":\"242664b60ab7d\",\"coordonates\":{\"i\":6,\"j\":22}},{\"id\":148,\"gameDefinitionId\":\"tree_1\",\"timestamp\":635979743611974000,\"currentNode\":\"242664b48a772\",\"coordonates\":{\"i\":6,\"j\":26}},{\"id\":149,\"gameDefinitionId\":\"tree_3\",\"timestamp\":635979744024373000,\"currentNode\":\"242664b758371\",\"coordonates\":{\"i\":21,\"j\":18}},{\"id\":150,\"gameDefinitionId\":\"rock_5\",\"timestamp\":635979744206369400,\"currentNode\":\"2426b9112d265\",\"coordonates\":{\"i\":24,\"j\":17}},{\"id\":152,\"gameDefinitionId\":\"tree_3\",\"timestamp\":635979744368941000,\"currentNode\":\"242664b758371\",\"coordonates\":{\"i\":29,\"j\":27}}]}";
	var def = "{\"entitiesOnMap\":[{\"id\":88,\"gameDefinitionId\":\"rock_1\",\"timestamp\":635979626549876600,\"currentNode\":\"242665b3c56c2\",\"coordonates\":{\"i\":1,\"j\":4}},{\"id\":90,\"gameDefinitionId\":\"rock_2\",\"timestamp\":635979626651468500,\"currentNode\":\"242665b464238\",\"coordonates\":{\"i\":1,\"j\":8}},{\"id\":100,\"gameDefinitionId\":\"missile_launcher\",\"timestamp\":635979659943076200,\"currentNode\":\"242617d2329ba\",\"coordonates\":{\"i\":2,\"j\":16}},{\"id\":113,\"gameDefinitionId\":\"rock_4\",\"timestamp\":635979663666432300,\"currentNode\":\"2426b910451a2\",\"coordonates\":{\"i\":2,\"j\":31}},{\"id\":114,\"gameDefinitionId\":\"rock_4\",\"timestamp\":635979663770630100,\"currentNode\":\"2426b910451a2\",\"coordonates\":{\"i\":1,\"j\":25}},{\"id\":115,\"gameDefinitionId\":\"rock_2\",\"timestamp\":635979663894444200,\"currentNode\":\"242665b464238\",\"coordonates\":{\"i\":1,\"j\":1}},{\"id\":116,\"gameDefinitionId\":\"rock_1\",\"timestamp\":635979664114107300,\"currentNode\":\"242665b3c56c2\",\"coordonates\":{\"i\":1,\"j\":28}}]}";
	var whale = "{\"entitiesOnMap\":[{\"id\":98,\"gameDefinitionId\":\"attack_whale\",\"timestamp\":635979659305574100,\"currentNode\":\"242617d2329ba\",\"coordonates\":{\"i\":3,\"j\":3}}]}";
	var updateUserDataResult = server.UpdateUserReadOnlyData({
        PlayFabId: currentPlayerId,
        Data: {
			"nextID":"160",
			"cityMap": city,
		}
	});
	
	updateUserDataResult = server.UpdateUserReadOnlyData({
        PlayFabId: currentPlayerId,
        Data: {
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
        }
    });
	return {idcheck:nextID};
}

handlers.removeCityBuilding =function(args)
{
	var entityID = args;
	var playerData = getPlayerDataForMap("cityMap")
	
	var playerDataMap = JSON.parse(playerData.Data["cityMap"].Value);
	
	var found = false;
	var removed = null;
	for(var i = playerDataMap.entitiesOnMap.length -1 ; i>=0; i--)
	{
		if(playerDataMap.entitiesOnMap[i].id == entityID.id)
		{
			removed = playerDataMap.entitiesOnMap.splice(i, 1);
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
			}
		});
	}
    
	return {hasBeenRemoved:found, RemovedPlayerEntity:removed};
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
        }
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
			}
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
        }
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
			}
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
        }
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
			}
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
			Data: data
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
			Data: data
		});
		return true;
	}
	return false;
}

// This is a function that the game client would call whenever a player completes
// a level. It updates a setting in the player's data that only game server
// code can write - it is read-only on the client - and it updates a player
// statistic that can be used for leaderboards. 
//
// A funtion like this could be extended to perform validation on the 
// level completion data to detect cheating. It could also do things like 
// award the player items from the game catalog based on their performance.
handlers.completedLevel = function (args) {

    // "args" is set to the value of the "Params" field of the object passed in to 
    // RunCloudScript from the client.  It contains whatever properties you want to pass 
    // into your Cloud Script function. In this case it contains information about 
    // the level a player has completed.
    var level = args.levelName;
    var monstersKilled = args.monstersKilled;

    // The "server" object has functions for each PlayFab server API 
    // (https://api.playfab.com/Documentation/Server). It is automatically 
    // authenticated as your title and handles all communication with 
    // the PlayFab API, so you don't have to write the code to make web requests. 
    var updateUserDataResult = server.UpdateUserInternalData({
        PlayFabId: currentPlayerId,
        Data: {
            lastLevelCompleted: level
        }
    });

    log.debug("Set lastLevelCompleted for player " + currentPlayerId + " to " + level);

    server.UpdateUserStatistics({
        PlayFabId: currentPlayerId,
        UserStatistics: {
            level_monster_kills: monstersKilled
        }
    });

    log.debug("Updated level_monster_kills stat for player " + currentPlayerId + " to " + monstersKilled);
}


// In addition to the Cloud Script handlers, you can define your own functions and call them from your handlers. 
// This makes it possible to share code between multiple handlers and to improve code organization.
handlers.updatePlayerMove = function (args) {
    var validMove = processPlayerMove(args);
    return { validMove: validMove };
}



// This is a helper function that verifies that the player's move wasn't made
// too quickly following their previous move, according to the rules of the game.
// If the move is valid, then it updates the player's statistics and profile data.
// This function is called from the "UpdatePlayerMove" handler above and also is 
// triggered by the "RoomEventRaised" Photon room event in the Webhook handler
// below. For this example, the script defines the cooldown period (playerMoveCooldownInSeconds)
// as 15 seconds. A recommended approach for values like this would be to create them in Title
// Data, so that they can be queries in the script with a call to
// https://api.playfab.com/Documentation/Server/method/GetTitleData. This would allow you to
// make adjustments to these values over time, without having to edit, test, and roll out an
// updated script.
function processPlayerMove(playerMove) {
    var now = Date.now();
    var playerMoveCooldownInSeconds = 15;

    var playerData = server.GetUserInternalData({
        PlayFabId: currentPlayerId,
        Keys: ["last_move_timestamp"]
    });

    var lastMoveTimestampSetting = playerData.Data["last_move_timestamp"];

    if (lastMoveTimestampSetting) {
        var lastMoveTime = Date.parse(lastMoveTimestampSetting.Value);
        var timeSinceLastMoveInSeconds = (now - lastMoveTime) / 1000;
        log.debug("lastMoveTime: " + lastMoveTime + " now: " + now + " timeSinceLastMoveInSeconds: " + timeSinceLastMoveInSeconds);

        if (timeSinceLastMoveInSeconds < playerMoveCooldownInSeconds) {
            log.error("Invalid move - time since last move: " + timeSinceLastMoveInSeconds + "s less than minimum of " + playerMoveCooldownInSeconds + "s.")
            return false;
        }
    }

    var playerStats = server.GetUserStatistics({
        PlayFabId: currentPlayerId
    }).UserStatistics;

    if (playerStats.movesMade)
        playerStats.movesMade += 1;
    else
        playerStats.movesMade = 1;

    server.UpdateUserStatistics({
        PlayFabId: currentPlayerId,
        UserStatistics: playerStats
    });

    server.UpdateUserInternalData({
        PlayFabId: currentPlayerId,
        Data: {
            last_move_timestamp: new Date(now).toUTCString()
        }
    });

    return true;
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
        case "playerMove":
            processPlayerMove(eventData);
            break;

        default:
            break;
    }
}

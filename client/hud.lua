local floor, ceil, encode, beltactive = math.floor, math.ceil, json.encode, false

-- Commands

RegisterCommand('hidehud', function()
    manageUI(false, 'PLAYERHUDVISABLE', {}, false)
end, false)

RegisterCommand('showhud', function()
    manageUI(true, 'PLAYERHUDVISABLE', {}, false)
end, false)

-- Functions

local function GetStatus(stat)
    local val = nil
    TriggerEvent('esx_status:getStatus', stat, function(status)
        val = status.val
    end)
    return val or 0
end

local function initHud()
    manageUI(true, 'PLAYERHUDVISABLE', {}, false)
end

local function setMinimapPosition()
    local defaultAspectRatio = 1920/1080 -- Don't change this.
    local resolutionX, resolutionY = GetActiveScreenResolution()
    local aspectRatio = resolutionX/resolutionY
    local minimapOffset = 0
    SetRadarBigmapEnabled(false, false)
    SetMinimapComponentPosition("minimap", "L", "B", 0.0 + minimapOffset, -0.037, 0.1368, 0.15)
    SetMinimapComponentPosition("minimap_mask", "L", "B", 0.0 + minimapOffset, 0.0, 0.128, 0.20)
    SetMinimapComponentPosition('minimap_blur', 'L', 'B', -0.01 + minimapOffset, -0.01, 0.262, 0.300)
    SetRadarBigmapEnabled(true, false)
    SetMinimapClipType(0)
    Wait(0)
    SetRadarBigmapEnabled(false, false)
end

-- Threads

CreateThread(function()
    while true do
        if RESOURCESTATE['PLAYERHUDVISABLE'] then
            local playerId = PlayerId()
            local playerPed = PlayerPedId()
            local sprintStamina = GetPlayerSprintStaminaRemaining(playerId)
            local entityHealth = GetEntityHealth(playerPed) - 100
            local pedArmour = GetPedArmour(playerPed)
            local hunger = GetStatus('hunger') / 10000
            local thirst = GetStatus('thirst') / 10000

            local playerHudData = {
                USERHEALTH = entityHealth,
                USERARMOR = pedArmour,
                USERHUNGER = floor(hunger),
                USERTHIRST = floor(thirst),
                USEROXIGEN = floor(100 - sprintStamina),
                shouldHideUI = IsPauseMenuActive() or IsScreenFadedOut() or LocalPlayer.state.invOpen
            }

            SendNuiMessage(encode({
                action = 'updatePlayerHud',
                data = playerHudData
            }))
        end
        Wait(800)
    end
end)

local x = -0.025
local y = -0.015
local w = 0.16
local h = 0.25
Citizen.CreateThread(
    function()
        local minimap = RequestScaleformMovie("minimap")
        RequestStreamedTextureDict("circlemap", false)
        while not HasStreamedTextureDictLoaded("circlemap") do
            Wait(100)
        end
        AddReplaceTexture("platform:/textures/graphics", "radarmasksm", "circlemap", "radarmasksm")
        SetMinimapClipType(1)
        SetMinimapComponentPosition("minimap", "L", "B", x, y, w, h)
        SetMinimapComponentPosition("minimap_mask", "L", "B", x + 0.17, y + 0.09, 0.072, 0.162)
        SetMinimapComponentPosition("minimap_blur", "L", "B", -0.035, -0.03, 0.18, 0.22)
        Wait(5000)
        SetRadarBigmapEnabled(true, false)
        Wait(0)
        SetRadarBigmapEnabled(false, false)
        while true do
            Wait(0)
            BeginScaleformMovieMethod(minimap, "SETUP_HEALTH_ARMOUR")
            ScaleformMovieMethodAddParamInt(3)
            EndScaleformMovieMethod()
            BeginScaleformMovieMethod(minimap, "HIDE_SATNAV")
            EndScaleformMovieMethod()
        end
    end
)

CreateThread(function()
    while true do
        local playerPed = PlayerPedId()
        local isInVehicle = IsPedInAnyVehicle(playerPed, false)
        if isInVehicle then
            DisplayRadar(true)
            SetRadarZoom(1100)
        else
            DisplayRadar(false)
        end
        Wait(500)
    end
end)

--Misc

local function getDirection(heading)
    if heading >= 337.5 or heading < 22.5 then
        return "North"
    elseif heading >= 22.5 and heading < 67.5 then
        return "North East"
    elseif heading >= 67.5 and heading < 112.5 then
        return "East"
    elseif heading >= 112.5 and heading < 157.5 then
        return "South East"
    elseif heading >= 157.5 and heading < 202.5 then
        return "South"
    elseif heading >= 202.5 and heading < 247.5 then
        return "South West"
    elseif heading >= 247.5 and heading < 292.5 then
        return "West"
    elseif heading >= 292.5 and heading < 337.5 then
        return "North West"
    end
    return ""
end

lib.onCache('vehicle', function(vehicle, oldveh)
    if vehicle then
        DisplayRadar(true)
        manageUI(true, 'VEHICLEHUDVISABLE', {}, false)
        CreateThread(function()
            while GetVehiclePedIsIn(PlayerPedId(), false) == vehicle do
                local maxSpeed = GetVehicleMaxSpeed(vehicle)
                local currentSpeed = GetEntitySpeed(vehicle)
                local speedPercent = floor((currentSpeed / maxSpeed) * 100)
                local pos = GetEntityCoords(PlayerPedId())
                local heading = GetEntityHeading(PlayerPedId())
                local street1, street2 = GetStreetNameAtCoord(pos.x, pos.y, pos.z)
                local streetName1 = street1 and GetStreetNameFromHashKey(street1) or "Unknown Road"
                local streetName2 = street2 and GetStreetNameFromHashKey(street2) or ""
                local direction = getDirection(heading)
                local _, lightsOn, highbeamsOn = GetVehicleLightsState(vehicle)
                SendNuiMessage(encode({
                    action = 'updateVehicleHud',
                    data = {
                        SPEED = ceil(currentSpeed * 2.23694),
                        FUELPERCENT = GetVehicleFuelLevel(vehicle),
                        MAXSPEEDPERCENT = speedPercent,
                        GEAR = GetVehicleCurrentGear(vehicle) == 0 and 'R' or GetVehicleCurrentGear(vehicle),
                        SEATBELT = beltactive,
                        LIGHTACTIVE = lightsOn == 1 or highbeamsOn == 1,
                        STREETNAME1 = direction .. " " .. streetName1,
                        STREETNAME2 = streetName2,
                        shouldHideUI = IsPauseMenuActive() or IsScreenFadedOut() or LocalPlayer.state.invOpen
                    }
                }))
                Wait(300)
            end
            DisplayRadar(false)
            manageUI(false, 'VEHICLEHUDVISABLE', {}, false)
        end)
    end
end)


RegisterCommand('toggleseatbelt', function()
    if not beltactive then
        beltactive = true
        SetFlyThroughWindscreenParams(10000.0, 10000.0, 17.0, 500.0)
    else
        beltactive = false
        SetFlyThroughWindscreenParams(16.0, 19.0, 17.0, 2000.0)
    end
end)

RegisterKeyMapping('toggleseatbelt', 'Toggle Seatbelt', 'keyboard', 'B')

RegisterNetEvent('esx:playerLoaded', function()
    SetTimeout(1000, function()
        initHud()   
    end)
end)

RegisterCommand('huddebug', function()
    CreateThread(function ()
        SetTimeout(1000, function()
            initHud()    
        end)
    end)
end)

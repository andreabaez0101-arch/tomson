RESOURCESTATE = {}

function manageUI(bool, resource, data, focus)
    RESOURCESTATE[resource] = bool
	SetNuiFocus(focus, focus)
	SendNUIMessage({
		action = "setVisible",
		data = {
            resource = resource,
            state = bool,
            data = data
        }
	})
end

RegisterNUICallback("hideByComponent", function(resource, cb)
    manageUI(false, resource, {})
    cb("ok")
end)
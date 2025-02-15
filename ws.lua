sim = require('sim')
simUI = require('simUI')
simWS = require('simWS')
json = require('dkjson')  -- Ensure CoppeliaSim has dkjson

joints = {} -- Store joint handles globally
wsServer = nil -- WebSocket server handle

function sysCall_init()
    -- Get joint handles for all 7 joints
    for i = 1, 7 do
        joints[i] = sim.getObject('/joint' .. i)  -- Use sim.getObject instead of sim.getObjectHandle
    end

    -- Create UI with 7 sliders
    local xml = '<ui title="Joint Control" layout="vbox">'
    for i = 1, 7 do
        xml = xml .. string.format('<hslider id="%d" minimum="-180" maximum="180" on-change="sliderChanged"/>', i)
    end
    xml = xml .. '</ui>'

    -- Store UI handle globally
    ui = simUI.create(xml)

    -- Start WebSocket server on port 23050
    wsServer = simWS.start(23050)

    -- Set message handler
    simWS.setMessageHandler(wsServer, "onMessage")

    -- Debugging info
    sim.addLog(sim.verbosity_infos, "WebSocket server started on port 23050")
end

function sliderChanged(ui, id, value)
    local radianValue = math.rad(value) -- Convert degrees to radians
    sim.setJointTargetPosition(joints[id], radianValue)

    -- Send updated value over WebSocket
    if wsServer then
        local message = json.encode({joint = id, value = radianValue})
        simWS.send(wsServer, "*", message, simWS.opcode.text)
    end
end

function onMessage(serverHandle, connectionHandle, message)
    -- Parse JSON message
    local data, pos, err = json.decode(message)
    
    if err then
        sim.addLog(sim.verbosity_errors, "JSON Decode Error: " .. err)
        return
    end

    local jointID = data.joint
    local jointValue = data.value

    if joints[jointID] then
        sim.setJointTargetPosition(joints[jointID], jointValue)
    end
end

function sysCall_cleanup()
    if wsServer then
        simWS.stop(wsServer)
        sim.addLog(sim.verbosity_infos, "WebSocket server stopped")
    end
end

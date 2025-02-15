-- Required dependencies
local sim = require('sim')
local simUI = require('simUI')
simWS = require('simWS')  -- Websockets
json = require('dkjson')  -- Ensure CoppeliaSim has dkjson


joints = {} -- Store joint handles globally (will later be modified by function call)
wsServer = nil -- WebSocket server handle

-- Script handles cache
local ScriptHandles = {
    gripper = nil,
    motion = nil,
    objectManipulation = nil,
    IK = nil,
    manual = nil
}

-- UI XML template
local UI_TEMPLATE = [[
    <ui title="Robot Control Panel" closeable="false" modal="false" resizable="false">
        <!-- Mode Selection Section -->
        <group text="Mode Selection" layout="hbox">
            <radiobutton text="Manual Mode" checked="true" on-click="modeToggleChanged" id="100" />
            <radiobutton text="IK Mode"  on-click="modeToggleChanged" id="101" />
        </group>
               
        <!-- Top control section with two groups side by side -->
        <group layout="hbox" flat="true">
            <group text="Gripper Control" flat="false">
                <button text="Open Gripper" on-click="openGripperCallback" id="1"/>
                <button text="Close Gripper" on-click="closeGripperCallback" id="2"/>
            </group>
            <group text="Position Control" flat="false">
                <button text="Upperhand Pick" on-click="upperhandPickCallback" id="3"/>
                <button text="Sidearm Pick" on-click="sidearmPickCallback" id="4"/>
            </group>
        </group>
        
        <!-- Object Spawner Section -->
        <label text="Object Spawner" style="* {margin-top: 10px; margin-bottom: 5px; font-weight: bold;}"/>
        
        <!-- Object Grid - Row 1 -->
        <group layout="hbox" flat="true">
            <button text="Plate" on-click="spawnObjectCallback" id="5"/>
            <button text="Red Cup" on-click="spawnObjectCallback" id="6"/>
            <button text="Copper Cup" on-click="spawnObjectCallback" id="7"/>
            <button text="Dumbbell" on-click="spawnObjectCallback" id="8"/>
        </group>
        
        <!-- Object Grid - Row 2 -->
        <group layout="hbox" flat="true">
            <button text="Cuboid" on-click="spawnObjectCallback" id="9"/>
            <button text="Sphere" on-click="spawnObjectCallback" id="10"/>
            <button text="Cylinder" on-click="spawnObjectCallback" id="11"/>
            <button text="Capsule" on-click="spawnObjectCallback" id="12"/>
        </group>
        
        <!-- Delete Control -->
        <button text="DELETE ALL OBJECTS" on-click="deleteObjectsCallback" id="13" 
                style="* {background-color: #ff4444; color: white; margin-top: 10px;}"/>
    </ui>
]]

-- Initialize script handles and UI
function sysCall_init()
    initializeScriptHandles()
    uiHandle = simUI.create(UI_TEMPLATE)
    
    -- Get joint handles for all 7 joints
    for i = 1, 7 do
        joints[i] = sim.getObject('/joint' .. i)  -- Use sim.getObject instead of sim.getObjectHandle
    end
    
    -- Start WebSocket server on port 23050
    wsServer = simWS.start(23050)
    -- Set message handler
    simWS.setMessageHandler(wsServer, "onMessage")
    -- Debugging info
    sim.addLog(sim.verbosity_infos, "WebSocket server started on port 23050")
end

function onMessage(serverHandle, connectionHandle, message)
    -- Parse JSON message
    local data, pos, err = json.decode(message)
    
    if err then
        sim.addLog(sim.verbosity_errors, "JSON Decode Error: " .. err)
        return
    end

    local functionName = data.func
    local functionArgs = data.args
    
    if (functionName == "testFunction") then
        testFunction()
    end
    
    if (functionName == "moveJoint") then
        local jointID = data.args[1]
        local jointValue = data.args[2]
        if joints[jointID] then
            sim.setJointTargetPosition(joints[jointID], jointValue)
        end
    end

    if joints[jointID] then
        sim.setJointTargetPosition(joints[jointID], jointValue)
    end


    -- if joints[jointID] then
    --   sim.setJointTargetPosition(joints[jointID], jointValue)
    -- end
end


-- Initialize all script handles
function initializeScriptHandles()
    ScriptHandles.gripper = sim.getScript(sim.scripttype_childscript, 'gripper')
    ScriptHandles.motion = sim.getScript(sim.scripttype_childscript, 'motion')
    ScriptHandles.objectManipulation = sim.getScript(sim.scripttype_childscript, 'object_manipulation')
    ScriptHandles.controlmode = sim.getScript(sim.scripttype_childscript, 'controlmode')
end

-- Mode toggle callbacks
function modeToggleChanged(ui,id)
    local mode = tonumber(id) -- The id is set to "100-100" or "101-100", representing the mode.
    sim.callScriptFunction('modeToggleChanged_callback', ScriptHandles.controlmode, {mode-100})

end


-- Gripper control callbacks
function openGripperCallback()
    sim.callScriptFunction('openGrip', ScriptHandles.gripper)
end

function closeGripperCallback()
    sim.callScriptFunction('closeGripWrapper', ScriptHandles.gripper)
end

-- Position control callbacks
function upperhandPickCallback()
    sim.callScriptFunction('upperhandPick_callback', ScriptHandles.motion)
end

function sidearmPickCallback()
    sim.callScriptFunction('sidearmPick_callback', ScriptHandles.motion)
end

function testFunction()
    print("Working")
end

-- Object manipulation callbacks
function spawnObjectCallback(ui, id)
    local objectIndex = id - 4  -- Adjust for control button offset
    sim.callScriptFunction('spawnObject', ScriptHandles.objectManipulation, {objectIndex})
end

function deleteObjectsCallback()
    sim.callScriptFunction('deleteObjects', ScriptHandles.objectManipulation)
end

-- Cleanup function
function sysCall_cleanup()
    if uiHandle then
        simUI.destroy(uiHandle)
    end
    
    if wsServer then
        simWS.stop(wsServer)
        sim.addLog(sim.verbosity_infos, "WebSocket server stopped")
    end
end
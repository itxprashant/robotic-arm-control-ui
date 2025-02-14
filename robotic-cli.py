import asyncio
import websockets
import json
import math
import cmd

class RoboticArmWebSocket:
    def __init__(self):
        self.ws = None
        self.loop = asyncio.get_event_loop()

    async def connect(self):
        try:
            self.ws = await websockets.connect('ws://127.0.0.1:23050')
            print("Connected to robotic arm server")
            return True
        except Exception as e:
            print(f"Failed to connect: {e}")
            return False

    async def send_command(self, joint_id, value):
        # if not self.ws or self.ws.open:
        #     print("WebSocket is not connected. Attempting to reconnect...")
        if not await self.connect():
            return False

        command = {
            "joint": joint_id,
            "value": (value * math.pi) / 180  # Convert to radians
        }
        try:
            await self.ws.send(json.dumps(command))
            return True
        except websockets.exceptions.WebSocketException as e:
            print(f"WebSocket error: {e}")
            return False

class RoboticArmShell(cmd.Cmd):
    intro = "Welcome to the Robotic Arm control shell. Type help or ? to list commands."
    prompt = "(robotic-arm) "

    def __init__(self):
        super().__init__()
        self.arm = RoboticArmWebSocket()
        asyncio.get_event_loop().run_until_complete(self.arm.connect())

    async def send_command_wrapper(self, joint_id, value):
        return await self.arm.send_command(joint_id, value)

    def do_joint(self, arg):
        """Set joint angle: joint <joint_id> <angle_in_degrees>"""
        try:
            joint_id, angle = map(float, arg.split())
            success = asyncio.get_event_loop().run_until_complete(
                self.send_command_wrapper(int(joint_id), angle)
            )
            if success:
                print(f"Command sent: Joint {int(joint_id)} set to {angle} degrees")
            else:
                print("Failed to send command. Please try again.")
        except ValueError:
            print("Invalid input. Use: joint <joint_id> <angle_in_degrees>")

    def do_gripper(self, arg):
        """Set gripper state: gripper <state> (0 for off, 1 for on)"""
        try:
            state = int(arg)
            if state not in [0, 1]:
                raise ValueError
            success = asyncio.get_event_loop().run_until_complete(
                self.send_command_wrapper(6, state * 90)  # Assuming joint 6 is the gripper
            )
            if success:
                print(f"Command sent: Gripper set to {'on' if state else 'off'}")
            else:
                print("Failed to send command. Please try again.")
        except ValueError:
            print("Invalid input. Use: gripper <state> (0 for off, 1 for on)")

    def do_quit(self, arg):
        """Exit the program"""
        print("Exiting...")
        return True

if __name__ == "__main__":
    RoboticArmShell().cmdloop()

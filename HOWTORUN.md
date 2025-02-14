# HOW TO RUN

## Controlling from Another Device
To control the simulation from another device, you will need to edit the `WEBSOCKET_IP` variable to the target machine's IP in `config.json`.
Make sure websocket connectivity is turned on (Modules>Connectivity>Web Socket) and firewall is disabled on target machine.

### Controlling from Another Device using the CLI
Run `pip install websockets` to install python websockets package which is needed to connect to CoppeliaSim.
After that, run `python robotic-cli.py`

The script is fairly self explanatory. You can enter `?` for help, or the `<component_name> ?` for help about how to control the specific type of component.

### Controlling from Another Device using the WEB UI

Navigate to the frontend directory and run `npm i` to install frontend dependencies.
After that, run `npm run dev` and visit the address on which the page is running. The Web UI is intuitive and self explanatory with 3 modes of control.

1. Manual mode for direct precise control in each degree of freedom.
2. Automatic mode for controlling the end effectors directly, and for predefined scripts.
3. AI Mode for interactive voice based control.

## Controlling from the Same Device
A basic UI is built-in in the script and can be used to control the arm after starting the simulation. Additionally you can use the same CLI and WEB UI locally too. The procedure is the same as above except that the IP address will instead be `127.0.0.1` (or the localhost inet IP, which can be found, on linux/unix with `ifconfig`)

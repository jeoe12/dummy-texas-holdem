import sys
import json
from argparse import Namespace
from websocket import create_connection
sys.path.append('./bean')
sys.path.append('./utils')
from Credential import Credential
from MD5Util import MD5Util
from WebSocketClient import WebSocketClient



if __name__ == "__main__":
    file_object = open('credential.json')
    try:
        credential = file_object.read()
    finally:
        file_object.close()

    credential = json.loads(credential, object_hook=lambda d: Namespace(**d))
    if credential is None:
        print("login username (phone number) is required")
    else:
        print("your phone number is %s, password is %s"%(credential.phoneNumber,credential.password))
        if credential.password is not None:
            md5Util = MD5Util()
            credential.password = md5Util.MD5Encode(credential.password)
        ws = create_connection(credential.host)
        websocketClient = WebSocketClient(credential)
        websocketClient.onOpen(ws)
        while 1:
            result = ws.recv()
            websocketClient.onMessage(result)


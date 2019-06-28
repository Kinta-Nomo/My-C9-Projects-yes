import telepot
import time
import copy
token="561201132:AAE1drtxz-WY6IkLlTYAKEchFALM1-izrLY"
banana=telepot.Bot(token)
binaryAsk = False

def den_to_bin(denary):
    binary=''
    while denary > 0:
        binary=str(denary%2)+binary
        denary=int(denary)/2
    return int(binary)

def RepresentsInt(s):
    try: 
        int(s)
        return True
    except ValueError:
        return False

prevMess = banana.getUpdates()
while True:
    update = banana.getUpdates()
    if update != prevMess:
        for i in range(1,len(update)-len(prevMess)+1):
            print update[-i]['message']['text']
            if binaryAsk:
                if update[-i]['message']['text'] == "/cancel":
                    banana.sendMessage(update[0]['message']["chat"]["id"],"oK..")
                    binaryAsk = False
                elif RepresentsInt(update[-i]['message']['text']) != True:
                    banana.sendMessage(update[0]['message']["chat"]["id"],"i nEED a nUMBER!")
                else:
                    banana.sendMessage(update[0]['message']["chat"]["id"],den_to_bin(int(update[-i]['message']['text'])))
                    binaryAsk = False
            else:
                if update[-i]['message']['text'] == "/binary":
                    banana.sendMessage(update[0]['message']["chat"]["id"],"cOOL! tHEN gIVE mE tHE dENARY nUMBER!")
                    binaryAsk = True
                if update[-i]['message']['text'] == "Hello!":
                    banana.sendMessage(update[0]['message']["chat"]["id"],"...(sounds like hello)")
    prevMess = copy.copy(update)
    time.sleep(1)

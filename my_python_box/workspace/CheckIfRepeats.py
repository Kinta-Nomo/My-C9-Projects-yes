def Chk(s):
    l=len(s)/2
    return s[:l]==s[l:]

def Splits(s):
    l=len(s)
    for i in range(l,1,-1):
        for p in range(l-i):
            if Chk(s[p:p+i]):
                return s[p:p+i/2]
            
l=['j', 'h', 'b', 'd', 'k', 'j', 's', 'h', 'f', 'a', 'l', 'i', 'u', ' ', 'h', ',', 'm', '.', 'v', 'n', 'd', 'c', 'f', 'v', 'v', 'n', 'd', 'c', 'f', 'v', 'v', 'n', 'd', 'c', 'f', 'v', 'v', 'n', 'd', 'c', 'f', 'v', '.', ';', 'l', 'k', 's', ' ', 'f', ';', 't', 'f', 'o', 'e', 'w', 'r', 't', 'm', 'n', ' ', 'm', 'd', 'f', ',', 's', 'g', 'd', ',', 'f', 'g', 'd', 's', 'f', 'g']
print Splits(l)
        


# BY THE WOLF
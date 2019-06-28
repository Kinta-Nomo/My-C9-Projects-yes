
from math import *

def den_to_bin(denary):
    binary=''
    while denary > 0:
        binary=str(floor(denary%2))+binary
        denary=int(denary)/2
    return int(binary)
        
print(den_to_bin(9))
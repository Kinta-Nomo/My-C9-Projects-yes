#                   {'color':[219, 109, 19],'coordinate':[[100,200,100],[200,200,100],[200,200,200],[100,200,200]]},
facades=[]
stairHeight=25
stairWidth=150
stairDepth=30
for s in range(300/stairHeight):
    facades.append({'color':[20+s*10, 109, 19],'coordinate':[[0,s*stairDepth,s*stairHeight],
                                                         [stairWidth,s*stairDepth,s*stairHeight],
                                                         [stairWidth,s*stairDepth,(s+1)*stairHeight],
                                                         [0,s*stairDepth,(s+1)*stairHeight]]})
    facades.append({'color':[219,20+s*10, 19],'coordinate':[[0,s*stairDepth,s*stairHeight],
                                                         [stairWidth,s*stairDepth,s*stairHeight],
                                                         [stairWidth,(s+1)*stairDepth,s*stairHeight],
                                                         [0,(s+1)*stairDepth,s*stairHeight]]})
    
    
print  facades
    